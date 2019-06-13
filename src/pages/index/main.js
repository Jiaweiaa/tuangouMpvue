import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()
export default {
  config: {
    enablePullDownRefresh: true,
    "usingComponents": {
      "van-notify": '/static/vant/notify/index'
    }
  }
}
