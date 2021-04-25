<template>
  <VHeader />
  <main class="container px-6 pt-32">
    <router-view />
  </main>
  <VFooter />
</template>

<script>
import VHeader from '@/components/VHeader.vue';
import VFooter from '@/components/VFooter.vue';

export default {
  components: {
    VFooter,
    VHeader,
  },
};
</script>
