## blog 前台展示
* 使用`create-react-app`初始化创建项目
* 感谢[@夜尽天明](https://github.com/biaochenxuying)提供的[前台展示](https://github.com/biaochenxuying/blog-react)
### 一、项目准备
* 安装node环境，本项目`node版本v10.15.3`
* 安装依赖`npm install`
* 运行`npm start`
* `Node：`运行项目之前，需先启动[blog-koa项目](https://github.com/EthanMarket/blog-koa)
### 二、项目简介：
* 主要功能
	* React+TypeScript+Redux+antd
	* 支持markdown+代码高亮显示 
* 项目预览
	* ![](https://github.com/EthanMarket/blog-react/raw/master/images/web.gif)

### 二、主要功能：
####  1、主要依赖
      "dependencies": {
	    "@types/jest": "24.0.23",
	    "@types/node": "12.12.11",
	    "@types/react": "16.9.11",
	    "@types/react-custom-scrollbars": "^4.0.6",
	    "@types/react-dom": "16.9.4",
	    "antd": "^3.25.2",
	    "axios": "^0.19.0",
	    "highlight.js": "^9.17.1",
	    "marked": "^0.8.0",
	    "react": "^16.12.0",
	    "react-custom-scrollbars": "^4.2.1",
	    "react-dom": "^16.12.0",
	    "react-infinite-scroller": "^1.2.4",
	    "react-loadable": "^5.5.0",
	    "react-redux": "^7.1.3",
	    "react-router-dom": "^5.1.2",
	    "react-scripts": "3.2.0",
	    "redux": "^4.0.4",
	    "redux-devtools-extension": "^2.13.8",
	    "redux-thunk": "^2.3.0",
	    "store": "^2.0.12",
    	"typescript": "3.7.2"
  	}

####  2、`src/HomeRouters`目录
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

