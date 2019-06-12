import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()
export default {
  config: {
    navigationBarTitleText: '我的订单',
    enablePullDownRefresh: true,
    "usingComponents": {
      "van-tab": '/static/vant/tab/index',
      "van-tabs": '/static/vant/tabs/index',
      "van-card": '/static/vant/card/index',
      "van-button": '/static/vant/button/index',
      "van-loading": "/static/vant/loading/index"
    }
  }
}
