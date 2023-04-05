<script setup>
    import houseItemV3 from '@/components/house-item-v3/house-item-v3.vue';
    import houseItemV9 from '@/components/house-item-v9/house-item-v9.vue';
    import { storeToRefs } from 'pinia';
    import useHomeStore from '@/store/modules/home';

    const homeStore = useHomeStore()
    const {houseList} = storeToRefs(homeStore)

</script>


<template>
  <div class="content">
    <h2 class="title">热门精选</h2>
    <div class="list">
      <template v-for="(item,index) in houseList" :key="item.data.houseId">
        <house-item-v3 v-if="item.discoveryContentType === 3"
                      :houseItem="item.data"
        />
        <house-item-v9 v-else-if="item.discoveryContentType === 9"         :houseItem="item.data"
        />
      </template>
    </div>
  </div>
</template>


<style lang="less" scoped>
.content {
  padding: 10px 8px;
  .title{
    font-size: 22px;
    padding: 10px;
  }
  .list {
    display: flex;
    flex-wrap: wrap
  }
}
</style>