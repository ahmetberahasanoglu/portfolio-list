<template>
  <div>
    <Navigation />
    <Login />
  </div>
</template>

<script>
import Navigation from '@/components/Navigation.vue';
import Login from '@/components/Login.vue';

export default {
  name: "LoginView",
  components: {
    Navigation,
    Login,
  },
};
</script>

<style scoped>

</style>
