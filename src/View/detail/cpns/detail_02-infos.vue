<script setup>
const props = defineProps({
  infosData : {
    type : Object,
    default : () => ({})
  }
})
console.log(props.infosData)
</script>

<template>
  <div class="infos">
    <div class="title">
      <div class="name">{{ infosData.houseName }}</div>
    </div>
    <div class="serve">
      <div class="serve-left">
        <template v-for="(item,index) in infosData.houseTags" :key="index">
          <span class="sitem" :style="{background:item?.tagText?.background.color,color:item?.tagText?.color}">
            {{ item?.tagText?.text }}
          </span>
        </template>
      </div>
    </div>
    <div class="rate">
      <div class="rate-left">
        <span class="score">{{infosData.commentBrief.overall}}</span>
        <span class="title">{{infosData.commentBrief.scoreTitle}}</span>
        <span class="brief">{{infosData.commentBrief.commentBrief}}</span>
      </div>
      <div class="rete-right">
        <span class="content">
          {{ infosData.commentBrief.totalCount }}条评论
        </span>
        <van-icon name="arrow" color="#ff9645" />
      </div>
    </div>
    <div class="position">
      <div class="position-left">
        <span class="desc">{{infosData.nearByPosition.address}}</span>
      </div>
      <div class="position-right">
        <span class="map">地图·周边</span>
        <van-icon name="arrow" color="#ff9645" />
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
  .infos{
    .title {
      .name {
        font-weight: 700;
        font-size: 20px;
        color: #333;
        text-align: justify;
        line-height: 24px;
        overflow: hidden;
        margin-bottom: 6px
      }
    }
    padding: 16px;
    .serve {
      margin: 10px 0;
      .serve-left{
        .sitem {
          margin: 0 2px;
          padding: 1px 3px;
        }
      }
    }
    .rate {
      display: flex;
      margin: 12px 0;
      padding: 8px 12px;
      justify-content: space-between;
      .rate-left{
        .score{
          font-size: 18px;
          color: #333;
          font-weight: 700;
        }
        .title{
          font-size: 12px;
          font-weight: 700;
          margin: 0 3px;
          color: #333;
        }
        .brief{
          font-size: 12px;
          color: #666;
        }
      }
      .rete-right{
        .content{
          color: #ff9645;
          font-size: 12px;
        }
      }
    }
    .position{
      display: flex;
      margin: 12px 0;
      padding: 8px 12px;
      justify-content: space-between;
      .position-left{
        .desc{
          color: #333;
          font-weight: 700;
        }
      }
      .position-right{
        .map{
          color: #ff9645;
        }
      }
    }
  }
</style>