/**
 * Created by Cheney Yang <yangcheng0816@gmail.com> on 16/5/31.
 */
import NotFound from '../components/NotFound.vue'
import Dashboard from '../components/Dashboard.vue'
import Login from '../components/Login.vue'
import Index from '../Index.vue'
import InputPersonal from '../components/pages/input/Personal.vue'
import InputInstitution from '../components/pages/input/Institution.vue'
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
import Core from '../core/core'

export function configRouter (router) {
  // normal routes
  router.map({
    // not found handler
    '*': {
      component: NotFound
    },
    '/login': {
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
        '*': {
          component: NotFound
        }
      }
    }
  })

  router.redirect({
    '/': '/dashboard/index',
    '/dashboard/': '/dashboard/index'
  })

  router.beforeEach(function (transition) {
    if (Core.Data.isGuest() && Core.Config.ROUTE_LIST_GUEST_CAN_VISIT.indexOf(transition.to.path) === -1) {
      transition.abort()
      router.go('/login')
    } else if (transition.to.path === '/logout') {
      transition.abort()
      Core.Data.clear()
      setTimeout(function () {
        router.go('/login')
      }, 500)
    } else {
      transition.next()
    }
  })
}
