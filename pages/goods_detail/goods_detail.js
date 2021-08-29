import regeneratorRuntime from '../../lib/runtime/runtime';
const { request } = require('../../request/index.js')
// import { wxRequest } from ".../../request/wxRequest.js";
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
        tradeFree:0
    },
    GoodInfo: {},
    //获取详情数据
    async getGoodInfo(goods_id) {
        const goodInfo = await request({ url: "/goods/detail", data: { goods_id } });
        console.log(goodInfo)
        this.GoodInfo = goodInfo
            //获取收藏信息
        let collect = wx.getStorageSync("collect") || [];
        let index = collect.findIndex(v => v.goods_id === this.GoodInfo.goods_id)
        this.setData({
            goodInfo: {
                goods_name: goodInfo.goods_name,
                goods_price: goodInfo.goods_price,
                goods_introduce: goodInfo.goods_introduce,
                pics: goodInfo.pics
            },
            isCollect: index !== -1 ? true : false
        })

    },
    getGoodsInfo(id){
        wxRequest('POST','/wx/supplyDemand/detail',{
            id
          }).then(res => {
              console.log(res.data.result);
              this.setData({
                goodInfo: res.data.result,
            })
            if(res.data.result.isCurrentUser == 0 || res.data.result.memberStatus == 1){
                this.setData({
                    isHy: 1,
                    tradeFree:res.data.result.tradeFree
                })
            } else {
                this.setData({
                    isHy: 0,
                    tradeFree:res.data.result.tradeFree
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
    //点击收藏
    collectHandle() {
        let collect = wx.getStorageSync("collect") || [];
        let isCollect = false
        let index = collect.findIndex(v => v.goods_id === this.GoodInfo.goods_id)
        if (index === -1) {
            collect.push(
                this.GoodInfo
            );
            isCollect = true
        } else {
            collect.splice(index, 1)
            isCollect = false
        }
        wx.setStorageSync("collect", collect)
        this.setData({ isCollect })
    },
    copy(e) {
        console.log(e.currentTarget.dataset.num)
        wx.setClipboardData({  data: e.currentTarget.dataset.num });
    },
    call(e) {
        console.log(e.currentTarget.dataset.num)
        wx.makePhoneCall({  phoneNumber: e.currentTarget.dataset.num });
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