<script setup>
  import detailSlot from '@/components/detail-slot/detail-slot.vue';
import { computed } from 'vue';
  const props = defineProps({
    commentData : {
      type : Object,
      default : () => ({}),
    }
  })

  const commentScore = computed(() => {
    const star = props.commentData.overall
    return star
  })

</script>


<template>
  <div class="dcomment">
    <detail-slot title="热门评论" :more-text="`查看全部${commentData.totalCount}条评论`">
      <div class="header">
        <div class="left">
          <div class="rate">
            <div class="text">{{ commentData.overall }}</div>
            <div class="line"></div>
          </div>
          
          <div class="hdesc">
            <div class="zan">{{ commentData.scoreTitle }}</div>
            <div class="count">{{ commentData.totalCount }}条评论</div>
            <div class="star">
              <van-rate :model-value="commentScore" readonly allow-half color="#ffd21e" :size="12"/>
            </div>
          </div>
        </div>
        <div class="tips">
          <template v-for="(item, index) in commentData.subScores" :key="index">
            <div class="titem">{{ item }}</div>
          </template>
        </div>
      </div>
      <div class="main">
        <template v-for="(item, index) in commentData.commentTagVo" :key="index">
          <div class="mitem" :style="{backgroundColor:item.backgroundColor,color:item.color}">{{ item.text }}</div>
        </template>
      </div>
      <div class="bottom">
        <div class="b-top">
          <img :src="commentData.comment.userAvatars" alt="">
          <div class="info">
            <div class="name">{{ commentData.comment.userName }}</div>
            <div class="date">{{ commentData.comment.checkInDate }}</div>
          </div>
        </div>
        <div class="bdesc">
          <div class="desc">{{ commentData.comment.commentDetail }}</div>
        </div>
      </div>
    </detail-slot>
  </div>
</template>


<style lang="less" scoped>
.dcomment{
  padding: 10px 0;
  .header{
    display: flex;
    .left{
      display: flex;
      align-items: center;
      .rate{
        .text{
          font-size: 48px;
          text-align: center;
          font-weight: 700;
        }
        .line{
          width: 66px;
          height: 5px;
          border-radius: 3px;
          margin-top: -10px;
          background: linear-gradient(90deg, #fa8c1d, #fcaf3f)
        }
        
      }
      .hdesc{
        margin-left: 10px;
        display: flex;
        flex-direction: column;
        .zan{
          font-size: 12px;
          color: #333;

        }
        .count{
          font-size: 12px;
          color: #999;
        }
        .star{}
      }
    }
    .tips{
      display: flex;
      flex: 1;
      flex-wrap: wrap;
      align-items: center;
      color: #666;
      // justify-content: center;
      .titem{
        display: flex;
        justify-content: flex-end;
        font-size: 12px;
        width: 33.33333%;
      }
    }
  }
  .main{
    display: flex;
    margin: 10px 0;
    flex: 1;
    flex-wrap: wrap;
    .mitem{
      font-size: 12px;
      margin: 5px 8px 0 0;
      padding: 3px 5px;
    }
  }
  .bottom{
    display: flex;
    flex-wrap: wrap;
    padding: 10px 0;
    .b-top{
      display: flex;
      img{
        width: 32px;
        height: 32px;
      }
      .info{
        margin-left: 10px;
        .name{}
        .date{
          margin-top: 5px;
          font-size: 12px;
          color: #999;
        }
      }
    }
    .bdesc{
      margin-top: 16px;
      .desc{
        font-size: 12px;
        color: #333;
      }
    }
  }
}
</style>