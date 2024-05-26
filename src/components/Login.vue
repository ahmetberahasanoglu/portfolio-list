<template>
  <div class="page-container">
    <div class="login-container">
      <h2>Giriş Yap</h2>
      <form @submit.prevent="login">
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="email" required />
        </div>
        <div class="form-group">
          <label for="password">Şifre:</label>
          <input type="password" id="password" v-model="password" required />
        </div>
        <button type="submit">Giriş Yap</button>
      </form>
    </div>
    <div class="footer-container">
      <SiteFooter />
    </div>
  </div>
</template>

<script>
import SiteFooter from "@/components/siteFooter.vue";

export default {
  components: {
    SiteFooter,
  },
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    login() {
      console.log("Giriş yapılıyor:", this.email);
    },
  },
};
</script>

<style scoped>
.page-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  position: relative;
}

.login-container {
  max-width: 450px;
  width: 100%;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 15px;
}

label {
  margin-bottom: 5px;
}

input {
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
  width: 95%;
}

button {
  padding: 10px;
  background-color: #ff7f50;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #ff5722;
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
