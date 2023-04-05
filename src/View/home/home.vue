<script setup>
  import { watch } from 'vue';
  import HomeNavBar from './cpns/home-nav-bar.vue'
  import homeSearchBox from './cpns/home-search-box.vue';
  import homeCategories from './cpns/home-categories.vue';
  import homeContent from './cpns/home-content.vue';
  import searchBar from '@/components/search-bar/search-bar.vue'
  import useHomeStore from '@/store/modules/home';
  import useScroll from '@/hooks/useScroll'
import { computed } from '@vue/reactivity';


  const homeStore = useHomeStore()
  // 调用actions 渲染home的城区热门区域
  homeStore.getHomeHotSuggestsAction()
  // 调用actions 渲染home的房屋分类
  homeStore.getHomeCategoriesAction()
  // 调用actions 渲染house的房间列表
  homeStore.getHomeHouselistAction()

  
  // v3封装到hooks中
  const {isReachBottom, scrollTop} = useScroll()
  // 监听是否到底了
  watch(isReachBottom, (newValue) => {
    if (newValue) {
      homeStore.getHomeHouselistAction().then(() => {
        // 到底重新请求,并把"到底" 赋值为false
        isReachBottom.value = false
      })
    }
  })

  //住里搜索框显示
  const isShowSearchBar = computed(() => {
    // 滑动到这个像素 返回true
    return scrollTop.value >= 360
  })

</script>


<template>
  <div class="home">
    <home-nav-bar/>
    <home-search-box/>
    <home-categories/>
    <div class="search-bar" v-if="isShowSearchBar">
      <search-bar :start-date="'09.19'" :end-date="'09.20'"/>
    </div>
    <home-content/>
    <div class="height"></div>
  </div>
</template>

<style lang="less" scoped>
  .height{
    height: 40px;
  }
  .search-bar {
    position: fixed;
    z-index: 9;
    top: 0;
    left: 0;
    right: 0;
    height: 45px;
    padding: 16px 16px 10px;
    background-color:#fff;
  }
</style>