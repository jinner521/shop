import Vue from 'vue'
import Router from 'vue-router'
// 调用仓库
import Store from '../store'
console.log(Store,"1111111");
// 封装一个函数用来判断是否有权限进来
//Store.getters.getUserInfo.menus_url 登录之后有权限的数组集合
function hasUrl(url){
  return Store.getters.getUserInfo.menus_url.some(item=>item==url)
}
Vue.use(Router)
// 设定二级路由配置项 
export const indexRoutes = [
  {
    path: '/menu',
    component: () => import('@/views/menu/menu'),
    name: '菜单管理',
    beforeEnter: (to, from, next) => {
      hasUrl('/menu') ? next() :next('/home')
    }
  },
  {
    path: '/role',
    component: () => import('@/views/role/role'),
    name: '角色管理',
    beforeEnter: (to, from, next) => {
      hasUrl('/role') ? next() :next('/home')
    }
  },
  {
    path: '/manger',
    component: () => import('@/views/manager/manager'),
    name: '管理员管理',
    beforeEnter: (to, from, next) => {
      hasUrl('/manger') ? next() :next('/home')
    }
  },
  {
    path: '/sort',
    component: () => import('@/views/sort/sort'),
    name: '商品分类',
    beforeEnter: (to, from, next) => {
      hasUrl('/sort') ? next() :next('/home')
    }
  },
  {
    path: '/goods',
    component: () => import('@/views/goods/goods'),
    name: '商品管理',
    beforeEnter: (to, from, next) => {
      hasUrl('/goods') ? next() :next('/home')
    }
  },
  {
    path: '/specs',
    component: () => import('@/views/specs/specs'),
    name: '商品规格',
    beforeEnter: (to, from, next) => {
      hasUrl('/specs') ? next() :next('/home')
    }
  },
  {
    path: '/banner',
    component: () => import('@/views/banner/banner'),
    name: '轮播图管理',
    beforeEnter: (to, from, next) => {
      hasUrl('/banner') ? next() :next('/home')
    }
  },
  {
    path: '/seck',
    component: () => import('@/views/seck/seck'),
    name: '秒杀管理',
    beforeEnter: (to, from, next) => {
      hasUrl('/seck') ? next() :next('/home')
    }
  },
  {
    path: '/member',
    component: () => import('@/views/member/member'),
    name: '会员管理',
    beforeEnter: (to, from, next) => {
      hasUrl('/member') ? next() :next('/home')
    }
  },
]
const router = new Router({
  routes: [
    {
      path: '/login',
      component: () => import('@/pages/login')
    },
    {
      path: '/index',
      component: () => import('@/pages/index'),
      children: [
        {
          path: '/home',
          component: () => import('@/views/home')
        },

        ...indexRoutes,

        {
          path: '',
          redirect: '/home'
        }
      ]
    },
    {
      path: '*',
      redirect: '/login'
    }
  ]
})
//全局导航守卫之登录拦截
router.beforeEach((to,from,next)=>{
  //如果你去的是登录就 next
  if(to.path=='/login'){
    next()  
    return
  }
  //如果你有登录状态就next
  if(Store.getters.getUserInfo){
    next()
    return
  }
  //都没有就强制跳转回登录页
  next('/login')
})

export default router
