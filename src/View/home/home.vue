<script setup>
  import HomeNavBar from './cpns/home-nav-bar.vue'
  import homeSearchBox from './cpns/home-search-box.vue';
  import useHomeStore from '@/store/modules/home';

  const homeStore = useHomeStore()
  // 调用actions 渲染home的城区热门区域
  homeStore.getHomeHotSuggestsAction()

</script>


<template>
  <div class="home">
    <home-nav-bar/>
    <home-search-box/>
  </div>
</template>

<style lang="less" scoped>

</style>