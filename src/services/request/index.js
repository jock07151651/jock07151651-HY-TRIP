import axios from 'axios'
// 引入配置文件
import {BASE_URL,TIMEOUT} from './config'
import useMainStore from '@/store/modules/main';

const mainStore = useMainStore()

// 创建一个类
class HYRequest {
  // 设置一个构造函数,new自动定义
  constructor(baseURL, timeout=10000) {
    // 将axios.create的对象创建 赋值给当前类的实例
    this.instance = axios.create({
      baseURL,
      timeout
    })
    this.instance.interceptors.request.use(config => {
      // 在请求前loading为true
      mainStore.isLoading = true
      return config
    },err => {
      return err
    })
    this.instance.interceptors.response.use(config => {
      // 在响应前设置为false
      mainStore.isLoading = false
      return config
    },err => {
      mainStore.isLoading = false
      return err
    })
  }

  // 传入的是一个对象参数
  request(config) {
    return new Promise((resolve, reject) => {
      this.instance.request(config).then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err)
      })
    })
  }

  get(config) {
    return this.request({...config, method:"get"})
  }

  post(config) {
    return this.request({...config, method:"post"})
  }
}

export default new HYRequest(BASE_URL, TIMEOUT)