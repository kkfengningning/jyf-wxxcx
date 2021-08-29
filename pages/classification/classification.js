// pages/classification/classification.js
import areaList from './area';
import { wxRequest } from "../../request/wxRequest.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    areaList : areaList,
    itemTitle: '地区',
    option1: [
      { text: '求购', value: '求购' },
      { text: '供应', value: '供应' },
    ],
    switch1: '供应',
    goodsList:[],
    pageNum:1,
    wenan:'',
    city:'',
    province:''

  },


  onSwitch1Change({ detail }) {
    console.log(detail);
    this.setData({ 
      switch1: detail,
      pageNum: 1
    });
    this.feachList();
  },
  onSwitch2Change({ detail }) {
    this.setData({ switch2: detail });
  },
  onConfirm(val) {
    console.log(val,val.detail.values[0].name,val.detail.values[1].name);
    
    this.selectComponent('#item').toggle();
    this.setData({ 
      province:val.detail.values[0].name,
      city:val.detail.values[1].name,
      pageNum: 1
    });
    this.feachList();
  },
  onClose() {
    this.selectComponent('#item').toggle();
  },
  onChange(val) {
    console.log(val,'val');
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1  //这个数字是当前页面在tabBar中list数组的索引
      })
    }
    this.feachList()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log(1111);
    this.setData({ 
      pageNum: this.data.pageNum+1
    });
    this.feachList( 'more' );
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  feachList(more){
    wxRequest('POST','/wx/supplyDemand/list',{
      type:this.data.switch1,
      province:this.data.province,
      city:this.data.city,
      pageNum: this.data.pageNum
    }).then(res => {
      this.setData({ 
            goodsList:more?this.data.goodsList.concat(res.data.result.recommendGoods):res.data.result.recommendGoods,
            wenan:res.data.result.recommendGoods.length > 0 ?'下拉加载更多' : '暂无数据'
        });
        //请求成功
        // this.setData({ 
        //     orders_o: res.data.result.on,
        //     orders_i: res.data.result.off,
        //     Tabs:[{
        //         id: 0,
        //         name: '已发布',
        //         isActive: true,
        //         num:res.data.result.on.length
        //     }, {
        //         id: 1,
        //         name: '已下架',
        //         isActive: false,
        //         num:res.data.result.off.length
        //     }]
        // });
     })
},
})