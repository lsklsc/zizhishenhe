import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
const page = name => () => import('@/pages/' + name)
const view = name => () => import('@/views/' + name)

export default new Router({
  routes: [{
      path: "/",
      redirect: '/login'
    },

    {
      path: '/login',
      name: 'login',
      component: page('login')
    },
    {
      path: '/main',
      name: 'main',
      component: view('main'),
      children: [{
          path: "/",
          redirect: '/gongzuotai/gongzuo'
        },
        {
          path: '/gongzuotai/gongzuo',
          name: 'gongzuo',
          component: view('gongzuotai/gongzuo'),
        },
        {
          path: '/cheliang/che',
          name: 'che',
          component: view('cheliang/che'),
        },
        {
          path: '/renyuan/renyuan',
          name: 'renyuan',
          component: view('renyuan/renyuan'),
        },
        {
          path: '/zizhi/zizhi',
          name: 'zizhi',
          component: view('zizhi/zizhi'),
        },
        {
          path: '/hetong/hetong',
          name: 'hetong',
          component: view('hetong/hetong'),
        },
        {
          path: '/dianzi/dianzi',
          name: 'dianzi',
          component: view('dianzi/dianzi'),
        },
        {
          path: '/caozuo/caozuo',
          name: 'caozuo',
          component: view('caozuo/caozuo'),
        },
        {
          path: '/zhanghu/zhanghu',
          name: 'zhanghu',
          component: view('zhanghu/zhanghu'),
        },
        {
          path: '/zhanghu/juese',
          name: 'juese',
          component: view('zhanghu/juese'),
        },
      ]
    },
    {
      path: '/gongsi/gongsi',
      name: 'gongsi',
      component: view('gongsi/gongsi'),
    },
    {
      path: '/applyAccount/applyAccount',
      name: 'applyAccount',
      component: view('applyAccount/applyAccount'),
    },
    
  ]
})
