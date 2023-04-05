<script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import useCityStore from '@/store/modules/city';
  import useHomeStore from '@/store/modules/home'
  import useMainStore from '@/store/modules/main'
  import { storeToRefs } from 'pinia';
  import { formatMonthDay, getDiffDays } from "@/utils/format_date"
import { computed } from '@vue/reactivity';

  // 定义pinia
  const cityStore = useCityStore()
  const {currentCity} = storeToRefs(cityStore)

  // 定义路由
  const router = useRouter()
  function cityClick() {
    router.push('/city')
  }
  // 获取浏览器的定位api
  const positionClick = () => {
  navigator.geolocation.getCurrentPosition(res => {
    console.log("获取位置成功:", res)
  }, err => {
    console.log("获取位置失败:", err)
  }, {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  })
}
  
  // 日期范围的处理 
  // 获取当前 与 明天的日期
  // const nowDate = new Date()
  // const newDate = new Date()
  // newDate.setDate(nowDate.getDate() + 1)

  // // 对时间格式化
  // const startDate = ref(formatMonthDay(nowDate))
  // const endDate = ref(formatMonthDay(newDate))
  // const stayCount = ref(getDiffDays(nowDate, newDate))

  // // 定义日历显示
  // const showCalendar = ref()
  // // vantUI的这个时间,会传递一个值,或者一个数组
  // const onConfirm = (value) => {
  //   // 1.设置日历选中的日期
  //   const selectStartDate = value[0]
  //   const selectEndDate = value[1]
  //   // 将选中的时间格式化,赋值给开始和结束时间
  //   startDate.value = formatMonthDay(selectStartDate)
  //   endDate.value = formatMonthDay(selectEndDate)
  //   stayCount.value = getDiffDays(selectStartDate,selectEndDate)
  //   // 2.选完隐藏日历
  //   showCalendar.value = false
  // }
  // 日期范围的处理 
  const mainStore = useMainStore()
  const {startDate, endDate} = storeToRefs(mainStore)

  // 1.对时间格式化
  // 将从mainStore获取的当前时间格式化,可计算属性赋值给当前变量
  const startDateStr = computed(() => formatMonthDay(startDate.value))
  const endDateStr = computed(() => formatMonthDay(endDate.value))
  const stayCount = ref(getDiffDays(startDate.value, endDate.value))

  // 定义日历显示
  const showCalendar = ref(false)
  // vantUI的这个时间,会传递一个值,或者一个数组
  const onConfirm = (value) => {
    // 1.设置日历选中的日期
    const selectStartDate = value[0]
    const selectEndDate = value[1]
    // 将选中的时间格式化,赋值给store中的state保存日历选中的日期区间
    // 存入的是未格式化的日期,需要使用时间,从第一步中获取已存入state的数据
    mainStore.startDate = selectStartDate
    mainStore.endDate = selectEndDate
    
    stayCount.value = getDiffDays(selectStartDate,selectEndDate)
    // 2.选完隐藏日历
    showCalendar.value = false
  }

  // 热门建议
  const homeStore = useHomeStore()
  const {hotSuggests} = storeToRefs(homeStore)

  // 点击搜索按钮跳转
  function searchBtnClick() {
    // 跳往search页面
    router.push({
      path : '/search',
      query : {
        startDate : startDate.value,
        endDate : endDate.value,
        currentCity : currentCity.value.cityName,
      }
    })
    // 传递日期,定位
    

  }


</script>


<template>
  <!-- 位置信息 -->
  <div class="home-search-box">
    <div class="banner">
      <img src="@/assets/img/home/banner.webp" alt="">
    </div>
    <div class="location">
      <div class="city" @click="cityClick">{{currentCity.cityName}}</div>
      <div class="position" @click="positionClick">
        <div class="text">我的位置</div>
        <img src="@/assets/img/home/icon_location.png" alt="">
      </div>
    </div>
  
    <!-- 日期范围 -->
    <div class="section" @click="showCalendar=true">
      <div class="start ">
        <div class="date">
          <div class="tip tips">入住</div>
          <div class="time">{{startDateStr}}</div>
        </div>
      </div>
      <div class="stay item tips">共{{stayCount}}晚</div>
      <div class="end item">
        <div class="date">
          <div class="date">
            <div class="tip tips">离店</div>
            <div class="time">{{endDateStr}}</div>
          </div>
        </div>
      </div>
    </div>
    <van-calendar v-model:show="showCalendar" 
                  type="range" 
                  @confirm="onConfirm" 
                  :round="false"
                  color="#ff9854"
                  :show-confirm="false"
    />

    <!-- 价格 -->
    <div class="section">
      <div class="price tips">价格不限</div>
      <div class="number item tips">人数不限</div>
    </div>

    <!-- 搜索民宿 -->
    <div class="section">
      <div class="keyword tips">关键字/位置/民宿名</div>
    </div>

    <!-- city热门区域 -->
    <div class="hot-city">
      <template v-for="(item, index) in hotSuggests" :key="index">
        <div class="city-list"
             :style="{color:item.tagText.color, background:item.tagText.background.color}"
        >
        {{ item.tagText.text }}
      </div>
      </template>
    </div>

    <!-- 搜索按钮 -->
    <div class="section search-btn">
      <div class="btn" @click="searchBtnClick">开始搜索</div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.home-search-box{
  .banner {
      img {
        width: 100%;
      }
    }
  .location{
    display: flex;
    // 上下居中
    align-items: center;
    height: 44px;
    padding: 0 20px;
    .city {
      // 城市占满,剩下的内容撑起来
      flex : 1;
    }
    .position {
      width: 74px;
      display: flex;
      align-items: center;
      .text {
        position: relative;
        top: 2px;
        font-size: 12px;
      }
      img {
        margin-left: 5px;
        width:18px;
        height: 18px;
      }
    }
  }
  .section{
    display: flex;
    align-items: center;
    padding: 0 20px;
    height: 44px;
    .item {
      display: flex;
      justify-content: center;
      flex:1;
    }

    .tips{
      font-size: 13px;
      color: #999;
    }
    .time {
      margin: 3px 0 0;
      font-size: 15px;
      color: #333;
    }
    .number{
      padding-left: 180px;
    }
  }
  .hot-city{
    display: flex;
    flex-wrap: wrap;
    padding: 0 20px;
    margin: 10px 0;
    .city-list {
      padding: 4px 8px;
      margin: 4px;
      border-radius: 14px;
      font-size: 12px;
      line-height: 1;
    }
  }
  .search-btn{
    justify-content: center;
    .btn {
      text-align: center;
      line-height: 38px;
      width: 342px;
      height: 38px;
      font-size: 18px;
      font-weight: 500;
      background-image: var(--theme-linear-gradient);
      color: #fff;
      border-radius: 20px;
    }
  }
}
</style>