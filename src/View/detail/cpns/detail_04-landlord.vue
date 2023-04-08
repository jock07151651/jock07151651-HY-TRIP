<script setup>
  import detailSlot from '@/components/detail-slot/detail-slot.vue';
  const props = defineProps({
    landlordData : {
      type : Object,
      default : () => ({})
    }
  })
</script>


<template>
  <div class="landlord">
    <detail-slot title="房东介绍" more-text="查看房东主页">
      <div class="intro">
        <div class="top">
          <img :src="landlordData.topScroll" alt="">
        </div>
        <div class="content">
          <div class="cleft">
            <img :src="landlordData.hotelLogo" alt="">
            <div class="info">
              <div class="ileft">
                <div class="hotelName">{{ landlordData. hotelName}}</div>
              </div>
              <div class="iright">
                <template v-for="(item,index) in landlordData.hotelTags" :key="index">
                  <div class="item">{{ item.tagText.text }}</div>
                  <div class="divider" v-if="index != landlordData.hotelTags.length - 1">|</div>
                </template>
              </div>
            </div>
          </div>
          <div class="cright">
            <div class="contact">联系房东</div>
          </div>
        </div>
        <div class="bottom">
          <template v-for="(item,index) in landlordData.hotelSummary" :key="index">
            <div class="item">
              <div class="rate">{{ item.title }}</div>
              <div class="percentage">{{ item.introduction }}</div>
              <div class="comment">{{ item.tip }}</div>
            </div>
          </template>
        </div>
      </div>
    </detail-slot>
  </div>
</template>


<style lang="less" scoped>
.landlord {
  .intro{
    .top{
      img {
        width: 100%;
        border-radius: 5px;
      }
    }
    .content{
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 10px;
      height: 54px;
      .cleft {
        display: flex;
        img {
          width: 54px;
          height: 54px;
        }
        .info{
          margin-left: 5px;
          .ileft{
            .hotelName {
              margin-top: 8px;
              font-size: 16px;
              font-weight: 600;
            }
          }
          .iright{
            display: flex;
            .item{
              display: flex;
              color: #9b9b9b;
            }
          .divider {
              margin: 0 5px;
              color: #ccc;
            }
          }
        }
      }
      .cright{
        .contact {
          height: 24px;
          line-height: 24px;
          color: #fff;
          font-size: 12px;
          border-radius: 5px;
          padding: 0 12px 0;
          background-image: linear-gradient(90deg,#fa8c1d, #fcaf3f);
        }
      }
    }
    .bottom{
      display: flex;
      justify-content: space-between;
      margin: 50px 10px 10px;
      .item{
        .rate{
          color: #999;
        }
        .percentage{
          margin: 5px 0;
          font-size: 18px;
          color: #333;
          font-weight: 700;
        }
        .comment{
          color: #666;
          font-size: 12px;
        }
      }
    }
  }
}
</style>