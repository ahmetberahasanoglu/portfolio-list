<template>
  <div class="message-container">
    <h2>Mesajlaşma</h2>
    <div class="messages">
      <div v-for="(message, index) in messages" :key="index" class="message">
        <span><strong>{{ message.user }}:</strong> {{ message.text }}</span>
      </div>
    </div>
    <div class="message-input">
      <input
        v-model="newMessage"
        @keyup.enter="sendMessage"
        placeholder="Mesajınızı yazın..."
      />
      <button @click="sendMessage">Gönder</button>
    </div>
  </div>
</template>

<script>
import EventBus from "@/event-bus.js";

export default {
  name: "MessageComponent",
  data() {
    return {
      messages: [],
      newMessage: "",
    };
  },
  mounted() {
    EventBus.on("new-message", this.addMessage);
  },
  beforeUnmount() {
    EventBus.off("new-message", this.addMessage);
  },
  methods: {
    sendMessage() {
      if (this.newMessage.trim()) {
        const message = {
          user: "Kullanıcı", // Bu alanı dinamik hale getirebilirsiniz.
          text: this.newMessage,
        };
        EventBus.emit("new-message", message);
        this.newMessage = "";
      }
    },
    addMessage(message) {
      this.messages.push(message);
    },
  },
};
</script>

<style scoped>
.message-container {
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  max-width: 600px;
  margin: 20px auto;
}

.messages {
  max-height: 300px;
  overflow-y: auto;
  margin-bottom: 10px;
}

.message {
  padding: 5px;
  border-bottom: 1px solid #ddd;
}

.message-input {
  display: flex;
}

.message-input input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px 0 0 5px;
}

.message-input button {
  padding: 10px;
  background-color: #5dcaf2;
  border: none;
  border-radius: 0 5px 5px 0;
  cursor: pointer;
}

.message-input button:hover {
  background-color: #4cb0d1;
}
</style>
  