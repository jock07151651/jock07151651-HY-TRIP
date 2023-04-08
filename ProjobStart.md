# HY-TRIP(旅途)

## 其他

```shell
安装cms后台管理系统
npm imstall 失败
因为element-plus:1.0xxx 依赖的是 vue3.1.x版本
需要npm install --force 强制安装
系统打开有报错的话,清除一下token
```



## 1.create Project

```shell
npm init vue@latest
选 y
new fileName HY-TRIP
回车
一直选no
```

## 2.项目配置

```shell
配置项目的favicon
配置项目的标题
	1.index.html页面
	2.通过调用document.title
添加配置jsconfig.json
```

## 3.create项目目录

```shell
assets	存放静态资源(css/图片)
components	(公共的组件化文件)
hooks		(封装的组件化函数)
mock		(自定义的虚拟数据)
router		(视图路由)
service		(网络请求)
store		(状态管理库)
utils		(封装的工具类)
views		(显示视图)
```

## 4.对默认CSS样式重置

```shell
normalize.css github拉取
reset.css
	在css中create index.css
		里面@import()引入公共css,然后index.css在
```

## 5.创建视图

```shell
views/home/home.vue ....
```





## 6.配置router

```shell
npm install vue-router
router/index.js
引入createRouter,createWebHashHistory
定义一个 变量对应 createRouter({
	history:  ,
	routes : [
	{},
	{},
	]
})
```

## 7.使用router

```shell
main.js中use  router

app.vue
	添加点击路由
		<router-link>
	对点击的页面占位
		<router-view>
```

## 8.配置store

```shell
store/index.js
	里面引入createPinia
	创建一个pinia对象,导出
在main中use一个pinia
	
store/modules/xxxx
```

## 9.开发tabbar

```shell
创建分离组件 components/tab-bar/tab-bar.vue
home.vue
	import tabBar ../components/tab-bar/tab-bar.vue
	<tab-bar>
app.vue
	import Home from './views/home'
	<home>
用less写样式,需要npm install less-loader
```

### 9.1.分离tabbar

```shell
将tabbar的数据,用一个数组存放对应的对象 const tabbarData = [{文字,图片,active图片,path},{}]
放入到assets/data/tabbar.js中
需要使用便导出
```

### 9.2给item添加点击事件

```shell
1.给tabbar的item添加点击事件,currentIndex 对应 index 添加active样式
2.判断currentindex == index 显示高亮图片
3.点击事件传入(index,item),调用router.push(),跳转路由

```

### 9.3认识vantUI

```shell
npm install vant
安装插件
npm i unplugin-vue-components -D
配置插件到vite.config.js
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers';
Components({
      resolvers: [VantResolver()],
    }),
就不需要用某一个标签就import一个文件
```

### 9.4使用vantUI

```shell
1.直接使用vantui的标签
标签内部有用插槽
	注册插槽的文件:navbar.vue
		<div class="left">
        <slot name="left">左边</slot>
    </div>
	使用插槽的文件:app.vue
		<template #left>
      <!-- 给插槽填入按钮 -->
			把需要修改的内容放入插槽内,就会在注册插槽的slot绑定button
      <button>{{ leftText }}</button>
    </template>

2.修改样式
	找到定义的变量,放入到需要修改的类下,是局部修改
	:deep(vant的类),不能直接在自定义类里面写入,因为每一个都是scoped独立的作用域
```

## 10.开发home

### 10.1.开发home>navbar

```
在home中添加标题,navbar导航条
可以将每一部分作为一个组件,封装出去
在创建home/cpns/home-nav-bar
把对应的navbar内容抽到里面去
直接在home中 import ./cpns/home-nav-bar
<home-nav-bar>
```

### 10.2.初始化git

```shell
在HY-TRIP
git init
git add .
git commit "项目第一天"
git remote add origin 你新建的远程仓库 (本地连接远程仓库)
git pull --rebase origin master (如果远程仓库不为空,需要做这一步)
git push -u origin master 本地推到远程
遇到错误,把本地的分支名改的跟远程一样
git branch -m oldName newName

它会帮我们做一次初始提交。于是我们的仓库就有了README.m和.gitignore文件，然后我们把本地项目关联到这个仓库，并把项目推送到仓库时，我们在关联本地与远程时，两端都是有内容的，但是这两份内容并没有联系
对于error: failed to push some refsto‘远程仓库地址’
git pull --rebase origin main

出现 Author identity unknown
在git命令行中重新输入命令：
先输入：$ git config --global user.name “你的名字”
回车后，
再输入：$ git config --global user.email “你的邮箱地址”



```

### 10.3.开发所在位置

```shell
home中开发,所在位置
1.在创建home/cpns/home-search-box
    调用doc中的,获取经纬度api
    将所在位置,搜索放进去
    import 到 home里面
2.所在位置添加city跳转路由,跳转到city页面
	创建view/city/city
3.city页面隐藏tabbar
	3.1在city路由传递 math对象下的值,app.vue显示的标签内调用router.math.xx
	3.2在city中设置css样式,盖住tabbar
	3.3盖住tabbar样式,多个页面可能需要,可以封装成一个类,按需添加类即可
```

## 11 开发city页面

### 11.1city添加搜索城市

```shell
在vantUI中加入search搜索框
如果需要修改search,可以找对应的api
如果api没有想要的修改内容,
则可以找主题定制,样式变量
如给到的 --van-search-padding ...
需要局部修改 则是在对应的页面做:deep(--van-search-padding) {color:red}
全局的修改,则是在common.css的:root下 --van-search-padding : xx
```

### 10.5city添加tab标签

```shell
vanui找到对应的tab标签
想自定义属性,使用对应的api
```

### 11.2封装axios

```shell
在services中创建
	modules (不同页面的网络请求方法)
		home.js
		city.js.....
	request
		config.js
		index.js
	index.js
1.config.js是对baseURL等做配置
2.request/index.js对axios做二次封装,到时候需要换别的网络请求库,直接修改一个文件即可
3.在modules/下请求axios获取数据,home.vue直接调用请求好的方法
4.services/index.js, 引入集合modules所有
```

### 11.3 找到对象下对象的数据

```shell
如何切换两个标签展示不同的数据
city['国内'],city['国外']
在vantUI标签,通过:name来控制变化的值,是数字,还是对应的key
xx.val[xx.val],多个值嵌套获取,可以通过computed可计算值来响应式
```

### 11.4 分组显示开头字母的city

```shell
1.给分组显示数据,封装到city/cnps/city-group
	使用vantUI的索引标签
2.给tab下面,添加一个热门城市
3.右边的索引其实是一个顺序的展示,是有点问题的,这个索引也是vantui的一个属性控制
	我们把group组的每一个字母映射成一个数组即可,使用map映射成一个新数组,在新数组
	再unshift一个# 在前面,来对应热门城市
```

### 11.5 点击城市,回退到首页显示

```shell
1.在city的pinia里面设置一个空对象
2.在索引里点击任意的城市,给赋值到pinia的那个空对象中
3.在home中的所在位置中渲染出来
```

## 12.开发home

### 12.1 渲染home中的入住时间

```shell
1.编写css样式
npm install dayjs
使用dayjs方法,格式化时间
2.在日期添加vantui的日历组件
3.设置开始时间-结束时间,有多少晚
4.设置价格,关键字html
5.在home中访问网络请求该城市热门区域,传给子组件,子组件通过defineProps获取遍历
6.封装城市热门区域,在service/modules/home访问热门区域api,在service/index导出
	pinia中的action中直接调用service/index导出的home方法
	渲染的页面就使用action的方法即可
	如action使用service/index导出的方法->service/modules/home使用request封装的axios
```

### 12.2搜索按钮和点击跳转搜索

```shell
1.给home搜索按钮设置样式,会顶上热门区域,给热门区域一个高度auto
2.
3.geisearch设置点击事件,跳转到search页面,可以携带参数 query...
4.在search路由传递 math对象下的值,调用router.math.xx,隐藏tabbar
5.获取民宿分类网络请求,由homeStore.actions请求
6.home/home-categoryes定义组件,给分类设置样式 
```

### 12.3 home下的列表展示

```shell
1.新建home-content页面,下访问网络房屋列表api
2.在actions方法中,给定义的空数组,push ...res.data解构数组进去
3.渲染到home-content页面,添加下拉加载事件,重复调用网络房屋列表api
4.递增可以在store定义一个页码,每调用一次,页码++
```

### 12.4 house-item,房间列表封装到components中

```shell
1.新建house-item-v3/house-item-v3页面,通过defineProps
2.新建house-item-v9/house-item-v9页面,通过defineProps
3.在里面渲染数据,编写html结构
```

### 12.5 home中的列表监听滚动

```shell
有window和元素内部的 滚动
将业务代码,抽取到hooks中
在hooke定义一个变量,提示如果到达底部,返回true
给多调用的方法添加防抖 npm install underscore
使用watch监听
```

### 12.6 components/search-bar

```shell
设置滚到一定px,显示在顶部
通过获取scrollTop,计算属性(()=>{})
```

## 13.设置网络请求显示加载画面

### 13.1是全局的,放在appvue

```shell
1.全局,就封装在components里面
2.在app.vue渲染
3.弄成一个全屏的元素,在进行网络请求时才出现
4.将loading的控制变量,定义在mianStore
5.怎么做,才能控制全局的请求让loading,出现或者消失
6.直接在request封装上设置loading的值,但这样会显得request很怪异
7.要让请求的方法,只做请求.所以可以在实例前,设置请求响应拦截
8.在请求前loading为true,在响应前设置为false.就能控制全局的request,response

```

## 13.2搭建详情页

```shell
1.新建视图,detail/detail
2.路由携带id,/xx/:id
3.item绑定点击事件,传递houseId到detail
4.template显示$route.params.id
5.script显示:import useRouter, 定义的变量.params.id
6.在详情页顶部编写vantUI导航栏,回退上一步
```

### 13.3详情页获取id请求

```shell
1.添加services/detail
2.在detail.vue保存请求数据,先不通过detailStore
3.如果该请求返回的data太多,使用computed计算属性,返回需要的data
4.编写轮播图组件,在详情页传递数据渲染
5.自定义插槽,改变指示器.对元素做定位.摆到右下角位置
6.将不同类别的图片,分别存放到定义对象里的数组中去,遍历出来,做成轮播图不同的类别
7.处理不同类别如,卧室,卫生间,其他.如何轮播到选中.以及图片顺序的播放
```

### 13.4渲染detail内容

```shell
1.有一些html结构相同,可以定义插槽,新建在components/detail-section
2.新建detail/cpns/detail_xxx.vue
3.定义一个放插槽的页面,第二个页面引入插槽的内容,第三放入到detail.vue
```

### 13.5引入百度地图

```shell
在index.html入口文件
1.填入script地图的地址
2.创建一个存放地图的div
3.new一个map类,传入doc,
4.new一个经纬度类,传入经纬度数据
5.new一个marker类,加一个大头针定位
```

### 13.6 新建顶部固定tab

```shell
在components/tab-control
这个detail是在元素里面滚动的,不同于之前的在window滚动
所以需要区分window和元素.
监听top的px,>300 现形
在detail.vue渲染
```



