<script setup>

  import tabbarData from '@/assets/data/tabbar'
  import {getAssetURL} from '@/utils/load_assets'
  import { watch,ref } from 'vue';
  import { useRoute } from 'vue-router';

  // 监听路由改变时, 找到对应的索引, 设置currentIndex
  const route = useRoute()
  const currentIndex = ref(0)
  watch(route, (newValue) => {
    // tabbarData的当前的路由,等于新路由,则返回最新路由
    const index = tabbarData.findIndex(item => item.path === newValue.path)
    if (index === -1) return 
    currentIndex.value = index
  })

</script>


<template>
  <div class="tab-bar">
    <!-- v-model双向绑定值,script的currentIndex改变,这里也变 -->
    <!-- active-color：改变active的颜色 -->
    <van-tabbar v-model="currentIndex" active-color="#ff9854" route>
      <template v-for="(item, index) in tabbarData">
        <van-tabbar-item :to=item.path>
          <template #default>
            <span>{{ item.text }}</span>
          </template>
          <template #icon>
            <img v-if="currentIndex !== index" :src="getAssetURL(item.image)" alt="">
            <img v-else :src="getAssetURL(item.imageActive)" alt="">
          </template>
        </van-tabbar-item>
      </template>
    </van-tabbar>
  </div>

</template>


<style lang="less" scoped>
  .tab-bar {
    // 局部定义一个变量: 只针对.tab-bar子元素才生效
    // --van-tabbar-item-icon-size: 30px !important;

    // 找到类, 对类中的CSS属性重写
    // :deep(.class)找到子组件的类, 让子组件的类也可以生效
    :deep(.van-tabbar-item__icon) {
      font-size: 50px;
    }
    img {
      height:26px;
    }
  }
</style>