// pages/user/user.js
var app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo: getApp().globalData.userInfo,
        //收藏数量
        collectNumber: 0
    },
    call(e) {
        console.log(e.currentTarget.dataset.num)
        wx.makePhoneCall({  phoneNumber: e.currentTarget.dataset.num });
    },
    toDetail(e){
        let id = e.currentTarget.dataset.item;
        wx.navigateTo({
          url: '/pages/tel_detail/tel_detail?goods_id='+id
        })
        },
    toUpdate(e){
        wx.navigateTo({
            url: '/pages/registered/registered?update=1'
        })
    },
    onShow: function() {
        //获取本地储存数据
        console.log('userInfo',app.globalData.userInfo);
        //wx.getStorageSync('key',value) 储存数据到本地，key==名称 value==储存数据
        const userInfo = wx.getStorageSync('userInfo');
        app.globalData.userInfo
        this.setData({
            userInfo:app.globalData.userInfo
        })
        if (typeof this.getTabBar === 'function' && this.getTabBar()) {
            this.getTabBar().setData({
              selected: 2  //这个数字是当前页面在tabBar中list数组的索引
            })
          }
    }
})