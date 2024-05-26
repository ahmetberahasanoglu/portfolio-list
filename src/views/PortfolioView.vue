<template>
  <div>
    <Navigation />
    <welcome />
    <jobs />
    <comments />
    <siteFooter />
  </div>
</template>

<script>
import Navigation from '@/components/Navigation.vue';
import welcome from '@/components/welcome.vue';
import jobs from '@/components/jobs.vue';
import comments from '@/components/comments.vue';
import siteFooter from '@/components/siteFooter.vue';

export default {
  name: "HomeView",
  components: {
    Navigation,
    welcome,
    jobs,
    comments,
    siteFooter
  }
};
</script>

<style scoped>

</style>
