<template>
  <div class="index">
    <van-notify id="van-notify" />
    
    <div class="search">
      <div @click="toMappage">{{cityName}}</div>
      <div @click="toSearch">
        <input type="text" placeholder="搜索商品">
        <span class="icon"></span>
      </div>
    </div>
    
    <scroll-view scroll-y class="scrollViewStyle" @scrolltolower="lower" >
      <div v-for="(value,index) in list" :key="index" @click="detailOrder(value)">
        {{value.name}}
        {{value.city}}
        {{value.address}}
        {{value.del}}
      </div>
    </scroll-view>
    
  </div>
</template>

<script>
import amapFile from "../../utils/amap-wx";
import { get } from "../../utils";
import { mapState, mapMutations } from "vuex";
import { getDistance } from "../../api/index/index"
import Notify from '../../../static/vant/notify/notify';

export default {
  onShow() {
  },
  computed: {
    ...mapState(["cityName"])
  },
  mounted() {
    this.getCityName();
  },
  data() {
    return {
      banner: [],
      channel: [],
      brandList: [],
      newGoods: [],
      hotGoods: [],
      topicList: [],
      newCategoryList: [],
      
      list: [],
      cusLongitude: '',
      cusLatitude: '',
      allCount: null,
      loading: false,
      currentActive: 0,
      pageNum: 1
    };
  },
  components: {},
  methods: {
    ...mapMutations(["update"]),
    toMappage() {
      var _this = this;
      // 可以通过 wx.getSetting 先查询一下用户是否授权了 "scope.record" 这个 scope
      wx.getSetting({
        success(res) {
          //如果没有同意授权,打开设置
          if (!res.authSetting["scope.userLocation"]) {
            wx.openSetting({
              success: res => {
                _this.getCityName();
              }
            });
          } else {
            wx.navigateTo({
              url: "/pages/mappage/main"
            });
          }
        }
      });
    },
    getCityName() {
      var _this = this;
      var myAmapFun = new amapFile.AMapWX({
        key: "e545e7f79a643f23aef187add14e4548"
      });
      myAmapFun.getRegeo({
        success: function (data) {
          //成功回调
          _this.cusLongitude = data[0].longitude + '';
          _this.cusLatitude = data[0].latitude + '';
          // data[0].regeocodeData.formatted_address
          // _this.cityName = data[0].regeocodeData.formatted_address;
          _this.update({ cityName: data[0].regeocodeData.formatted_address });
          _this.getData();
        },
        fail: function (info) {
          //失败回调
          Notify({
            text: info.message,
            duration: 1000,
            selector: '#custom-selector',
            backgroundColor: '#1989fa'
          });
          //如果用户拒绝授权
          // 默认为北京
          _this.cityName = "北京市";
          _this.update({ cityName: "北京市" });
          _this.getData();
        }
      });
    },
    toSearch() {
      wx.navigateTo({
        url: "/pages/search/main"
      });
    },
    getData() {
      let params = {
        cusLongitude: this.cusLongitude,
        cusLatitude: this.cusLatitude,
        pageSize: 5,
        pageNum: this.pageNum
      }
      getDistance(params).then(res => {
        if (res.data.code == 200) {
          this.loading = false;
          this.list = res.data.result.records
          console.log(this.list)
          this.allCount = res.data.result.total;
        } else {
          this.loading = false
        }
      })
    },
    lower() {
      console.log(1)
      if(this.loading) return;
      this.loading = true;
      if(this.list.length >= this.allCount) {
        this.loading = false;
      }else {
        this.pageNum++;
        let params = {
          cusLongitude: this.cusLongitude,
          cusLatitude: this.cusLatitude,
          pageNum: this.pageNum,
          pageSize : 5
        }
        getDistance(params).then(res => {
          if (res.data.code == 200) {
            this.loading = false;
            this.list = this.list.concat(res.data.result.records);
            this.allCount = res.data.result.total;
          } else {
            this.loading = false
          }
        })
      }
    },
  },
  created() { }
};
</script>

<style lang='scss' scoped>
@import "./style.scss";
</style>
