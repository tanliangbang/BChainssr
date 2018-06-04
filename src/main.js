// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import VueLoading from './plugins/loading/index'
import Prompt from './plugins/prompt/index'
import Mask from './plugins/mask/index'
import Tool from './utils/Tool'
import { sync } from 'vuex-router-sync'

Vue.config.productionTip = false
Vue.use(VueLoading)
Vue.use(Prompt)
Vue.use(Mask)

router.beforeEach((to, from, next) => {
  if (to.name === 'login') {
    if (Tool.isLogin()) {
      next({path: '/'})
      return true
    }
  }
  next()
})
export function createApp () {
  // 同步路由状态(route state)到 store
  sync(store, router)
  // 创建应用程序实例，将 router 和 store 注入
  const app = new Vue({
    router,
    store,
    render: h => h(App)
  })
  // 暴露 app, router 和 store。
  return {app, router, store}
}

Vue.prototype.$lang = {
  changeLang: function (str) {
    let lang = {
      en: require('./../static/lang/en'),
      cn: require('./../static/lang/cn')
    }
    console.log(lang)
    return lang[str]
  }
}
