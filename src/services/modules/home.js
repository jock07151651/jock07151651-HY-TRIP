// 导入网络请求类
import hyRequest from '../request'

// 获取城市热门区域
export function getHomeHotSuggests() {
  return hyRequest.get({
    url: "/home/hotSuggests"
  })
}

// 获取房屋分类
export function getHomeCategories() {
  return hyRequest.get({
    url: "/home/categories"
  })
}

// 获取房屋列表,参数 页码
export function getHomeHouselist(currentPage) {
  return hyRequest.get({
    url: "/home/houselist",
    params: {
      page : currentPage
    }
  })
}