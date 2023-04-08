<script setup>

</script>


<template>
  <div class="detail-swipe">
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item>1</van-swipe-item>
      <van-swipe-item>2</van-swipe-item>
      <van-swipe-item>3</van-swipe-item>
      <van-swipe-item>4</van-swipe-item>
    </van-swipe>
  </div>
</template>


<style lang="less" scoped>
.detail-swipe{
  .my-swipe{
    height: 300px;
  }
  
}
</style>