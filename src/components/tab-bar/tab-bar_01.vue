<script setup>
  import {useRouter} from 'vue-router';
  import tabbarData from '@/assets/data/tabbar'
  import {getAssetURL} from '@/utils/load_assets'
  import { ref } from 'vue';

  const router = useRouter()
  const currentIndex = ref(0)

  function itemClick(index,toPath) {
    this.currentIndex = index
    console.log(this.currentIndex)
    router.push({
      path : toPath
    })
  }
</script>


<template>
  <div class="tab-bar">
    <template v-for="(item,index) in tabbarData" :key="index">
      <div class="tab-bar-item" 
           :class="{active: currentIndex === index}"
           @click="itemClick(index,item.path)"
      >
        <img v-if="currentIndex !== index" :src="getAssetURL(item.image)" alt="">
        <img v-else :src="getAssetURL(item.imageActive)" alt="">
        <span class="text">{{ item.text }}</span>
      </div>
    </template>
    
    <!-- <div class="tab-bar-item">
      <img src="@/assets/img/tabbar/tab_favor.png" alt="">
      <span class="text">收藏</span>
    </div>
    <div class="tab-bar-item">
      <img src="@/assets/img/tabbar/tab_order.png" alt="">
      <span class="text">订单</span>
    </div>
    <div class="tab-bar-item">
      <img src="@/assets/img/tabbar/tab_message.png" alt="">
      <span class="text">消息</span>
    </div> -->
  </div>
</template>


<style lang="less" scoped>
  .tab-bar{
    position: fixed;
    bottom: 0;
    left:0;
    right: 0;
    height: 50px;
    display: flex;
    border:1px solid #f2f2f2;
    .tab-bar-item {
      display: flex;
      // 以上下列,排布
      flex-direction: column;
      // 上下的,让平行
      flex-wrap: wrap;
      // 左右居中
      align-content: center;
      flex:1;
      &.active {
        color: var(--primary-color);
      }
      img {
        width: 36px;
      }
      .text {
        text-align: center;
        font-size: 12px;
        margin-top: 2px;
      }
    }
    
  }
</style>