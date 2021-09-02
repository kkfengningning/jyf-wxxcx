import regeneratorRuntime from '../../lib/runtime/runtime';
import { wxRequest } from "../../request/wxRequest.js";
Page({

    /**
     * 页面的初始数据
     */
    data: {
        //详情数据
        goodInfo: {},
        //是否被保存
        isCollect: false,
        isHy: 0,
        tradeFree:0,
        id:''
    },
    GoodInfo: {},
    //获取详情数据
    //查询通讯录详情
    getGoodsInfo(id){
        this.setData({
            id: id,
        })
        wxRequest('POST','/wx/maiList/detail',{
            id
          }).then(res => {
              console.log(res.data.result);
              this.setData({
                goodInfo: res.data.result,
            })
            if(res.data.result.isCurrentUser == 0 || res.data.result.memberStatus == 1){
                this.setData({
                    isHy: 1,
                    tradeFree:res.data.result.mailListFree
                })
            } else {
                this.setData({
                    isHy: 0,
                    tradeFree:res.data.result.mailListFree
                })
            }
            //请求成功
            // if(res.statusCode == 200 && res.data.code == 0){
            //   that.globalData.hasLogin = true;
            //   that.globalData.token=res.data.result.token;
            //   wx.setStorageSync('token', res.data.result.token)
            //   that.globalData.userInfo=res.data.result.userInfo;
            // } else {
            //   that.globalData.token=res.data.result.token;
            // }
         })
         .catch(err => {
            //请求失败
            console.log('登录失败11！' + err)
         })
    },
    copy(e) {
        console.log(e.currentTarget.dataset.num)
        wx.setClipboardData({  data: e.currentTarget.dataset.num });
    },
    call(e) {
        console.log(e.currentTarget.dataset.num)
        wx.makePhoneCall({  phoneNumber: e.currentTarget.dataset.num });
    },
    mfLook() {
        let that = this;
        wxRequest('POST','/wx/maiList/concat',{
            id:this.data.id
          }).then(res => {
            let goodInfo = that.data.goodInfo;
            goodInfo.concat = res.data.result;
            that.setData({
                isHy: 1,
                goodInfo,
            })
         })
         .catch(err => {
            //请求失败
            console.log('登录失败11！' + err)
         })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onShow: function(options) {
        let pages = getCurrentPages();
        let goods_id = pages[pages.length - 1].options.goods_id
        // this.getGoodInfo(goods_id)
        this.getGoodsInfo(goods_id*1);
    }
})