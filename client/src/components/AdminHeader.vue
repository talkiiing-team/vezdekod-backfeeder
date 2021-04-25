<template>
  <div class="grid grid-flow-col text-center divide-gray-200 divide-x">
    <router-link to="/admin/panel" exact-active-class="font-bold">Обращения</router-link>
    <router-link to="/admin/stats" exact-active-class="font-bold">Статистика</router-link>
  </div>
</template>

<script>
export default {
  name: 'AdminHeader',
};
</script>
