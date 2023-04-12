<script setup>
  import { watch,ref } from 'vue';
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

  const homeRef = ref()
  // v3封装到hooks中
  const {isReachBottom, scrollTop} = useScroll(homeRef)
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
<script>
  // 定义长链接需要用的name标识
  export default { name: "home" }
</script>

<template>
  <div class="home" ref="homeRef">
    <home-nav-bar/>
    <home-search-box/>
    <home-categories/>
    <!-- 到规定的px,显示搜索框 -->
    <div class="search-bar" v-if="isShowSearchBar">
      <search-bar :start-date="'09.19'" :end-date="'09.20'"/>
    </div>
    <home-content/>
    <div class="height"></div>
  </div>
</template>

<style lang="less" scoped>
.home {
  height: 100vh;
  overflow-y: auto;
  box-sizing: border-box;
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
  .height{
    height: 40px;
  }
}
  
</style>