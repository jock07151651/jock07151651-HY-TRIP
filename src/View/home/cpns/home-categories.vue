<script setup>
  import useHomeStore from '@/store/modules/home';
  import { storeToRefs } from 'pinia';
  const homeStore = useHomeStore()
  const {categories} = storeToRefs(homeStore)

</script>


<template>
  <div class="categories">
    <template v-for="(item, index) in categories">
      <div class="item">
        <img :src="item.pictureUrl" alt="">
        <div class="title">{{ item.title }}</div>
      </div>
    </template>
  </div>
</template>


<style lang="less" scoped>
  .categories{
    display: flex;
    overflow-x: auto;
    height: 80;
    padding: 0 10px;
    margin-top: 8px;
    // 消除滚动条
    &::-webkit-scrollbar {
      display: none; /* Chrome Safari */
    }
    .item {
      // 不占满整一行
      flex-shrink: 0;
      display: flex;
      width: 70px;
      height: 80px;
      // 以列排序
      flex-direction: column;
      // 左右居中
      align-items: center;
      // 上下居中
      justify-content: center;
      img {
        width: 32px;
        height: 32px;
      }
      .title {
        margin-top: 8px;
        font-size: 12px;
      }

    }
  }
</style>