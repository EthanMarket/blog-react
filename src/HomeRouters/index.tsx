import { Route, Redirect ,Switch} from 'react-router-dom'
import HeaderNav from '../components/HeaderNav'
import Loadable from 'react-loadable';
import loading from '../components/Loading'
import { Layout, BackTop } from 'antd';
import * as React from 'react';
import Info from '../components/Info'
import './index.less'
import ArticleDetail from '../pages/ArticleDetail'
const { Footer } = Layout;
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

export function HomeRouter(props: any) {
  const path = props.location.pathname.toString()
  const detail = path.search('articledetail') === -1
  return (
    <Layout className='app'>
      <HeaderNav />
      <Layout >
        <div >
          <div className='blog-container'>
          <Switch>
            <div className='blog-content'>
              {routerList.map(item => {
                const { path, component } = item
                return <Route
                  key={path}
                  exact={true}
                  path={path}
                  component={Loadable({
                    loader: component,
                    loading,
                    delay: 300,
                  })}
                />
              })}
              <Route
                key={'/articledetail'}
                exact={true}
                path={'/articledetail'}
                component={ArticleDetail}
              />
            </div>
            </Switch>
            {detail ? <div className='blog-info'>
              <Info />
            </div> : null}
          </div>
          <Footer style={{ textAlign: 'center', background: '#fff' }}>
            Copyright © Hi,Ethan 2019
        </Footer>
          <BackTop />
        </div>
      </Layout>
    </Layout>
  );
}

export default HomeRouter
