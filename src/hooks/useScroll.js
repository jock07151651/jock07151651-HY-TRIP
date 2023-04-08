import { throttle } from "underscore";
import { ref } from "vue";
import { onMounted, onUnmounted } from 'vue';

export default function useScroll() {
  // // 监听页面滚动时 v1
  // window.addEventListener("scroll",() => {
  //   // 获取当前客户端的高度
  //   const clientHeight = document.documentElement.clientHeight
  //   // 获取当前离Top的高度
  //   const scrollTop = document.documentElement.scrollTop
  //   // 总共滑动了多少
  //   const scrollHeight = document.documentElement.scrollHeight
  //   // 如果离top的px + 当前视窗的px >= 总滑动的px,则认为是到底了
  //   if(clientHeight + scrollTop >= scrollHeight) {
  //     homeStore.getHomeHouselistAction()
  //   }
  // })
  
  // v2
  // const scrollListenerHandler = () => {
  //   // 获取当前客户端的高度
  //   const clientHeight = document.documentElement.clientHeight
  //   // 获取当前离Top的高度
  //   const scrollTop = document.documentElement.scrollTop
  //   // 总共滑动了多少
  //   const scrollHeight = document.documentElement.scrollHeight
  //   // 如果离top的px + 当前视窗的px >= 总滑动的px,则认为是到底了
  //   if(clientHeight + scrollTop >= scrollHeight) {
  //     homeStore.getHomeHouselistAction()
  //   }
  // } 

  // //v2 当html挂载时
  // onMounted(() => {
  //   window.addEventListener("scroll",scrollListenerHandler)
  // })
  // //v2 当html销毁时
  // onUnmounted(() => {
  //   window.addEventListener("scroll",scrollListenerHandler)
  // })

  // v3封装到hooks中 判断是否到底了
  const isReachBottom = ref(false)
  const clientHeight = ref(0)
  const scrollTop = ref(0)
  const scrollHeight = ref(0)
  
  // 防抖节流
  const scrollListenerHandler = throttle(() => {
    // 获取当前客户端的高度
    clientHeight.value = document.documentElement.clientHeight
    // 获取当前离Top的高度
    scrollTop.value = document.documentElement.scrollTop
    // 总共滑动了多少
    scrollHeight.value = document.documentElement.scrollHeight
    // 如果离top的px + 当前视窗的px >= 总滑动的px,则认为是到底了
    if(clientHeight.value + scrollTop.value >= scrollHeight.value) {
      console.log("滚动到底部了")
      isReachBottom.value = true
    }
  },300)

  //v2 当html挂载时,自动执行
  onMounted(() => {
    window.addEventListener("scroll",scrollListenerHandler)
  })
  //v2 当html销毁时,自动执行
  onUnmounted(() => {
    window.removeEventListener("scroll",scrollListenerHandler)
  })
  return {isReachBottom, clientHeight, scrollTop, scrollHeight}
}