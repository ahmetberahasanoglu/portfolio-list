<template>
  <Navigation />
  <div class="messages">
    <h2>Mesajlar</h2>
    <ul>
      <li v-for="(message, index) in messages" :key="index">
        <div class="message">
          <div class="sender">{{ message.sender }}</div>
          <div class="content">{{ message.content }}</div>
        </div>
      </li>
    </ul>
  </div>
  <div class="footer-container"><SiteFooter /></div>
  
</template>
  
  <script>
import Navigation from "@/components/Navigation.vue";
import SiteFooter from "@/components/siteFooter.vue";
export default {
  components: {
    Navigation,
    SiteFooter,
  },
  data() {
    return {
      messages: [
        { sender: "Ali", content: "Merhaba, nasılsın?" },
        { sender: "Ayşe", content: "İşteyim, sen nasılsın?" },
        { sender: "Mehmet", content: "Teşekkür ederim, iyiyim sen?" },
      ],
    };
  },
};
</script>
  
  <style scoped>
.messages {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  font-family: "Poppins", sans-serif;
}

.messages h2 {
  margin-bottom: 10px;
}

.messages ul {
  list-style: none;
  padding: 0;
}

.messages .message {
  background-color: #f0f0f0;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
}

.messages .sender {
  font-weight: bold;
}

.messages .content {
  margin-top: 5px;
}
.footer-container {
  position: absolute;
  bottom: 0;
  width: 100%;
  background-color: #f8f9fa;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
  