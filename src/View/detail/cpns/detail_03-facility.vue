<script setup>
import detailSlot from '@/components/detail-slot/detail-slot.vue';
const props = defineProps({
  facilityData : {
    type : Object,
    default : () => ({})
  }
})
</script>


<template>
  <div class="facility">
    <!-- 这里传递参数给slot -->
    <detail-slot title="房屋设施" more-text="查看全部设施">
      <div class="facility-inner">
        <template v-for="(item,index) in facilityData.houseFacilitys" :key="index">
          <div class="item" v-if="facilityData?.facilitySort.includes(index)">
            <div class="head">
              <img :src="item.icon" alt="">
              <span>{{ item?.groupName }}</span>
            </div>
            <div class="list">
              <template v-for="(iten, index) in item.facilitys.slice(0,4)" :key="index">
                <div class="iten">
                  <i class="icon_check icon"></i>
                  <span>{{ iten.name }}</span>
                </div>
              </template>
            </div>
          </div>
        </template>
      </div>
    </detail-slot>
  </div>
</template>


<style lang="less" scoped>
.facility {
  .facility-inner{
    .item{
      display: flex;
      margin: 25px 0;
      .head{
        display: flex;
        width: 90px;
        text-align: center;
        flex-direction: column;
        // head里面的元素左右居中
        align-items: center;
        img {
          width: 20px;
          height: 20px;
          text-align: center;
        }
        span{
          margin: 5px 0 0;
        }
      }
      .list{
        display: flex;
        flex:1;
        flex-wrap: wrap;
        .iten{
          display: flex;
          align-items: center;
          box-sizing: border-box;
          width: 50%;
          margin: 4px 0;
          .icon{
            margin: 0 6px;
          }
        }
      }
    }
  }
}
</style>