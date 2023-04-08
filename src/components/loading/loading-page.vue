<script setup>
import useMainStore from '@/store/modules/main';
import { computed } from 'vue';

const mainStore = useMainStore()
const isLoading = computed(() => {
  return mainStore.isLoading
})
</script>


<template>
  <div class="loading" v-if="isLoading">
    <div class="bg">
      <img src="@/assets/img/home/full-screen-loading.gif" alt="">
    </div>
  </div>
</template>


<style lang="less" scoped>
  .loading{
    position: fixed;
    z-index: 999;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0,0,0,.2);
    img {
      width: 70px;
      height: 70px;
      margin-bottom: 8px;
    }
    .bg {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 104px;
      height: 104px;
      background: url(@/assets/img/home/loading-bg.png) 0 0 / 100% 100%;

    }
  }
</style>