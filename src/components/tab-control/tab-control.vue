<script setup>
import { ref } from 'vue';
const props = defineProps({
  titles : {
    type : Array,
    default : () => []
  }
})
const currentIndex = ref(0)

// 绑定函数,并且发出事件
const emits = defineEmits(["itemClick"])
const itemClick = (index) => {
  // 传递定义的emits 以及参数
  emits("itemClick",index)
  currentIndex.value = index
}

function setCurrentIndex(index) {
  currentIndex.value = index
}

// 设置的方法让父组件调用
defineExpose({
  setCurrentIndex
})
</script>


<template>
  <div class="tabcontrol">
    <template v-for="(item, index) in titles">
      <div class="item">
        <span 
        :class="{active : currentIndex === index}"
        @click="itemClick(index)"
        >
        {{ item }}
      </span>
      </div>
    </template>
  </div>
</template>


<style lang="less" scoped>
.tabcontrol{
  display: flex;
  text-align: center;
  background-color: #fff;
  .item{
    flex: 1;
    height: 44px;
    line-height: 44px;
  }
  .active {
    color: var(--primary-color);
    font-weight: 700;
    border-bottom: 3px solid var(--primary-color);
    padding: 8px;
  }
}
</style>