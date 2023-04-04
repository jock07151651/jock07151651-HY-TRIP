// 默认找到index.js的文件
import hyRequest from "../request"

export function getCityAll() {
  return hyRequest.get({
    url: "/city/all"
  })
}