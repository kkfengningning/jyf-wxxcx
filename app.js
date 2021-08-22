//app.js
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
          wx.request({
            url: 'http://192.168.0.118:8080/wx/auth/loginByWechat',
            method:'POST',
            data: {
              code: res.code,
            },
            success (res) {
              console.log('res',res);
              if(res.statusCode == 200 && res.data.code == 0){
                that.globalData.hasLogin = true;
                that.globalData.token=res.data.result.token;
              } else {
                that.globalData.token=res.data.result.token;
              }
            }
          })
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