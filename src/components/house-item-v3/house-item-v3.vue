<script setup>
import {computed} from 'vue'
const prop = defineProps({
  houseItem : {
    type : Object,
    default : () => {}
  }
})


</script>


<template>
<div class="item">
  <div class="inner-item">
    <div class="cover">
      <img :src="houseItem.image.url" alt="">
    </div>
    <div class="info">
      <div class="loaction">
        <img src="@/assets/img/home/location.png" alt="">
        <span>{{ houseItem.location }}</span>
      </div>
      <div class="name">{{ houseItem.houseName }}</div>
      <div class="desc">{{ houseItem.summaryText }}</div>
      <div class="price">
        <span class="newprice">
          ¥{{ houseItem.finalPrice }}
        </span>
        <span class="oldprice">
          ¥{{ houseItem.productPrice }}
        </span>
        <span class="pricesub">
          {{ houseItem?.priceTipBadge?.text }}
        </span>
      </div>
    </div>
  </div>
</div>
</template>


<style lang="less" scoped>
.item {
  width: 50%;
  .inner-item {
    margin: 5px;
    border-radius: 6px;
    overflow: hidden;
    .cover {
      img {
        width: 100%;
      }
    }
    .info{
      padding: 8px 10px;
      font-size: 12px;
      color: #666;
      .loaction{
        display: flex;
        align-items: center;
        img {
          width: 12px;
          height: 12px;
        }
        span {

        }
      }
      .name {
        margin: 5px 0;
        font-size: 14px;
        color: #333;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        // 显示两行
        -webkit-line-clamp: 2;
        // 超出隐藏
        -webkit-box-orient: vertical;
      }
      .price {
        display: flex;
        align-items: flex-start;
        margin: 8px 0;
        .newprice {
          color: #ff9645;
          font-size: 14px;
        }
        .oldprice{
          margin: 0 3px;
          color: #999;
          font-size: 12px;
          text-decoration: line-through;
        }
        .pricesub{
          background-image: linear-gradient(270deg, #f66, #ff9f9f);
          color: #fff;
          padding: 1px 6px;
          border-radius: 8px;
        }
      }
    }
  }
  }
</style>