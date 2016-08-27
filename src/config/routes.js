/**
 * Created by Cheney Yang <yangcheng0816@gmail.com> on 16/5/31.
 */
import NotFound from '../components/NotFound.vue'
import Dashboard from '../components/Dashboard.vue'
import Login from '../components/Login.vue'
import Index from '../Index.vue'
import InputPersonal from '../components/pages/input/Personal.vue'
import InputInstitution from '../components/pages/input/Institution.vue'
import InputAdvanced from '../components/pages/input/Advanced.vue'
import CheckPending from '../components/pages/check/Pending.vue'
import CheckList from '../components/pages/check/List.vue'
import CheckHistory from '../components/pages/check/History.vue'
import ManagePersonal from '../components/pages/manage/Personal.vue'
import ManageInstitution from '../components/pages/manage/Institution.vue'
import ManageAdvanced from '../components/pages/manage/Advanced.vue'
import PrintPayment from '../components/pages/print/Payment.vue'
import PrintReport from '../components/pages/print/Report.vue'
import PrintTemp from '../components/pages/print/Temp.vue'
import StatisticsMonth from '../components/pages/statistics/Month.vue'
import StatisticsAll from '../components/pages/statistics/All.vue'
import SystemAdmin from '../components/pages/system/Admin.vue'
import SystemData from '../components/pages/system/Data.vue'
import HomeArticle from '../components/pages/home/Article.vue'
import HomeBanner from '../components/pages/home/Banner.vue'
import HomePicture from '../components/pages/home/Picture.vue'
import HomePictureManage from '../components/pages/home/PictureManage.vue'
import HomeArticleManage from '../components/pages/home/ArticleManage.vue'
import HomeIntroManage from '../components/pages/home/IntroManage.vue'
import Core from '../core/core'

export function configRouter (router) {
  // normal routes
  router.map({
    // not found handler
    '*': {
      component: NotFound
    },
    '/dashboard/login': {
      component: Login
    },
    '/dashboard': {
      component: Index,
      subRoutes: {
        '/index': {
          component: Dashboard
        },
        '/sdq/input/personal': {
          component: InputPersonal
        },
        '/sdq/input/institution': {
          component: InputInstitution
        },
        '/sdq/input/advanced': {
          component: InputAdvanced
        },
        '/sdq/check/pending': {
          component: CheckPending
        },
        '/sdq/check/list': {
          component: CheckList
        },
        '/sdq/check/history': {
          component: CheckHistory
        },
        '/sdq/manage/personal': {
          component: ManagePersonal
        },
        '/sdq/manage/institution': {
          component: ManageInstitution
        },
        '/sdq/manage/advanced': {
          component: ManageAdvanced
        },
        '/print/payment': {
          component: PrintPayment
        },
        '/print/report': {
          component: PrintReport
        },
        '/print/temp': {
          component: PrintTemp
        },
        '/stat/month': {
          component: StatisticsMonth
        },
        '/stat/all': {
          component: StatisticsAll
        },
        '/system/admin': {
          component: SystemAdmin
        },
        '/system/data': {
          component: SystemData
        },
        '/home/article': {
          component: HomeArticle
        },
        '/home/banner': {
          component: HomeBanner
        },
        '/home/picture': {
          component: HomePicture
        },
        '/home/manage-picture': {
          component: HomePictureManage
        },
        '/home/manage-article': {
          component: HomeArticleManage
        },
        '/home/manage-intro': {
          component: HomeIntroManage
        },
        '*': {
          component: NotFound
        }
      }
    }
  })

  router.redirect({
    '/': '/dashboard/index'
  })

  router.beforeEach(function (transition) {
    if (Core.Data.isGuest() && Core.Config.ROUTE_LIST_GUEST_CAN_VISIT.indexOf(transition.to.path) === -1) {
      transition.abort()
      router.go('/dashboard/login')
    } else if (transition.to.path === '/logout') {
      transition.abort()
      Core.Data.clear()
      setTimeout(function () {
        router.go('/dashboard/login')
      }, 500)
    } else {
      transition.next()
    }
  })
}
