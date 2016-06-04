/**
 * Created by Cheng Yang <yangcheng0816@gmail.com> on 16/5/31.
 */
import NotFound from '../components/NotFound.vue'
import Dashboard from '../components/Dashboard.vue'
import Login from '../components/Login.vue'
import Index from '../Index.vue'

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
        '*': {
          component: NotFound
        }
      }
    }
  })

  router.redirect({
    '/': '/dashboard/index'
  })
}
