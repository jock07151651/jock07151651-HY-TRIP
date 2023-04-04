import { defineStore } from "pinia";
import {getHomeHotSuggests} from "@/services"

// 引入pinia创建对象
const useHomeStore = defineStore("home",{
  state :() => ({
    hotSuggests: [],
    categories: []
  }),

  actions : {
    async getHomeHotSuggestsAction() {
      const res = await getHomeHotSuggests()
      this.hotSuggests = res.data
    }
  }
})

export default useHomeStore