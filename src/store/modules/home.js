import { defineStore } from "pinia";
import {getHomeHotSuggests,getHomeCategories,getHomeHouselist } from "@/services"

// 引入pinia创建对象
const useHomeStore = defineStore("home",{
  state :() => ({
    hotSuggests: [],
    categories: [],
    // 定义页码
    currentPage : 1,
    houseList : []
  }),

  actions : {
    async getHomeHotSuggestsAction() {
      const res = await getHomeHotSuggests()
      this.hotSuggests = res.data
    },
    async getHomeCategoriesAction() {
      const res = await getHomeCategories()
      this.categories = res.data
    },
    async getHomeHouselistAction() {
      const res = await getHomeHouselist(this.currentPage)
      // 如果不解构,就是二维数组
      this.houseList.push(...res.data)
      this.currentPage++
    }
  }
})

export default useHomeStore