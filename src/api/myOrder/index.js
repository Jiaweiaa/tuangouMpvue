import fly from '../request';
let querystring = require("querystring");
let deviceId = new Date().getTime();

// 全部订单
export const findAllOrders = params => {
  return fly.request({
    url: `/trade/ActOrd/findAllOrders`,
    method: "post",
    body: params,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
  });
};
