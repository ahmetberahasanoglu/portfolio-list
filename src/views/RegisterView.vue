<template>
  <div>
    <Navigation />
    <Register />
  
  </div>
</template>

<script>
import Navigation from '@/components/Navigation.vue';
import Register from '@/components/Register.vue';


export default {
  name: "RegisterView",
  components: {
    Navigation,
    Register
    
  }
};
</script>

<style scoped>

</style>
