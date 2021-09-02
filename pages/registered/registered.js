// pages/registered/registered.js
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
import { URL,wxRequest } from "../../request/wxRequest.js";
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
    update:0,
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
    let pages = getCurrentPages();
    let update = pages[pages.length - 1].options.update
    // this.getGoodInfo(goods_id)
    if(update){
      this.userInfo();
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {


  },
  userInfo(){
    wxRequest('POST','/wx/personalCenter/getUserInfo','').then(res => {
      console.log(res.data.result);
      this.setData({
          type:res.data.result.type,
          wechatNumber:res.data.result.wechatNumber,
          username:res.data.result.name,
          receivingType:res.data.result.receivingType,
          mobilePhone:res.data.result.mobilePhone,
          telephoneNumber:res.data.result.telephoneNumber,
          region:[res.data.result.province,res.data.result.city,'全部'],
          managementModel:res.data.result.managementModel,
          receivingRange:res.data.result.receivingRange,
          receivingMethod:res.data.result.receivingMethod,
          html:res.data.result.introduce,
          logoId:this.data.fileList[0]?this.data.fileList[0].id:null,
          fileList : [{
            url: res.data.result.logoUrl,
            name: '图片1',
            id:res.data.result.logoId
          }]
        }
      )
      this.selectComponent("#hf_editor").setHtml(res.data.result.introduce);
     })
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
      url: URL+'/wx/file/imageUpload',// 仅为示例，非真实的接口地址
      filePath: file.url,
      name: 'file',
      header: {
        'X-CR-Token': app.globalData.token
      },
      success(res) {
        // 上传完成需要更新 fileList
        const { fileList = [] } = that.data;
        fileList.push({ ...file, url: JSON.parse(res.data).result.path, id: JSON.parse(res.data).result.id });
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
    console.log(' e.detail.content.html', e.detail.content.html);
    this.setData({
      html: e.detail.content.html
    })
    // this.html = e.detail.content.html
  },
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  submit: function () {
    var myreg=/^[1][3,4,5,7,8,9][0-9]{9}$/; 
    if(this.data.type == ''){
      Toast.fail('信息类型不能为空,请选择');
      return;
    }
    if(this.data.name == ''){
      Toast.fail('姓名不能为空,请填写');
      return;
    }
    if(this.data.mobilePhone == ''){
      Toast.fail('手机号码不能为空,请填写');
      return;
    }
    if (!myreg.test(this.data.mobilePhone)) {
      Toast.fail('请填写正确的手机号码,请重新输入')
      return;
    }
    if(this.data.managementModel == ''){
      Toast.fail('经营模式不能为空,请选择');
      return;
    }
    if(this.data.receivingType == ''){
      Toast.fail('收获类型不能为空,请选择');
      return;
    }
    if(this.data.receivingRange == ''){
      Toast.fail('收货范围不能为空,请填写');
      return;
    }
    if(this.data.receivingMethod == ''){
      Toast.fail('收货方式不能为空,请填写');
      return;
    }

    if(this.data.fileList.length == 0){
      Toast.fail('相册图片不能为空,请至少上传一张');
      return;
    }
    let params={
      type:this.data.type,
      name:this.data.username,
      receivingType:this.data.receivingType,
      wechatNumber:this.data.username,
      mobilePhone:this.data.mobilePhone,
      telephoneNumber:this.data.telephoneNumber,
      region:this.data.region,
      managementModel:this.data.managementModel,
      receivingRange:this.data.receivingRange,
      receivingMethod:this.data.receivingMethod,
      introduce:this.data.html,
      logoId:this.data.fileList[0]?this.data.fileList[0].id:null
    }
    wx.request({
      url: URL+'/wx/personalCenter/update',
      method:'POST',
      header: {
        'X-CR-Token': app.globalData.token
      },
      data: params,
      success (res) {
        console.log('res',res);
        app.globalData.hasLogin = true;
        // wx.navigateTo({
        //   url: '/pages/index/index',
        // })
        wx.switchTab({
          url: '/pages/index/index',
        })
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
  insertImage(){ //图片上传插入示例
    wx.chooseImage({
      count: 1,
      success: res => {
        console.log(res);
        wx.uploadFile({ //调用图片上传接口
          url: '/wx/file/imageUpload', 
          filePath: res.tempFilePaths[0],
          name: 'file',
          header: {
            'X-CR-Token': app.globalData.token
          },
          success: res => {
            console.log('img',res,JSON.parse(res.data).result.path);
            let imgUrl = JSON.parse(res.data).result.path;
            this.selectComponent('#hf_editor').insertSrc(imgUrl);//调用组件insertSrc方法
          }
        })
      }
    })
  }
})