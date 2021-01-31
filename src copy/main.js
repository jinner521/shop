// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
//引入全局css
import './assets/css/reset.css'

//引入elementui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)


//封装全局组件
import gCom from './common'
for(let i in gCom){
  Vue.component(i,gCom[i])
}

//创建一个图片地址
Vue.prototype.$imgUrl = 'http://localhost:3000'


//全局引入echarts
let Echarts = require('echarts')
Vue.prototype.$Echarts = Echarts

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
