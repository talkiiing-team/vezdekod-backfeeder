<template>
  <VHeader />
  <main class="container px-6 pt-32">
    <router-view />
  </main>
</template>

<script>
import VHeader from '@/components/VHeader.vue';

export default {
  components: {
    VHeader,
  },
};
</script>
