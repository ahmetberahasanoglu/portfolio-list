<template>
  <div class="navigation" @click.stop>
    <div class="logo"><router-link to="/">Logo</router-link></div>
    <div class="links">
      <div class="nav-group">
        <div class="user-profile" v-if="loggedIn" @click.stop="toggleUserMenu">
          <div class="user-icon">
            <i class="fas fa-user-circle"></i>
          </div>
          <p class="username">{{ username }}</p>
          <div v-if="showUserMenu" class="dropdown-menu user-dropdown">
            <router-link to="/logout" class="dropdown-item">Çıkış Yap</router-link>
          </div>
        </div>
        <span class="separator" v-if="loggedIn"> | </span>
        <div class="nav-item messages" @click.stop="toggleMessages">
          <i class="fas fa-envelope"></i>
          <div v-if="showMessages" class="dropdown-menu messages-dropdown">
            <div v-for="message in lastMessages" :key="message.id" class="dropdown-item">
              {{ message.text }}
            </div>
            <router-link to="/messages" class="view-all">Mesajları Gör</router-link>
          </div>
        </div>
        <span class="separator" v-if="loggedIn"> | </span>
        <div class="notification-icon" @click.stop="toggleNotifications" v-if="loggedIn">
          <span class="badge" v-if="notificationCount > 0">{{ notificationCount }}</span>
          <i class="fas fa-bell"></i>
          <div v-if="showNotifications" class="dropdown-menu notifications-dropdown">
            <div v-for="notification in lastNotifications" :key="notification.id" class="dropdown-item">
              {{ notification.text }}
            </div>
            <router-link to="/notifications" class="view-all">Tümünü Gör</router-link>
          </div>
        </div>
        <span class="separator" v-if="!loggedIn"> | </span>
        <router-link v-if="!loggedIn" to="/login" class="nav-item">Giriş Yap</router-link>
        <span class="separator" v-if="!loggedIn"> | </span>
        <router-link v-if="!loggedIn" to="/register" class="nav-item">Kayıt Ol</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loggedIn: true,
      username: "Ahmet",
      notificationCount: 2,
      showNotifications: false,
      showUserMenu: false,
      showMessages: false,
      notifications: [
        { id: 1, text: "Bildirim 1" },
        { id: 2, text: "Bildirim 2" },
      ],
      messages: [
        { id: 1, text: "Mesaj 1" },
        { id: 2, text: "Mesaj 2" },
      ],
    };
  },
  computed: {
    lastNotifications() {
      return this.notifications.slice(-3);
    },
    lastMessages() {
      return this.messages.slice(-3);
    },
  },
  methods: {
    toggleNotifications() {
      this.showNotifications = !this.showNotifications;
      if (this.showNotifications) {
        this.showUserMenu = false;
        this.showMessages = false;
      }
    },
    toggleUserMenu() {
      this.showUserMenu = !this.showUserMenu;
      if (this.showUserMenu) {
        this.showNotifications = false;
        this.showMessages = false;
      }
    },
    toggleMessages() {
      this.showMessages = !this.showMessages;
      if (this.showMessages) {
        this.showNotifications = false;
        this.showUserMenu = false;
      }
    },
    closeDropdowns() {
      this.showNotifications = false;
      this.showUserMenu = false;
      this.showMessages = false;
    }
  },
  mounted() {
    document.addEventListener('click', this.closeDropdowns);
  },
  beforeDestroy() {
    document.removeEventListener('click', this.closeDropdowns);
  },
};
</script>

<style scoped>
body {
  padding-top: 60px;
}

.navigation {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: calc(100% - 40px);
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #2c3e50;
  padding: 10px 20px;
  font-family: "Poppins", sans-serif;
  height: 50px;
}

.logo a {
  font-weight: bold;
  font-size: 25px;
  color: #ff7f50;
  text-decoration: none;
  transition: transform 0.3s ease;
}

.logo a:hover {
  transform: scale(1.3);
  color: #fff;
}

.links {
  display: flex;
  align-items: center;
  position: relative;
}

.nav-group {
  display: flex;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.2);
  padding: 0 10px;
  border-radius: 8px;
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 4px;
  position: relative;
  cursor: pointer;
}

.user-icon,
.username {
  color: #fff;
}

.user-profile:hover .user-icon,
.user-profile:hover .username {
  color: #ff7f50;
}

.user-dropdown {
  left: -10px;
}

.messages-dropdown,
.notifications-dropdown {
  left: -50px;
}

.dropdown-menu {
  position: absolute;
  top: 50px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  overflow: hidden;
  z-index: 10;
  padding: 10px 0;
}

.dropdown-item {
  display: block;
  padding: 5px 6px;
  color: #2c3e50;
  text-decoration: none;
  font-size: small;
}

.dropdown-item:hover {
  background-color: #f0f0f0;
}

.nav-item {
  color: #fff;
  font-size: 20px;
  margin: 0 10px;
  position: relative;
  cursor: pointer;
}

.nav-item:hover {
  color: #ff7f50;
}

.separator {
  color: #fff;
  font-size: 20px;
}

.notification-icon {
  position: relative;
  cursor: pointer;
  color: #fff;
  margin-left: 10px;
}

.notification-icon:hover {
  color: #ff7f50;
}

.notification-icon .badge {
  position: absolute;
  top: -10px;
  right: -10px;
  background-color: red;
  color: white;
  font-size: 12px;
  padding: 3px 6px;
  border-radius: 50%;
}

.notification-panel {
  position: absolute;
  top: 60px;
  left: -50px;
  width: 200px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 100;
  padding: 10px;
}

.notification {
  padding: 10px;
  border-bottom: 1px solid #ccc;
}

.notification:last-child {
  border-bottom: none;
}

.view-all {
  display: block;
  margin-top: 10px;
  text-align: right;
  font-size: 12px;
  color: #ff7f50;
  text-decoration: none;
  padding: 0 20px;
}

.view-all:hover {
  color: #0056b3;
  text-decoration: underline;
}

.logout-button {
  background-color: #ff7f50;
  color: #fff;
  padding: 8px 15px;
  border-radius: 4px;
  font-size: 15px;
}

.logout-button:hover {
  background-color: #e64c00;
}
</style>
