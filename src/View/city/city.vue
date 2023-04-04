<script setup>
import { ref, computed } from 'vue';
import { storeToRefs } from 'pinia';
import useCityStore from '@/store/modules/city'
import { useRouter } from 'vue-router';
import CityGroup from './cpns/city-group.vue'



// 网络请求: 请求城市的数据
// const allcities = ref({})
// getCityAll().then(res => {
//   allcities.value = res.data
// })


// 使用路由对象
const router = useRouter()
// 搜索框功能
const searchValue = ref("")
function cancelClick() {
  // 点击取消按钮,返回上一层
  router.back()
}

// tab的切换
const tabActive = ref()

// 使用store对象
const cityStore = useCityStore()
// action方法调用city的获取地区API
cityStore.fetchAllCitiesDataAction()
// 给cityStore仓库响应化
const { allCities } = storeToRefs(cityStore)


// 目的: 获取选中标签后的数据
// 1.获取正确的key: 将tabs中绑定的tabAction正确绑定
// 2.根据key从allCities获取数据, 默认直接获取的数据不是响应式的, 所以必须包裹computed
const currentGroup = computed(() => allCities.value[tabActive.value])
</script>


<template>
  <!-- 城市搜索框 -->
  <div class="city top-page">
    <div class="top">
      <van-search
        v-model="searchValue"
        show-action
        placeholder="城市/区域/位置"
        @cancel="cancelClick"
      />
      <!-- tab标签 -->
      <van-tabs v-model:active="tabActive" color="#ff9854" line-height="3">
        <template v-for="(value, key, index) in allCities" :key="key">
          <van-tab :title="value.title" :name="key"></van-tab>
        </template>
      </van-tabs>
    </div>
    <!-- 热门城市 -->
    <div class="content">
      <template v-for="(value, key, index) in allCities">
        <!-- 传两个(我国和海外出去) 切换海外时,热门城市和对应的地区也发生改变-->
        <city-group v-show="tabActive === key" :group-data="value"></city-group>
      </template>
      
    </div>
  </div>
</template>


<style lang="less" scoped>
  .city{
    .top{
      position: relative;
      z-index: 9;
    }
    .content{
      height: calc(100vh - 98px);
      overflow-y: auto;
    }
  }

  

  
</style>