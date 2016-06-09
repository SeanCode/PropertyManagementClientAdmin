/**
 * Created by Cheney Yang <yangcheng0816@gmail.com> on 16/5/31.
 */
import NotFound from '../components/NotFound.vue'
import Dashboard from '../components/Dashboard.vue'
import Login from '../components/Login.vue'
import Index from '../Index.vue'
import InputPersonal from '../components/pages/input/Personal.vue'
import InputInstitution from '../components/pages/input/Institution.vue'
import ManagePersonal from '../components/pages/manage/Personal.vue'
import ManageInstitution from '../components/pages/manage/Institution.vue'
import PrintPayment from '../components/pages/print/Payment.vue'
import PrintReport from '../components/pages/print/Report.vue'
import PrintTemp from '../components/pages/print/Temp.vue'
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
        '/sdq/manage/personal': {
          component: ManagePersonal
        },
        '/sdq/manage/institution': {
          component: ManageInstitution
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
      router.go('/login')
    } else {
      transition.next()
    }
  })
}
