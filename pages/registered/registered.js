// pages/registered/registered.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: '',
    phone: '',
    name: '',
    show:false,
    html: '',
    actions: [
      {
        name: '个人',
      },
      {
        name: '企业',
      }
    ],
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

  },
  onClose() {
    this.setData({ show: false });
  },

  onSelect(event) {
    console.log(event.detail);
    this.setData({
      type: event.detail.name
    })
  },
  typeChange(event) {
    this.setData({
      show: true
    })
  },
  getHtml(e) {//从组件获取值
    this.html = e.detail.content.html
  },
  insertImage(){ //图片上传插入示例
    wx.chooseImage({
      count: 1,
      success: res => {
        console.log(res);
        wx.uploadFile({ //调用图片上传接口
          url: 'http://192.168.0.118:8080/wx/file/imageUpload', 
          filePath: res.tempFilePaths[0],
          name: 'file',
          header: {
            'X-CR-Token': app.globalData.token
          },
          success: res => {
            console.log('img',res);
            let imgUrl = JSON.parse(res.data).result.path;
            this.selectComponent('#hf_editor').insertSrc(imgUrl);//调用组件insertSrc方法
          }
        })
      }
    })
  }
})