<script setup>
  import tabbar from '@/components/tab-bar/tab-bar.vue'
  import { useRoute } from "vue-router";

  const route = useRoute()
  console.log(!route.meta.hideTabBar)
</script>

<template>
  <div class="app">
    <!-- 显示跳转路由的页面 -->
    <router-view></router-view>
    <!-- 因为这个tabbar在所有页面都有的,所以放在app组件 -->
    <tab-bar v-if="!route.meta.hideTabBar"/>
  </div>
</template>

<style scoped>

</style>
