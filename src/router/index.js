import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */
/**
 *注意：子菜单仅在路由children.length> = 1时出现
 *详细信息请参见：https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 *隐藏：如果设置为true，则为true，则项目不会显示在边栏中（默认为false）
 * alwaysShow：如果设置为true，则将始终显示根菜单
 *            如果未设置alwaysShow，则当项具有多个子路线时，
 *            它将变为嵌套模式，否则不显示根菜单
 * redirect：noRedirect如果设置了noRedirect将不会在面包屑中重定向
 *名称：“ router-name”（路由器名称），该名称由<keep-alive>使用（必须设置！！！）
 * meta：{
    角色：['admin'，'editor']控制页面角色（您可以设置多个角色）
    title：“ title”名称显示在侧边栏和面包屑中（推荐设置）
    图标：'svg-name'/'el-icon-x'图标显示在侧栏中
    面包屑：如果设置为false，则该项将隐藏在面包屑中（默认值为true）
    activeMenu：如果设置了路径，则为“ / example / list”，边栏将突出显示您设置的路径
  }
 */
/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [{
  path: '/login',
  component: () => import('@/views/login/index'),
  hidden: true
},
{
  path: '/404',
  component: () => import('@/views/404'),
  hidden: true
}, {
  path: '/408',
  component: () => import('@/views/408'),
  hidden: true
},
{
  path: '/',
  component: Layout,
  redirect: '/index',
  children: [{
    path: 'index',
    name: 'Dashboard',
    component: () => import('@/views/dashboard/index'),
    meta: {
      title: '主页',
      icon: 'dashboard',
      affix: true
    }
  }]
}, {
  path: '/bed-management',
  component: Layout,
  name: '床位管理',
  redirect: '/bed-management/bed-plan',
  meta: {
    title: '床位管理',
    icon: 'el-icon-notebook-2'
  },
  children: [{
    path: 'bed-plan',
    name: 'BedPlan',
    component: () => import('@/views/bed_management/BedPlan'),
    meta: {
      title: '床位示意图',
      icon: 'dashboard'
    }
  }, {
    path: 'bed-management',
    name: 'BedManagement',
    component: () => import('@/views/bed_management/BedManagement'),
    meta: {
      title: '床位管理',
      icon: 'dashboard'
    }
  }]
},
{
  path: '/customer_management',
  component: Layout,
  name: '客户管理',
  redirect: '/customer_management/registration',
  meta: {
    title: '客户管理',
    icon: 'el-icon-notebook-2'
  },
  children: [{
    path: 'registration',
    name: 'Registration',
    component: () => import('@/views/customer_management/Registration'),
    meta: {
      title: '入住登记',
      icon: 'dashboard'
    }
  }, {
    path: 'customer-info',
    name: 'CustomerInfo',
    component: () => import('@/views/customer_management/CustomerInfo'),
    meta: {
      title: '客户信息',
      icon: 'dashboard'
    }
  }, {
    path: 'unregistration',
    name: 'unRegistration',
    component: () => import('@/views/customer_management/unRegistration'),
    meta: {
      title: '退住登记',
      icon: 'dashboard'
    }
  }, {
    path: 'out-registration',
    name: 'OutRegistration',
    component: () => import('@/views/customer_management/OutRegistration'),
    meta: {
      title: '外出登记',
      icon: 'dashboard'
    }
  }]
}, {
  path: '/diet-management',
  component: Layout,
  name: '膳食管理',
  redirect: 'diet_management/basic-data-maintenance',
  meta: {
    title: '膳食管理',
    icon: 'el-icon-notebook-2'
  },
  children: [{
    path: 'diet-calendar',
    name: 'DietCalendar',
    component: () => import('@/views/diet_management/DietCalendar'),
    meta: {
      title: '膳食日历',
      icon: 'dashboard'
    }
  }, {
    path: 'diet-management',
    name: 'DietManagement',
    component: () => import('@/views/diet_management/DietManagement'),
    meta: {
      title: '膳食管理',
      icon: 'dashboard'
    }
  }, {
    path: 'diet-statistics',
    name: 'DietStatistics',
    component: () => import('@/views/diet_management/DietStatistics'),
    meta: {
      title: '膳食统计',
      icon: 'dashboard'
    }
  }]
}, {
  path: '/system-setting',
  component: Layout,
  name: '系统信息',
  redirect: '/system_setting/basic-data-maintenance',
  meta: {
    title: '系统信息',
    icon: 'el-icon-notebook-2'
  },
  children: [{
    path: 'basic-data-maintenance',
    name: 'BasicDataMaintenance',
    component: () => import('@/views/system_setting/BasicDataMaintenance'),
    meta: {
      title: '基本数据维护',
      icon: 'dashboard'
    }
  }, {
    path: 'staff-management',
    name: 'StaffManagement',
    component: () => import('@/views/system_setting/StaffManagement'),
    meta: {
      title: '工作人员管理',
      icon: 'dashboard'
    }
  }, {
    path: 'dailylife-care-program',
    name: 'DailyLifeCareProgram',
    component: () => import('@/views/system_setting/DailyLifeCareProgram'),
    meta: {
      title: '日常生活照料方案',
      icon: 'dashboard'
    }
  }]
},
{
  path: 'Hwwwww',
  component: Layout,
  children: [{
    path: '',
    meta: {
      title: 'Hwwwww',
      icon: 'link'
    }
  }]
},

// 404 page must be placed at the end !!!
{
  path: '*',
  redirect: '/404',
  hidden: true
}
]

const createRouter = () => new Router({
  mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
