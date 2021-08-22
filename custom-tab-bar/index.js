var app = getApp()
import Dialog from '../miniprogram_npm/@vant/weapp/dialog/dialog';
Component({
  data: {
    selected: 0,
    color: "#7A7E83",
    selectedColor: "#3cc51f",
    "list": [
      {
        "pagePath": "/pages/index/index",
        "text": "首页",
        "iconPath": "/icons/home.png",
        "selectedIconPath": "/icons/home-o.png"
      },
      {
        "pagePath": "/pages/category/category",
        "text": "分类",
        "iconPath": "/icons/category.png",
        "selectedIconPath": "/icons/category-o.png"
      },
      {
        "pagePath": "/pages/cart/cart",
        "text": "通讯录",
        "iconPath": "/icons/cart.png",
        "selectedIconPath": "/icons/cart-o.png"
      },
      {
        "pagePath": "/pages/user/user",
        "text": "我的",
        "iconPath": "/icons/my.png",
        "selectedIconPath": "/icons/my-o.png"
      }
    ]
  },
  attached() {
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      console.log('11',app.globalData.hasLogin);
      if(app.globalData.hasLogin == true){
        wx.switchTab({url})
        this.setData({
          selected: data.index
        })
      } else {
        Dialog.alert({
          message: '您还未登录请先登录填写用户信息再进行操作',
          confirmButtonText:'微信授权',
          showCancelButton:'true',
          confirmButtonOpenType:'getUserInfo'
        }).then(() => {
          // on close
          wx.getUserInfo({
            success: function(res) {
             console.log('getUserInfo',res);
             wx.request({
              url: 'http://192.168.0.118:8080/wx/auth/bindPhone',
              method:'POST',
              header: {
                'content-type': 'application/json', // 默认值
                'X-CR-Token': app.globalData.token
              },
              data: {
                encryptedData: res.encryptedData,
                iv: res.iv,
              },
              success (res) {
                console.log('res',res);
                wx.navigateTo({
                  url: '/pages/registered/registered',
              })
              }
            })
            }
          })
        });
        return;
      }
    }
  }
})