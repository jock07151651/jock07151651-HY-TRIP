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
	3.1在city路由传递 math对象下的值,调用router.math.xx
	3.2在city中设置css样式,盖住tabbar
	3.3盖住tabbar样式,多个页面可能需要,可以封装成一个类,按需添加类即可
```

### 10.4city添加搜索城市

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

### 10.6封装axios

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

### 10.7 
