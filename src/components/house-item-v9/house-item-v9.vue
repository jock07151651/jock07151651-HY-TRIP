<script setup>
  import {computed} from 'vue'
  const prop = defineProps({
    houseItem : {
      type : Object,
      default : () => {}
    }
  })

  const commentScore = computed(() => {
    const score = Number(prop.houseItem.commentScore)
    return score
  })
</script>


<template>
  <div class="item">
    <div class="inner-item">
      <div class="cover">
        <img :src="houseItem.image.url" alt="">
      </div>
      <div class="info">
        <div class="desc">{{ houseItem.summaryText }}</div>
        <div class="name">{{ houseItem.houseName }}</div>
        <div class="rate">
          <van-rate :model-value="commentScore" readonly allow-half color="#ffd21e"/>
          <span class="price">
            ¥{{ houseItem.finalPrice }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>


<style lang="less" scoped>
.item{
  width: 50%;
  .inner-item{
    margin: 5px;
    border-radius: 6px;
    overflow: hidden;
    position: relative;
    .cover{
      img{
        width: 100%;
      }
    }
    .info{
      position: absolute;
      bottom: 0px;
      padding: 8px 10px;
      color: #fff;
      .desc{
        font-size: 12px;
      }
      .name{
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      .rate{
        display: flex;
        justify-content: space-between;
        margin-top: 10px;
        .price{
          font-weight: 400;
        }
      }
    }
  }
}
</style>