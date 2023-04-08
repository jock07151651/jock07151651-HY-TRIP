<script setup>

// 接收prop数据
const props = defineProps({
  swipeData : {
    type : Array,
    default : () => []
  }
})
// 给swipeData不同类型的图片分组

const swipeGroup = {}
for(const item of props.swipeData) {
  // 将swipeGroup[item.enumPictureCategory]的值赋值给valueArray
  let valueArray = swipeGroup[item.enumPictureCategory]
  // 判断valueArray是否有值
  if (!valueArray) {
    // 没有便定义成一个空数组
    valueArray = []
    // 将空数组,赋值给swipeGroup[item.enumPictureCategory]
    // 如 {1 : []}
    swipeGroup[item.enumPictureCategory] = valueArray
  }
  // {1:[push进去值]}
  valueArray.push(item)
}
// console.log(swipeGroup)
// for(const item of props.swipeData) {
//   // 创建不同类型的数组,相同的会重叠
//   // 分成 s[1],s[2],s[4] 三个数组
//   swipeGroup[item.enumPictureCategory] = []
// }
// for(const item of props.swipeData) {
//   // const valueArray = swipeGroup[item.enumPictureCategory]
//   // valueArray.push(item)
//   // s[1].push,s[2].push .... 给不同的数组push值进去
//   swipeGroup[item.enumPictureCategory].push(item)
// }

// 使用正则去除符号
// const names = '【卫生室】'
// getName(names)
const nameReg = /【(.*?)】/i
const getName = (name) => {
  const result = nameReg.exec(name)
  // console.log(result)
  return result[1]
}
// console.log(props.swipeData)

// 获取当前的索引
const getCategoryIndex = (item) => {
 const valueArray = swipeGroup[item.enumPictureCategory]
 // 查询当前的索引
 return valueArray.findIndex(data => data === item) + 1
}
</script>


<template>
  <div class="detail-swipe">
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <template v-for="(item, index) in swipeData" :key="index">
        <van-swipe-item>
          <img :src="item.url" alt="">
        </van-swipe-item>
      </template>
      <template #indicator="{ active, total }">
        <div class="custom-indicator">
          <template v-for="(item,key,index) in swipeGroup" :key="key">
            <span class="item"
                  :class="{active : swipeData[active]?.enumPictureCategory == key}"
            >
              <span class="text">{{getName(item[0].title)}}</span>
              <span class="count" 
              v-if="swipeData[active]?.enumPictureCategory == key">
                <!-- 从swipeData[0]开始 / 获取当前数组的总长度-->
                {{ getCategoryIndex(swipeData[active]) }}/{{ item.length }}
              </span>
            </span>
          </template>
        </div>
      </template>
    </van-swipe>
  </div>
</template>


<style lang="less" scoped>
.detail-swipe{
  .my-swipe{
    position: relative;
    height: 300px;
    img {
      width: 100%;
    }
    .custom-indicator {
      position: absolute;
      z-index: 99;
      right: 5px;
      bottom: 5px;
      padding: 2px 5px;
      font-size: 12px;
      color: #fff;
      background: rgba(0, 0, 0, 0.8);
      .item {
        padding: 0 5px;
        margin: 0 0;
        border-radius: 5px;
      }
      .active {
        background-color: #fff;
        color: #333;
      }
    }
  }
  
}
</style>