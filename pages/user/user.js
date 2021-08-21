// pages/user/user.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo: {},
        //收藏数量
        collectNumber: 0
    },
    onShow: function() {
        //获取本地储存数据
        //wx.getStorageSync('key',value) 储存数据到本地，key==名称 value==储存数据
        const userInfo = wx.getStorageSync('userInfo');
        const collect = wx.getStorageSync('collect') || [];
        this.setData({
            userInfo,
            collectNumber: collect.length
        })
    }
})