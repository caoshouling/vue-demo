//import user from "routers/modules/user";
/*
  package.json


  main - main 字段指定了程序的主入口文件，require('moduleName') 就会加载这个文件。这个字段的默认值是模块根目录下面的 index.js

  resolve.mainFields 是针对第三方模块的导入
    当从 npm 包中导入模块时（例如，import * as D3 from "d3"），此选项将决定在 package.json 中使用哪个字段导入模块
    默认值：mainFields: ["browser", "module", "main"] 即：browser  > module  > main 
    本系统只配置了main 为index.js

  1. ：webpack的默认导入index.js 默认配置，如果想改可以修改默认配置：resolve.mainFiles: ["index"]
  2. 省略文件后缀的配置 默认是省略js和json后缀，即默认的配置为：extensions:['.js', '.json']，本项目这里加上了vue
  3. resolve.modules告诉webpack去哪些目录下寻找第三方模块，默认值为['node_modules']，会依次查找./node_modules、../node_modules、../../node_modules。
*/
import Vue from 'vue';
import layout from "layout";
import page1 from "layout/page1";
import page2 from "layout/page2";
import login from "layout/Login";
import page404 from "layout/components/404";
import VueRouter from 'vue-router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

Vue.use(VueRouter);


const  routers = [
  {
    path: "/login",
    component: login,
    hidden: true,
    
  },
  {
    path: "/main",
    component: layout,
    children: [
      {
        path: "/page1",
        name: 'page1',
        component: () => import('layout/page1')
      },
      {
        path: "/page2",
        name: 'page2',
        component: () => import('layout/page2')
      },
      {
        path: "/chinamap",
        name: 'chinamap',
        component: () => import('views/echarts/chinaMap')
      },
      {
        path: "/echarts",
        name: 'echarts',
        component: () => import('views/echarts/Analysis')
      },
      {
        path: "/vuebus",
        name: 'vuebus',
        component: () => import('views/vue-bus/index')
      },
      {
        path: "/vuex",
        name: 'vuex',
        component: () => import('views/vuex-demo/index')
      }
    ]
  },
  {
    path: "/",
    component: layout
  },
  {
    path: "/404",
    component: page404
  },
  // 匹配不到路由时，自动调转的页面。
  {
    path:"*",
    component : page404,
    //redirect: "/404"
  }
];
const router = new VueRouter({
  //history模式路径好看，但是刷新页面会404，但是需要服务端配合，比如nginx或者直接后端应用配合，这里用hash，hash的问题是地址丑陋
  mode: 'hash',
  routes : routers
});
router.beforeEach((to, from, next) => {
  NProgress.start();
  if (to.path == '/login') {
    sessionStorage.removeItem('user');
  }
  let user = JSON.parse(sessionStorage.getItem('user'));
  if (!user && to.path != '/login') {

    next({ path: '/login' })
  } else {
    next()
  }
});

router.afterEach(() => {
  NProgress.done();
});
//处理路由调转时报NavigationDuplicated错误
const routerPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}

export default router;