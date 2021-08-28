//app.js
import { wxRequest } from "./request/wxRequest.js";
App({
  //onLaunch,onShow: options(path,query,scene,shareTicket,referrerInfo(appId,extraData))
  globalData: {
    hasLogin: false,
    openid: null,
    index:0,
    userInfo:{},
    token:''
  },
  onLaunch: function (options) {
    let that = this;
    wx.login({
      success (res) {
        if (res.code) {
            console.log('login',res);
          //发起网络请求
          wxRequest('POST','/wx/auth/loginByWechat',{
            code: res.code,
          }).then(res => {
            //请求成功
            if(res.statusCode == 200 && res.data.code == 0){
              that.globalData.hasLogin = true;
              that.globalData.token=res.data.result.token;
              wx.setStorageSync('token', res.data.result.token)
              that.globalData.userInfo=res.data.result.userInfo;
            } else {
              that.globalData.token=res.data.result.token;
            }
         })
         .catch(err => {
            //请求失败
            console.log('登录失败11！' + err)
         })
          // wx.request({
          //   url: 'http://192.168.0.118:8080/wx/auth/loginByWechat',
          //   method:'POST',
          //   data: {
          //     code: res.code,
          //   },
          //   success (res) {
          //     console.log('res',res);
          //     if(res.statusCode == 200 && res.data.code == 0){
          //       that.globalData.hasLogin = true;
          //       that.globalData.token=res.data.result.token;
          //       that.globalData.userInfo=res.data.result.userInfo;
          //     } else {
          //       that.globalData.token=res.data.result.token;
          //     }
          //   }
          // })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },
  onShow: function (options) {
  },
  onHide: function () {

  },
  onError: function (msg) {

  },
  //options(path,query,isEntryPage)
  onPageNotFound: function (options) {
    
  },
});