<script setup>
  import HomeNavBar from './cpns/home-nav-bar.vue'

</script>


<template>
  <div class="home">
    <home-nav-bar/>
    <div class="banner">
      <img src="@/assets/img/home/banner.webp" alt="">
    </div>
    <div class="location">
      <div class="city">广州</div>
      <div class="position">
        <div class="text">我的位置</div>
        <img src="@/assets/img/home/icon_location.png" alt="">
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
  .home{
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
  }
</style>