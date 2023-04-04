// 导入网络请求类
import hyRequest from '../request'

// 获取城市热门区域
export function getHomeHotSuggests() {
  return hyRequest.get({
    url: "/home/hotSuggests"
  })
}