let Fly=require("flyio/dist/npm/wx");
let fly=new Fly;
fly.config.baseURL="http://192.168.0.16:8003";

fly.interceptors.request.use((config) => {

  if(config.method  === 'GET'){
    let openId = wx.getStorageSync('openId');
    config.headers['openId'] = openId;
  }
  if(config.method  === 'POST'){
    let openId = wx.getStorageSync('openId');
    config.headers['openId'] = openId;
    config.headers.Authorization = "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJhZG1pbiIsInNjb3BlIjpbIioiXSwibG9naW5OYW1lIjoiYWRtaW4iLCJleHAiOjE1NjEyNTQyOTEsImp0aSI6IjM0ZTJlNmUwLTkxNWEtNDhiNS1iNjhlLTg4NTY0NmIzZjkyMSIsImNsaWVudF9pZCI6ImNsb3VkbWFsbC1jbGllbnQtYmFzaWMtYXV0aCIsInRpbWVzdGFtcCI6MTU2MDM5MDI5MTI4M30.7bYcjkQm32uXjDDqWGTm02mLVC6eV-yB4-BrjuqCRiI";
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});


export default fly;
