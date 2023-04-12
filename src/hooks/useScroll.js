import { throttle } from "underscore";
import { ref } from "vue";
import { onMounted, onUnmounted } from 'vue';

// elRef 传入的监听元素
export default function useScroll(elRef) {
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
  // const isReachBottom = ref(false)
  // const clientHeight = ref(0)
  // const scrollTop = ref(0)
  // const scrollHeight = ref(0)
  
  // // 防抖节流
  // const scrollListenerHandler = throttle(() => {
  //   // 获取当前客户端的高度
  //   clientHeight.value = document.documentElement.clientHeight
  //   // 获取当前离Top的高度
  //   scrollTop.value = document.documentElement.scrollTop
  //   // 总共滑动了多少
  //   scrollHeight.value = document.documentElement.scrollHeight
  //   // 如果离top的px + 当前视窗的px >= 总滑动的px,则认为是到底了
  //   if(clientHeight.value + scrollTop.value >= scrollHeight.value) {
  //     console.log("滚动到底部了")
  //     isReachBottom.value = true
  //   }
  // },300)

  // v4 获取在div元素中滚动的px
  // 默认的element是 window
  
  let el = window
  const isReachBottom = ref(false)
  const clientHeight = ref(0)
  const scrollTop = ref(0)
  const scrollHeight = ref(0)

  // 防抖/节流
  const scrollListenerHandler = throttle(() => {
    if (el === window) {
      clientHeight.value = document.documentElement.clientHeight
      scrollTop.value = document.documentElement.scrollTo
      scrollHeight.value = document.documentElement.scrollHeight
      // 否者是获取该元素内滚动的px
    } else {
      clientHeight.value = el.clientHeight
      scrollTop.value = el.scrollTop
      scrollHeight.value = el.scrollHeight

    }
    if (clientHeight.value + scrollTop.value >= scrollHeight.value) {
      console.log("滚动到底部了")
      isReachBottom.value = true
    }
  },300)

  //v2 当html挂载时,自动执行
  onMounted(() => {
    // 如果传入elRef,el就登录当前传入的元素doc
    if (elRef) el = elRef.value
    // el.addEventListener监听的是元素的滚动
    el.addEventListener("scroll",scrollListenerHandler)
  })
  //v2 当html销毁时,自动执行
  onUnmounted(() => {
    el.removeEventListener("scroll",scrollListenerHandler)
  })
  return {isReachBottom, clientHeight, scrollTop, scrollHeight}
}