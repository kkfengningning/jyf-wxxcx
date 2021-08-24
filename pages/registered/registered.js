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
    username: '',
    show:false,
    jymsshow:false,
    shfwshow:false,
    receivingRange:'',
    receivingMethod:'',
    receivingType:'',
    receivingRange:'',
    html: '',
    telephoneNumber: '',
    wechatNumber: '',
    managementModel:'',
    fileList: [],
    customItem: '全部',
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
  deletRead(){
    this.setData({ fileList : [] });
  },
  afterRead(event) {
    const { file } = event.detail;
    let that = this;
    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
    console.log('file',file,file.url);
    wx.uploadFile({
      url: 'http://192.168.0.118:8080/wx/file/imageUpload',// 仅为示例，非真实的接口地址
      filePath: file.url,
      name: 'file',
      header: {
        'X-CR-Token': app.globalData.token
      },
      success(res) {
        // 上传完成需要更新 fileList
        const { fileList = [] } = that.data;
        fileList.push({ ...file, url: JSON.parse(res.data).result.path });
        that.setData({ fileList });
      },
    });
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
  // getPhoneNumber (e) {
  //   console.log(e.detail.errMsg)
  //   console.log(e.detail.iv)
  //   this.setData({
  //     mobilePhone: e.detail.errMsg
  //   })
  //   // this.setData({
  //   //   mobilePhone: 2222
  //   // })
  //   console.log(e.detail.encryptedData)
  // },
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
  submit: function () {
    console.log('name',this.data.type);
    let params={
      type:this.data.type,
      name:this.data.username,
      mobilePhone:this.data.mobilePhone,
      telephoneNumber:this.data.telephoneNumber,
      region:this.data.region,
      managementModel:this.data.managementModel,
      receivingRange:this.data.receivingRange,
      receivingMethod:this.data.receivingMethod,
      introduce:this.data.html,
      logoId:this.data.fileList[0]?this.data.fileList[0].url:null
    }
    wx.request({
      url: 'http://192.168.0.118:8080/wx/user/update',
      method:'POST',
      header: {
        'X-CR-Token': app.globalData.token
      },
      data: params,
      success (res) {
        console.log('res',res);
        app.globalData.hasLogin = true;
      }
    })
  },
  jy: function () {
    return true;
    if(!type || !name || !name || !mobilePhone || !telephoneNumber || !region || !managementModel|| !receivingRange || !receivingMethod){
      return true;
    } else {
      return false;
    }
  },
  // jy(){
  //   if(!type || !name || !name || !mobilePhone || !telephoneNumber || !region || !managementModel|| !receivingRange || !receivingMethod){
  //     return true;
  //   } esle {
  //     return false;
  //   }
    
  // },
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