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
    link: '/dashboard/sdq/input',
    children: [
      {
        name: '个人录入',
        link: '/dashboard/sdq/input/personal',
        icon: 'fa-circle-o'
      },
      {
        name: '机构录入',
        link: '/dashboard/sdq/input/institution',
        icon: 'fa-circle-o'
      },
      {
        name: '高级录入',
        link: '/dashboard/sdq/input/advanced',
        icon: 'fa-circle-o'
      }
    ]
  },
  {
    name: '水电气审核',
    icon: 'fa-check',
    link: '/dashboard/sdq/check',
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
    link: '/dashboard/sdq/manage',
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
      },
      {
        name: '高级管理',
        link: '/dashboard/sdq/manage/advanced',
        icon: 'fa-circle-o'
      }
    ]
  },
  {
    name: '打印',
    icon: 'fa-print',
    link: '/dashboard/print',
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
    link: '/dashboard/stat',
    children: [
      {
        name: '个人统计',
        link: '/dashboard/stat/personal',
        icon: 'fa-circle-o'
      },
      {
        name: '机构统计',
        link: '/dashboard/stat/institution',
        icon: 'fa-circle-o'
      },
      {
        name: '节点统计',
        link: '/dashboard/stat/node',
        icon: 'fa-circle-o'
      }
    ]
  },
  {
    name: '系统',
    icon: 'fa-cogs',
    link: '/dashboard/system',
    children: [
      {
        name: '管理员管理',
        link: '/dashboard/system/admin',
        icon: 'fa-circle-o'
      },
      {
        name: '数据管理',
        link: '/dashboard/system/data',
        icon: 'fa-circle-o'
      }
    ]
  },
  {
    name: '门户管理',
    icon: 'fa-desktop',
    link: '/dashboard/home',
    children: [
      {
        name: '轮播图管理',
        link: '/dashboard/home/banner',
        icon: 'fa-circle-o'
      },
      {
        name: '文章管理',
        link: '/dashboard/home/article',
        icon: 'fa-circle-o'
      },
      {
        name: '风采管理',
        link: '/dashboard/home/picture',
        icon: 'fa-circle-o'
      },
      {
        name: '机构简介管理',
        link: '/dashboard/home/intro',
        icon: 'fa-circle-o'
      },
      {
        name: '意见建议管理',
        link: '/dashboard/home/suggestion',
        icon: 'fa-circle-o'
      }
    ]
  }
]
