// pages/category/category.js
// import regeneratorRuntime from '../../lib/runtime/runtime';
// const { request } = require('../../request/index.js')
Page({

    /**
     * 页面的初始数据
     */
    data: {
    },
    //总数据
    Cate: [],
    //获取分类信息
    // async getCateList() {
    //     this.Cate = await request({ url: "/categories" });
    //     wx.setStorageSync('cates', { time: Date.now(), data: this.Cate })
    //     let leftList = this.Cate.map(v => v.cat_name)
    //     let rightList = this.Cate[0].children;
    //     this.setData({
    //         leftList,
    //         rightList
    //     })
    // },
    //点击事件
    handelTap(e) {
    
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onShow: function () {
        if (typeof this.getTabBar === 'function' && this.getTabBar()) {
          this.getTabBar().setData({
            selected: 1  //这个数字是当前页面在tabBar中list数组的索引
          })
        }
      },
    onLoad: function(options) {
    }
})