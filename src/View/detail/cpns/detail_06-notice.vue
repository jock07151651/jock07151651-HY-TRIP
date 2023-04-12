<script setup>
  import detailSlot from '@/components/detail-slot/detail-slot.vue';
  const props = defineProps({
    noticeData : {
      type : Object,
      default : () => ({})
    }
  })
</script>


<template>
  <div class="notice">
    <detail-slot title="预定须知">
      <div class="inner-notice">
        <template v-for="(item, index) in noticeData.orderRules">
          <div class="item">
            <div class="tip">{{ item.title }}</div>
            <div class="desc">{{ item?.introduction }}</div>
            <div class="tips" v-if="item.tips">查看说明</div>
          </div>
        </template>
      </div>
    </detail-slot>
  </div>
</template>


<style lang="less" scoped>
.notice{
  .inner-notice{
    .item{
      display: flex;
      margin: 10px 0 20px;
      font-size: 12px;
      .tip{
        width: 64px;
        color: #666;
      }
      .desc{
        flex: 1;
        color: #333;
      }
    }
  }
}
</style>