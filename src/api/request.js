let Fly=require("flyio/dist/npm/wx");
let fly=new Fly;
fly.config.baseURL="http://192.168.0.8:8003";

fly.interceptors.request.use((config) => {

  if(config.method  === 'GET'){
    let openId = wx.getStorageSync('openId');
    let querystring = require('querystring');
    config.headers['openId'] = openId;
    config.body = querystring.encode(config.body);
  }
  if(config.method  === 'POST'){
    let openId = wx.getStorageSync('openId');
    let querystring = require('querystring');
    config.headers['openId'] = openId;
    config.headers.Authorization = "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJqMTIzNDU2Iiwic2NvcGUiOlsiKiJdLCJsb2dpbk5hbWUiOiJqMTIzNDU2IiwiZXhwIjoxNTYxMTkxMzM1LCJqdGkiOiJlYzViZDcxMi0zZGJkLTRkMDEtYjRkZS01ZmUyNGEyNTZhMzMiLCJjbGllbnRfaWQiOiJjbG91ZG1hbGwtY2xpZW50LWJhc2ljLWF1dGgiLCJ0aW1lc3RhbXAiOjE1NjAzMjczMzUyNzd9.b9T7wf8ydB_CcZL8EG1jCvkd5kXqhl9ln2o4pl5modE";
    config.body = querystring.encode(config.body);
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});


export default fly;
