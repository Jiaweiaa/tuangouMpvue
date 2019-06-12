<template>
	<div class="myOrder">
		<van-tabs  tab-class="tabClass" :active="currentActive" @change="onChange">
			<van-tab title-style="flex-basis: 20%;" :title="itemTab" :key="indexTab" v-for="(itemTab, indexTab) in tabs">
				<view class="section">
					<scroll-view scroll-y style="height: calc(100vh - 50px);" @scrolltoupper="upper" @scrolltolower="lower">
						<div v-for="(value,index) in list" :key="index" @click="detailOrder(value)">
							<div class='top border-bottom' style="overflow: hidden;">
								<div style="height: 30px; line-height: 30px; font-size: 13px; width: 80%; float: left; margin-left: 10px; margin-top: 10px;">订单编号: {{value.code}}</div>
								<div class="order-ok" style="width: calc(20% - 10px); float: right; margin-top: 10px; font-size: 15px;">{{value.typeData.title}}</div>
							</div>
							<div class="timer bottom border-top" style="height: 30px; line-height: 30px; font-size: 13px; margin-left: 10px; margin-bottom: 10px;">创建时间: {{value.createTime}}</div>
							<div 	v-for="(val,childIndex) in value.orderLines" :key="childIndex" >
								<van-card
									:num="val.quantity"
									tag="标签"
									:price="val.salePrice"
									:title="val.itemName"
									:thumb="'http://img.gaoshanmall.com/static/resource/'+val.itemImg"
								>
									<view slot="footer">
										<van-button @click="cancelOrder(value)" type="danger" class="childBtn" size="small" v-if="value.typeData.canBtn">取消订单</van-button>
										<van-button @click="logistics(value)" class="childBtn" size="small" v-if="value.typeData.seeBtn">查看物流</van-button>
										<van-button @click="payBtn(value)" type="primary" class="childBtn" size="small" v-if="value.typeData.giveBtn">立即支付</van-button>
									</view>
								</van-card>
							</div>
						</div>
						<div style="width: 100%; text-align: center;margin-top: 5px;">
							
							<div v-if="list.length >= allCount" style="font-size: 13px;">全部加载完成!</div>
							<van-loading v-else size="20px" type="spinner" color="#fff" />
						</div>
					</scroll-view>
				</view>
			</van-tab>
		</van-tabs>
	</div>
</template>

<script>
  import { findAllOrders } from '../../api/myOrder/index'

  export default {
    onShow() {
      this.getOrderList();
    },
    data() {
      return {
        currentActive: 0,
        pageNum: 1,
        list: [],
        allCount: '',
        loading: false,

        tabs:['全部','待支付','待收货','待发货','已完成']
      };
    },
    components: {},
    onPullDownRefresh(e) {
      console.log(e, '到顶')
    },
    methods: {
      lower: function(e) {
        if(this.loading) return;
        this.loading = true;
        if(this.list.length >= this.allCount) {
          this.loading = false;
        }else {
          this.pageNum++;
          let params = {
            pageNum: this.pageNum,
            pageSize : 5,
            orderType: Number(this.currentActive) + 1
          }
          findAllOrders(params).then(res => {
            if (res.data.code == 200) {
              this.loading = false;
              this.list = this.list.concat(res.data.result.orders.records);
              this.list.map(order => {
                if(order.logisticsStatus == 6) {
                  order.typeData = {
                    title: "商家已发货",
                    canBtn: true,
                    giveBtn: true,
                    seeBtn: true
                  }
                }else if(order.logisticsStatus==15) {
                  order.typeData = {
                    title: "交易成功",
                    canBtn: false,
                    giveBtn: true,
                    seeBtn: true
                  }
                }else if(order.logisticsStatus==9 && order.financialStatus==3) {
                  order.typeData = {
                    title: "待退款",
                    canBtn: false,
                    giveBtn: false,
                    seeBtn: true
                  }
                }else if(order.logisticsStatus==9 && order.financialStatus==1) {
                  order.typeData = {
                    title: "交易取消",
                    canBtn: false,
                    giveBtn: false,
                    seeBtn: true
                  }
                }else if(order.logisticsStatus==11) {
                  order.typeData = {
                    title: "退款成功",
                    canBtn: false,
                    giveBtn: false,
                    seeBtn: true
                  }
                }else if(order.financialStatus==1 && order.paymentType!=1 && order.logisticsStatus==1) {
                  order.typeData = {
                    title: "待支付",
                    canBtn: false,
                    giveBtn: true,
                    seeBtn: true
                  }
                }else if(order.financialStatus!=1 && order.logisticsStatus==1 || order.logisticsStatus==3 || order.logisticsStatus==4 || order.logisticsStatus==5) {
                  order.typeData = {
                    title: "等待商家发货",
                    canBtn: false,
                    giveBtn: false,
                    seeBtn: true
                  }
                }else if(order.logisticsStatus==10 && order.financialStatus==1) {
                  order.typeData = {
                    title: "自动取消",
                    canBtn: false,
                    giveBtn: false,
                    seeBtn: true
                  }
                }
              });
              this.allCount = res.data.result.orders.total;
            } else {
              this.loading = false
            }
          })
        }
      },
    
      getOrderList() {
        let params = {
          pageNum: this.pageNum,
          pageSize : 5,
          orderType: Number(this.currentActive) + 1
        }
        // 1是立即支付  2是取消订单 3查看详情 4查看物流
        findAllOrders(params).then(res => {
          this.list = res.data.result.orders.records;
          this.list.map(order => {
            if(order.logisticsStatus == 6) {
              order.typeData = {
                title: "商家已发货",
                canBtn: true,
                giveBtn: true,
                seeBtn: true
              }
            }else if(order.logisticsStatus==15) {
              order.typeData = {
                title: "交易成功",
                canBtn: false,
                giveBtn: true,
                seeBtn: true
              }
            }else if(order.logisticsStatus==9 && order.financialStatus==3) {
              order.typeData = {
                title: "待退款",
                canBtn: false,
                giveBtn: false,
                seeBtn: true
              }
            }else if(order.logisticsStatus==9 && order.financialStatus==1) {
              order.typeData = {
                title: "交易取消",
                canBtn: false,
                giveBtn: false,
                seeBtn: true
              }
            }else if(order.logisticsStatus==11) {
              order.typeData = {
                title: "退款成功",
                canBtn: false,
                giveBtn: false,
                seeBtn: true
              }
            }else if(order.financialStatus==1 && order.paymentType!=1 && order.logisticsStatus==1) {
              order.typeData = {
                title: "待支付",
                canBtn: false,
                giveBtn: true,
                seeBtn: true
              }
            }else if(order.financialStatus!=1 && order.logisticsStatus==1 || order.logisticsStatus==3 || order.logisticsStatus==4 || order.logisticsStatus==5) {
              order.typeData = {
                title: "等待商家发货",
                canBtn: false,
                giveBtn: false,
                seeBtn: true
              }
            }else if(order.logisticsStatus==10 && order.financialStatus==1) {
              order.typeData = {
                title: "自动取消",
                canBtn: false,
                giveBtn: false,
                seeBtn: true
              }
            }
          });
          this.allCount = res.data.result.orders.total;
        })
      },

      detailOrder(val) {
        wx.navigateTo({url: '../order/main'})
       
      },

      onChange(val) {
        this.currentActive = val.target.index;
        this.pageNum = 1;
        this.list = [];
        this.getOrderList();
      }
    },
    computed: {}
  };

</script>
<style lang='scss'>
	.tabClass {
		flex-basis: 20% !important;
	}
	.scroll-view-item {
		width: 100%;
		height: 200px;
	}
	.myOrder {
		background: #fafafa;
	}
	.childBtn {
		margin-left: 8px;
	}
</style>
