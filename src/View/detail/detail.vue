<script setup>
import { useRouter,useRoute } from 'vue-router';
import {getDetailInfos} from '@/services'
import { ref,computed,watch } from 'vue';
import detailCpnSwipe from './cpns/detail_01-swipe.vue'
import detailCpnInfos from './cpns/detail_02-infos.vue'
import detailCpnFacility from './cpns/detail_03-facility.vue';
import detailCpnLandlord from './cpns/detail_04-landlord.vue';
import detailCpnComment from './cpns/detail_05-comment.vue'
import detailCpnNotice from './cpns/detail_06-notice.vue'
import detailCpnMap from './cpns/detail_07-map.vue'
import detailCpnIntro from './cpns/detail_08-intro.vue'
import tabControl from '@/components/tab-control/tab-control.vue'
import useScroll from '@/hooks/useScroll';

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

// tabControl相关的操作
// 获取detail元素
const detailRef = ref()
// 引入监控画面滚动hooks,传入当前监听的元素
const {scrollTop} = useScroll(detailRef)
const showTabControl = computed(() => {
  // 在元素内滑动300px时显形
  return scrollTop.value >= 300
})

const sectionEls = ref({})
const getSectionRef = (value) => {
  // 注销的时候,value为null,在null里面拿属性会报错
  if(!value) return
  // 获取标签中name属性中的值
  const name = value.$el.getAttribute("name")
  // 对象的键,对应 el监听的元素
  sectionEls.value[name] = value.$el
}

const names = computed(() => {
  // 返回对象的key,以数组形式保存
  // 如['描述', '设施', '房东', '评论', '须知', '周边']
  return Object.keys(sectionEls.value)
})

// 设置一个变量,判断是否点击跳转
let isClick = false
// 设置一个标记当前位置px
let currentDistance = -1
const detailTabClick = (index) => {
  
  // 获取Object.keys(sectionEls.value)索引的第几位
  const key = Object.keys(sectionEls.value)[index]
  // 获取的key,去获取sectionEls的值, 值是对应的document对象
  const el = sectionEls.value[key]
  // el.offsetTop 获取每个元素对象偏移的px
  let distance = el.offsetTop
  if (index !== 0) {
    // 减去的44是 tab的高度,就不会遮住当前元素的顶部
    distance = distance - 44
  }
  // 如果是点击跳转,
  isClick = true
  // 将当前元素的偏移量赋值给currentDistance
  currentDistance = distance
  detailRef.value.scrollTo({
    top : distance,
    // 慢慢滑动
    behavior : "smooth"
  })
}


const tabControlRef = ref()
// 监听scrollTop实时移动
watch(scrollTop, (newScrollTop) => {
  // 判断如果是滚动
  if(currentDistance === newScrollTop) isClick = false
  // 判断是否点击跳转
  if(isClick) return
  // 1.获取所有的区域的offsetTops
  const els = Object.values(sectionEls.value)
  // 将元素所偏移的top映射成一个数组
  const values = els.map(el => el.offsetTop)

  // 设置一个实时监听变化的currIndex,默认设置为最后的索引
  let index = values.length - 1
  // 通过算法,把当前所处的px,返回对应的index给tab-control
  for(let i=0; i<values.length; i++) {
    // 44是tab的高度
    if(values[i] > newScrollTop + 44) {
      // 100 200 300 400 500
      // newScrollTop = 250 在200-300之间
      // 因为250大于了 200,所以索引必然是200之后的
      // 所以当前的索引是指向了 300 = 2,当250是属于200 -300之间
      // 所以i要指向200 = 1
      index = i - 1
      break
    }
  }
  tabControlRef.value?.setCurrentIndex(index)
})


</script>


<template>
  <div class="detail top-page" ref="detailRef">
    <tab-control 
      class="tabs" 
      v-if="showTabControl" 
      :titles="names"
      @itemClick="detailTabClick"
      ref="tabControlRef"
    />
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
      <!-- title,描述 -->
      <detail-cpn-infos name="描述" :ref="getSectionRef" :infosData="mainPart.topModule"/>
      <!-- 房屋设施 -->
      <detail-cpn-facility name="设施" :ref="getSectionRef" :facilityData="mainPart.dynamicModule.facilityModule.houseFacility"/>
      <!-- 房东介绍 -->
      <detail-cpn-landlord name="房东" :ref="getSectionRef" :landlordData="mainPart.dynamicModule.landlordModule"/>
      <!-- 热门评论 -->
      <detail-cpn-comment name="评论" :ref="getSectionRef" :commentData="mainPart.dynamicModule.commentModule"/>
      <!-- 入店须知 -->
      <detail-cpn-notice name="须知" :ref="getSectionRef" :noticeData="mainPart.dynamicModule.rulesModule"/>
      <!-- 周边 -->
      <detail-cpn-map name="周边" :ref="getSectionRef" :mapData="mainPart.dynamicModule.positionModule"/>
      <!-- 价格说明 -->
      <detail-cpn-intro :priceIntro="mainPart.introductionModule"/>
    </div>
    <div class="footer">
      <img src="@/assets/img/detail/icon_ensure.png" alt="">
      <div class="text">弘源旅途, 永无止境!</div>
    </div>
  </div>
</template>


<style lang="less" scoped>

.detail{
  .footer {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 120px;

    img {
      width: 123px;
    }

    .text {
      margin-top: 12px;
      font-size: 12px;
      color: #7688a7;
    }
  }
.tabs{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 9;
  }
}

</style>