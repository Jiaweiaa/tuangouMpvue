import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()
export default {
  config: {
    navigationBarTitleText: 'heyushuo',
    "usingComponents": {
      'van-cell': '/static/vant/cell/index',
      'van-cell-group': '/static/vant/cell-group/index'
    }
  }
}
