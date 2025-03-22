<template>
    <div class="app">
      <Sidebar />
      <div class="content">
        <ChatList :chats="chats" @chat-selected="setSelectedChat" />
        <ChatWindow v-if="selectedChat" :chat="selectedChat" />
      </div>
    </div>
  </template>
  
  <script>
  import Sidebar from "./components/Sidebar.vue";
  import ChatList from "./components/ChatList.vue";
  import ChatWindow from "./components/ChatWindow.vue";
  
  export default {
    name: "Sidebar",
    components: {
      Sidebar,
      ChatList,
      ChatWindow,
    },
    data() {
      return {
        chats: [
          { id: 1, name: "Ivan", messages: [] },
          { id: 2, name: "Anton", messages: [] },
          { id: 3, name: "Vova", messages: [] },
        ],
        selectedChat: null,
      };
    },
    methods: {
      setSelectedChat(chat) {
        this.selectedChat = chat;
      },
    },
  };
  </script>
  
  <style>
  .app {
    display: flex;
  }
  .content {
    flex: 1;
    display: flex;
  }
  </style>
