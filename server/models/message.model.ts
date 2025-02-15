import { Schema, model } from "mongoose";

const MessageSchema = new Schema({
  text: String,
  sender: String,
  receiver: String
});
  
export const Message = model("Message", MessageSchema);