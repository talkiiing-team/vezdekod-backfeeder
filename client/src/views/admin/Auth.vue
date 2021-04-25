<template>
  <div class="text-center">
    <h2>Панель администратора</h2>
    <AuthForm />
  </div>
</template>

<script>
import AuthForm from '@/components/AuthForm.vue';

export default {
  name: 'Auth',
  components: { AuthForm },
};
</script>
