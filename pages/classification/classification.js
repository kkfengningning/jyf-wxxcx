// pages/classification/classification.js
import areaList from './area';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    areaList : areaList,
    itemTitle: '地区',
    option1: [
      { text: '求购', value: 0 },
      { text: '供应', value: 1 },
    ],
    value1: 0,
  },

  onSwitch1Change({ detail }) {
    this.setData({ switch1: detail });
  },

  onSwitch2Change({ detail }) {
    this.setData({ switch2: detail });
  },
  onConfirm(val) {
    console.log(val,'val');
    this.selectComponent('#item').toggle();
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
        selected: 2  //这个数字是当前页面在tabBar中list数组的索引
      })
    }
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})