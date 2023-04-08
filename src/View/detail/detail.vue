<script setup>
import { useRouter,useRoute } from 'vue-router';
import {getDetailInfos} from '@/services'
import { ref,computed } from 'vue';
import detailCpnSwipe from './cpns/detail_01-swipe.vue'
import detailCpnInfos from './cpns/detail_02-infos.vue'
import detailCpnFacility from './cpns/detail_03-facility.vue';
import detailCpnLandlord from './cpns/detail_04-landlord.vue'

const router = useRouter()
const route = useRoute()
const houseId = route.params.id


// 定义一个空对象
const detailInfos = ref({})
// 访问房屋详情
getDetailInfos(houseId).then(res => {
  // 返回的数据
  detailInfos.value = res.data
}) 
// 将网络请求中的mainPart对象,计算属性赋值给mainPart
const mainPart = computed(() => detailInfos.value.mainPart)

// 点击返回上一页
const onClickLeft = () => {
  router.back()
}

</script>


<template>
  <div class="detail top-page">
    <van-nav-bar
      title="房屋详情"
      left-text="旅途"
      left-arrow
      @click-left="onClickLeft"
    />
    <!-- v-memo 只有这个mainPart数据改变才请求 -->
    <div class="main" v-if="mainPart" v-memo="[mainPart]">
      <!-- 传入swipe轮播图 -->
      <detail-cpn-swipe :swipeData="mainPart.topModule.housePicture.housePics"/>
      <detail-cpn-infos :infosData="mainPart.topModule"/>
      <detail-cpn-facility :facilityData="mainPart.dynamicModule.facilityModule.houseFacility"/>
      <detail-cpn-landlord :landlordData="mainPart.dynamicModule.landlordModule"/>
    </div>
  </div>
</template>


<style lang="less" scoped>

</style>