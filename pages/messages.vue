<script>
import { io } from "socket.io-client"

let messages = ref([])
let username = ref('michael')
let connect = ref(false)
let text = ref('')

if(process.client) {
    let socket = io('ws://localhost:3000');
    connect.value = true;
    socket.on("chat message", (data) => {
        messages.value.push({ text: data.text, username: data.username })
    })
}

function sendMessage() {
    socket.emit('chat message', {username: username.value, tetx: text.value})
}
</script>
<template> 
    <h1>тут будут сокеты</h1>
    <button @click="sendMessage()">Отправить сообщение</button>
</template>