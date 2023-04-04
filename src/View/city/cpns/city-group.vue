<script setup>
import { computed } from '@vue/reactivity';
import { useRouter } from 'vue-router';
import useCityStore from '@/store/modules/city'


const pros = defineProps({
  groupData : {
    type : Object,
    default : () => {}
  }
})
// 动态的索引
const indexList = computed(() => {
  const list = pros.groupData.cities.map(item => item.group)
  // 将#弹如到开头
  list.unshift("#")
  // 返回映射的新数组,赋值给indexList
  return list
})

const cityStore = useCityStore()

const router = useRouter()
function cityClick(value) {
  cityStore.currentCity = value
  router.back()
}
</script>

<template>
  <div class="city-group">
    <van-index-bar :index-list="indexList">
      <van-index-anchor index="热门"/>
      <div class="hot-city">
        <template v-for="(value, key, index) in groupData.hotCities" 
                  :key="index">
          <div class="city-list" @click="cityClick(value)">{{ value.cityName }}</div>
        </template>
      </div>

      <template v-for="(group, key, index) in groupData.cities" :key="key">
        <van-index-anchor :index="group.group"/>
        <template v-for="(value, key, index) in group.cities" :key="key">
          <van-cell :title="value.cityName" @click="cityClick(value)"/>
        </template>
      </template>
    </van-index-bar>

    <!-- <van-index-bar>
      <van-index-anchor index="热门" />
      <div class="hot-city">
        <template v-for="item in ['天河','番禺','从化','越秀','海珠','珠江','新城/','五羊','新城','商圈','番禺','长隆/','广州','南站','长隆','野生动','物世界','白云区']">
          <div class="city-list">{{ item }}</div>
        </template>
      </div>
    </van-index-bar> -->
  </div>
</template>


<style lang="less" scoped>
  .city-group{
    .van-index-anchor {
      padding: 0 16px;
    }
    .hot-city{
      display: flex;
      flex-wrap: wrap;
      padding:10px;
      padding-right: 25px;
      .city-list {
        width: 60px;
        height: 28px;
        line-height: 28px;
        padding: 4px 8px;
        margin: 4px;
        border-radius: 14px;
        font-size: 12px;
        // line-height: 1;
        text-align: center;
        background-color: #fff4ec;
      }
    }
  }
</style>