import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import Router from 'vue-router'
import vueAxios from 'vue-axios'
import routeConfig from '@/configs/route.config.js'
import storeConfig from '@/configs/store.config.js'
import serviceConfig from '@/configs/service.config.js'
import App from '@/containers/Common/App'
import '@/binary/styles/index.styl'

// **************************
// vue global config
// **************************

Vue.config.productionTip = false

// **************************
// vue use router function
// **************************

Vue.use(Router)
const router = new Router(routeConfig)

// **************************
// vue use store function
// **************************

Vue.use(Vuex)
const store = new Vuex.Store(storeConfig)

// **************************
// vue use http function
// **************************

Vue.use(vueAxios, axios)

// **************************
// vue initial
// **************************

const el = document.createElement('section')
document.body.insertBefore(el, document.body.childNodes[0])
new Vue({
  el,
  store,
  router,
  template: '<App/>',
  components: { App }
})
