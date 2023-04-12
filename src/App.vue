<script setup>
  import tabbar from '@/components/tab-bar/tab-bar.vue'
  import { useRoute } from "vue-router";
  import loadingPage from './components/loading/loading-page.vue';

  const route = useRoute()

</script>


<template>
  <div class="app">
    <!-- 显示跳转路由的页面 -->
    <router-view v-slot="props">
      <!-- 那个页面需要长链接, home -->
      <keep-alive include="home">
        <component :is="props.Component"></component>
      </keep-alive>
    </router-view>
    <!-- 因为这个tabbar在所有页面都有的,所以放在app组件 -->
    <tab-bar v-show="!route.meta.hideTabBar"/>
    <loading-page/>
  </div>
</template>

<style scoped>

</style>
