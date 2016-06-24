/**
 * Created by Cheney Yang <yangcheng0816@gmail.com> on 16/5/31.
 */
module.exports = [
  {
    name: '首页',
    link: '/dashboard/index',
    icon: 'fa-home'
  },
  {
    name: '水电气录入',
    icon: 'fa-pencil',
    children: [
      {
        name: '个人数据',
        link: '/dashboard/sdq/input/personal',
        icon: 'fa-circle-o'
      },
      {
        name: '机构数据',
        link: '/dashboard/sdq/input/institution',
        icon: 'fa-circle-o'
      }
    ]
  },
  {
    name: '水电气审核',
    icon: 'fa-check',
    children: [
      {
        name: '待审核',
        link: '/dashboard/sdq/check/pending',
        icon: 'fa-circle-o'
      },
      {
        name: '已审核',
        link: '/dashboard/sdq/check/list',
        icon: 'fa-circle-o'
      },
      {
        name: '审核历史',
        link: '/dashboard/sdq/check/history',
        icon: 'fa-circle-o'
      }
    ]
  },
  {
    name: '水电气管理',
    icon: 'fa-sitemap',
    children: [
      {
        name: '个人管理',
        link: '/dashboard/sdq/manage/personal',
        icon: 'fa-circle-o'
      },
      {
        name: '机构管理',
        link: '/dashboard/sdq/manage/institution',
        icon: 'fa-circle-o'
      }
    ]
  },
  {
    name: '打印',
    icon: 'fa-print',
    children: [
      {
        name: '报表',
        link: '/dashboard/print/report',
        icon: 'fa-circle-o'
      },
      {
        name: '缴费单',
        link: '/dashboard/print/payment',
        icon: 'fa-circle-o'
      },
      {
        name: '临时施工',
        link: '/dashboard/print/temp',
        icon: 'fa-circle-o'
      }
    ]
  },
  {
    name: '统计',
    icon: 'fa-pie-chart',
    children: [
      {
        name: '本月报表',
        link: '/dashboard/stat/month',
        icon: 'fa-circle-o'
      },
      {
        name: '全部',
        link: '/dashboard/stat/all',
        icon: 'fa-circle-o'
      }
    ]
  },
  {
    name: '系统',
    icon: 'fa-cogs',
    children: [
      {
        name: '管理员管理',
        link: '/dashboard/system/admin',
        icon: 'fa-circle-o'
      },
      {
        name: '水电气数据管理',
        link: '/dashboard/system/data',
        icon: 'fa-circle-o'
      }
    ]
  },
  {
    name: '门户管理',
    icon: 'fa-desktop',
    children: []
  }
]
