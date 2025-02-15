import type { NitroApp } from "nitropack";
import { Server as Engine } from "engine.io";
import { Server } from "socket.io";
import { defineEventHandler } from "h3";
import { Message } from "~/server/models/message.model";
import { User } from "~/server/models/user.model";
import mongoose from "mongoose";


export default defineNitroPlugin(async (nitroApp: NitroApp) => {
  //запускаем движок socketa
  const engine = new Engine();
  const io = new Server();
  
  try {
    await mongoose.connect("mongodb://localhost:27017/chat");
  } catch (e) {
    console.error(e);
  }

  let clients =  new Map();

  io.bind(engine);

  io.on('connection', function (socket) {
    console.log('connected');
    socket.on('logged_in', async function(data) {
      clients.set(data.username, socket.id);
      let user = new User({name:data.username});
      await user.save();
      console.log(socket.id)
    })

    socket.on('chat message', async function (data) {
      const message = new Message({
        text: data.text,
        receiver: data.receiver,
        sender: data.sender
      });
      await message.save();
      io.to(clients.get(data.receiver)).emit('chat message', {
        text: data.text,
        receiver: data.receiver,
        sender: data.sender,
      });
      io.to(clients.get(data.sender)).emit('chat message', {
        text: data.text,
        receiver: data.receiver,
        sender: data.sender,
      });
    })
  })

  

  nitroApp.router.use("/socket.io/", defineEventHandler({
    handler(event) {
      engine.handleRequest(event.node.req, event.node.res); 
      event._handled = true;
    },
    websocket: {
      open(peer) {
        // @ts-expect-error private method and property
        engine.prepare(peer._internal.nodeReq);
        // @ts-expect-error private method and property
        engine.onWebSocket(peer._internal.nodeReq, peer._internal.nodeReq.socket, peer.websocket);
      }
    }
  }));
});