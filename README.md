## blog 前台展示
* 使用`create-react-app`初始化创建项目
* 感谢[@夜尽天明](https://github.com/biaochenxuying)提供的[前台展示](https://github.com/biaochenxuying/blog-react)UI模板支持
* 本项目使用`react+ts+antd`
### 一、项目准备
* 安装node环境，本项目`node版本v10.15.3`
* 安装依赖`npm install`
* 运行`npm start`
* `Node：`运行项目之前，需先启动[blog-koa项目](https://github.com/EthanMarket/blog-koa)

### 二、项目预览：
* 首页
	* ![](https://github.com/EthanMarket/blog-react/raw/master/images/home.png)
* 目录
	* ![](https://github.com/EthanMarket/blog-react/raw/master/images/directory.png)
* 项目
	*  ![](https://github.com/EthanMarket/blog-react/raw/master/images/project.png)
* 关于
	*  ![](https://github.com/EthanMarket/blog-react/raw/master/images/about.png)
* 详情
	* ![](https://github.com/EthanMarket/blog-react/raw/master/images/detail.png) 
### 二、主要功能：
####  1、`src/HomeRouters`目录
 *	[`HomeRouters.js`](https://github.com/EthanMarket/blog-react/blob/master/src/HomeRouters/index.tsx) //项目路由目录，整个项目的页面路由

-`SimpleCode：`

    const routerList: any[] = [
		  {
		    component: () => import('../pages/Home'),
		    path: '/'
		  },
		  {
		    component: () => import('../pages/Directory'),
		    path: '/directory'
		  },
		  {
		    component: () => import('../pages/Project'),
		    path: '/project'
		  },
		  {
		    component: () => import('../pages/About'),
		    path: '/about'
		  },
		  {
		    component: () => import('../pages/NotFound'),
		    path: '/notfound'
		  }
	]

