// pages/registered/registered.js
import { wxRequest } from "../../request/wxRequest.js";
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type:'',
    value: '',
    minOrderQuantity:'',
    price:'',
    phone: '',
    concatName: '',
    show:false,
    jymsshow:false,
    shfwshow:false,
    showType:false,
    concatAddress:'',
    title:'',
    receivingSellRange:'',
    receivingMethod:'',
    receivingSellType:'',
    html: '',
    telephone: '',
    classify:'',
    wechatNumber: '',
    managementModel:'',
    fileList: [],
    customItem: '全部',
    classifyActions:[],
    actions: [
      {
        name: '供应',
      },
      {
        name: '求购',
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
    wxRequest('POST','/wx/supplyDemand/classifies','').then(res => {
      //请求成功
      console.log(res)
      let arr= [];
      for(let i=0;i<res.data.result.length;i++){
        arr.push({
          name:res.data.result[i]
        })
      }
      this.setData({ classifyActions: arr });
   })
   .catch(err => {
      //请求失败
      console.log('登录失败！' + res.errMsg)
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
  onflClose() {
    this.setData({ showType: false });
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
  deletRead(index){
    console.log('index',index.detail.index,this.data.fileList);
     let arr = this.data.fileList;
     arr.splice(index.detail.index,1);
     console.log(arr)
    this.setData({ fileList : arr});
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
        fileList.push({ ...file, url: JSON.parse(res.data).result });
        that.setData({ fileList });
      },
    });
  },
  onshfwSelect(event) {
    console.log(event.detail);
    this.setData({
      receivingSellRange: event.detail.name
    })
  },
  onshfsSelect(event) {
    console.log(event.detail);
    this.setData({
      receivingMethod: event.detail.name
    })
  },
  onSelect(event) {
    this.setData({
      type: event.detail.name
    })
  },
  onSelectClassify(val) {
    console.log(123,val);
    this.setData({
      classify: val.detail
    })
  },
  typeChange(event) {
    this.setData({
      show: true
    })
  },
  typeflChange(event) {
    this.setData({
      showType: true
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
    console.log('name',this.data.fileList);
    let images = [];
    for (let i=0;i<this.data.fileList.length;i++){
      images.push(this.data.fileList[i].url.id);
    }
    let params={
      title:this.data.title,
      type:this.data.type,
      minOrderQuantity:this.data.minOrderQuantity,
      classify:this.data.classify,
      price:this.data.price,
      receivingSellType:this.data.receivingSellType, // 收获类型
      phone:this.data.phone,
      images,
      concat:{
        concatName:this.data.concatName,
        telephone:this.data.telephone,
        phone:this.data.phone,
        wechatNumber:this.data.phone,
        concatAddress:this.data.concatAddress,
      },
      province:this.data.region[0],
      city:this.data.region[1],
      // managementModel:this.data.managementModel,
      receivingSellRange:this.data.receivingSellRange,
      // receivingMethod:this.data.receivingMethod,
      detail:this.data.html,
      logoId:this.data.fileList[0]?this.data.fileList[0].url:null
    }
    wxRequest('POST','/wx/supplyDemand/add',params).then(res => {
      //请求成功
      wx.switchTab({
        url: '/pages/user/user',
      })
    })
    .catch(err => {
        //请求失败
        console.log('登录失败！' + res.errMsg)
    })
    // wx.request({
    //   url: 'http://192.168.0.118:8080/wx/user/update',
    //   method:'POST',
    //   header: {
    //     'X-CR-Token': app.globalData.token
    //   },
    //   data: params,
    //   success (res) {
    //     console.log('res',res);
    //     app.globalData.hasLogin = true;
    //     wx.navigateTo({
    //       url: '/pages/index/index',
    //     })
    //   }
    // })
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