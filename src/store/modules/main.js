import { defineStore } from "pinia";

// 定义两个当前时间
// 当天
const startDate = new Date()
const endDate = new Date()
// 明天
endDate.setDate(startDate.getDate() + 1)

const useMainStore = defineStore("main",{
  state: () => ({
    token : "",
    startDate : startDate,
    endDate : endDate
  }),
  
})

export default useMainStore