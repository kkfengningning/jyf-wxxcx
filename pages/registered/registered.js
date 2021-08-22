// pages/registered/registered.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type:'',
    value: '',
    mobilePhone: '',
    name: '',
    show:false,
    jymsshow:false,
    shfwshow:false,
    receivingRange:'',
    receivingMethod:'',
    receivingRange:'',
    html: '',
    telephoneNumber: '',
    wechatNumber: '',
    managementModel:'',
    actions: [
      {
        name: '个人',
      },
      {
        name: '企业',
      }
    ],
    jymsactions: [
      {
        name: '个体',
      },
      {
        name: '分拣厂',
      }
    ],
    shfwactions: [
      {
        name: '本地',
      },
      {
        name: '全国',
      }
    ],
    shfsactions: [
      {
        name: '上门',
      },
      {
        name: '到厂',
      }
    ],
    region: ['广东省', '广州市', '海珠区'],
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
  onjymsClose() {
    this.setData({ jymsshow: false });
  },
  onshfwClose() {
    this.setData({ shfwshow: false });
  },
  onshfsClose() {
    this.setData({ shfsshow: false });
  },
  onjymsSelect(event) {
    console.log(event.detail);
    this.setData({
      managementModel: event.detail.name
    })
  },
  onshfwSelect(event) {
    console.log(event.detail);
    this.setData({
      receivingRange: event.detail.name
    })
  },
  onshfsSelect(event) {
    console.log(event.detail);
    this.setData({
      receivingMethod: event.detail.name
    })
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
  jymsChange(event) {
    this.setData({
      jymsshow: true
    })
  },
  shfwChange(event) {
    this.setData({
      shfwshow: true
    })
  },
  shfsChange(event) {
    this.setData({
      shfsshow: true
    })
  },
  getHtml(e) {//从组件获取值
    this.html = e.detail.content.html
  },
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
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