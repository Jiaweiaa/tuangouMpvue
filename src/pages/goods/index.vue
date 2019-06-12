<template>
	<div id="vmsimulatedDATA" class="productBox">
		<div class="productConten">
			<div class="product-delcom" :key="n" v-for="(ProductItem,n) in simulatedDATA.specifications">
				<p>{{ProductItem.name}}</p>
				<ul class="product-footerlist clearfix">
					<li v-for="(oItem,index) in ProductItem.item" :key="item" v-on:click="specificationBtn(oItem.name,n,$event,index)" v-bind:class="[oItem.isShow?'':'noneActive',subIndex[n] == index?'productActive':'']">{{oItem.name}}</li>
				</ul>
			</div>
		</div>
		<div class="product-footer">
			<a href="javascript:">立即购买</a>
		</div>
	</div>


</template>
<script>
  export default {
   
   
    data () {
     
      return {
        data: [],
        simulatedDATA: { //模拟后台返回的数据 多规格
          "difference": [{ //所有的规格可能情况都在这个数组里
            "id": "19",
            "price": "200.00",
            "stock": "19",
            "difference": "100,白色"
          },
            {
              "id": "20",
              "price": "300.00",
              "stock": "29",
              "difference": "200,白色"
            },
            {
              "id": "21",
              "price": "300.00",
              "stock": "10",
              "difference": "100,黑丝"
            },
            {
              "id": "22",
              "price": "300.00",
              "stock": "0",
              "difference": "200,黑丝"
            },
            {
              "id": "23",
              "price": "500.00",
              "stock": "48",
              "difference": "100,绿色"
            },
            {
              "id": "24",
              "price": "500.00",
              "stock": "0",
              "difference": "200,绿色"
            }
          ],
          "specifications": [{ //这里是要被渲染字段
            "name": "尺寸",
            "item": [{
              "name": "100",
            },
              {
                "name": "200",
              }
            ]
          },
            {
              "name": "颜色",
              "item": [{
                "name": "白色",
              },
                {
                  "name": "黑丝",
                },
                {
                  "name": "绿色",
                }
              ]
            }
          ]
        },
        selectArr: [], //存放被选中的值
        shopItemInfo: {}, //存放要和选中的值进行匹配的数据
        subIndex: [], //是否选中 因为不确定是多规格还是但规格，所以这里定义数组来判断

      }
    },
    created: function () {
      var self = this;
      for (var i in self.simulatedDATA.difference) {
        self.shopItemInfo[self.simulatedDATA.difference[i].difference] = self.simulatedDATA.difference[
          i]; //修改数据结构格式，改成键值对的方式，以方便和选中之后的值进行匹配
      }
      self.checkItem();
    },
    mounted: function () {},
    methods: {
      specificationBtn: function (item, n, event, index) {
        var self = this;
        if (self.selectArr[n] != item) {
          self.selectArr[n] = item;
          self.subIndex[n] = index;

        } else {
          self.selectArr[n] = "";
          self.subIndex[n] = -1; //去掉选中的颜色
        }
        self.checkItem();
      },
      checkItem: function () {
        var self = this;
        var option = self.simulatedDATA.specifications;
        var result = [];  //定义数组存储被选中的值
        for (var i in option) {
          result[i] = self.selectArr[i] ? self.selectArr[i] : '';
        }
        for (var i in option) {
          var last = result[i];  //把选中的值存放到字符串last去
          for (var k in option[i].item) {
            result[i] = option[i].item[k].name; //赋值，存在直接覆盖，不存在往里面添加name值
            option[i].item[k].isShow = self.isMay(result); //在数据里面添加字段isShow来判断是否可以选择
          }
          result[i] = last; //还原，目的是记录点下去那个值，避免下一次执行循环时避免被覆盖

        }
        self.$forceUpdate(); //重绘
      },
      isMay: function (result) {
        for (var i in result) {
          if (result[i] == '') {
            return true; //如果数组里有为空的值，那直接返回true
          }
        }
        return this.shopItemInfo[result].stock == 0 ? false : true; //匹配选中的数据的库存，若不为空返回true反之返回false
      }


    }
  }
</script>
<style>
	body {
		font-family: "Microsoft YaHei", "arial";
		background-color: #f2f2f2;
		background-color: rgba(0, 0, 0, 0.6)
	}
	ol,
	ul {
		list-style: none;
	}
	
	li {
		list-style-type: none;
	}
	.clearfix:after {
		display: block;
		overflow: hidden;
		clear: both;
		height: 0;
		visibility: hidden;
		content: "";
	}
	
	* {
		margin: 0;
		padding: 0;
		-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
	}
	
	@media screen and (max-width: 319px) {
		html {
			font-size: 42.666665px;
		}
	}
	@media screen and (min-width: 320px) and (max-width: 359px) {
		html {
			font-size: 42.66666px;
		}
	}
	@media screen and (min-width: 360px) and (max-width: 374px) {
		html {
			font-size: 48px;
		}
	}
	@media screen and (min-width: 375px) and (max-width: 383px) {
		html {
			font-size: 50px;
		}
	}
	@media screen and (min-width: 384px) and (max-width: 399px) {
		html {
			font-size: 51.2px;
		}
	}
	@media screen and (min-width: 400px) and (max-width: 413px) {
		html {
			font-size: 53.333335px;
		}
	}
	@media screen and (min-width: 414px) {
		html {
			font-size: 55.2px;
		}
	}
	.productBox {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		background-color: #fff;
	}
	.productConten {
		margin-bottom: 1rem;
	}
	.product-delcom {
		padding: 0.24rem 7%;
		color: #323232;
		font-size: 0.26rem;
		border-bottom: 1px solid #EEEEEE;
	}
	.product-footerlist {
		margin-top: 0.1rem;
	}
	.product-footerlist li {
		border: 1px solid #606060;
		border-radius: 0.08rem;
		color: #606060;
		text-align: center;
		padding: 0.04rem 0.16rem;
		float: left;
		margin-right: 0.16rem;
		min-width: 0.96rem;
		margin-bottom: 0.16rem;
	}
	.product-footerlist li.productActive {
		background-color: #1A1A29;
		color: #fff;
		border: 1px solid #1A1A29;
	}
	.product-footerlist li.noneActive {
		background-color: #ccc;
		opacity: 0.4;
		color: #000;
		pointer-events: none;
	}
	.product-footer {
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-flex: 1;
		-webkit-box-flex: 1;
		flex: 1;
		background-color: #1A1A29;
		line-height: 1rem;
		text-align: center;
	}
	.product-footer a {
		-webkit-flex: 1;
		-webkit-box-flex: 1;
		flex: 1;
		color: #fff;
		font-size: 0.3rem;
		text-decoration: none;
	}
</style>
