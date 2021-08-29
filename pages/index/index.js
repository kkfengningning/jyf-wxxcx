// 0 引入 用来发送请求的 方法 一定要把路径补全
import { request } from "../../request/index.js";
import { wxRequest } from "../../request/wxRequest.js";
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';
Page({
    data: {
        // 轮播图数组
        swiperList: [],
        // 导航 数组
        catesList: [],
        // 楼层数据
        floorList: [],
        //分类数据
        catesList: [],
        show:false,
        goodsList:[]
    },
    // 页面开始加载 就会触发
    onLoad: function(options) {
        this.getSwiperList();
        // this.getCateList();
        this.getFloorList();
    },
    // 获取 分类导航数据
    // getCateList() {
    //     request({ url: "/home/catitems" })
    //         .then(result => {
    //             // result.push(resul[0]);
    //             this.setData({
    //                 catesList:  result.concat(result)
    //             })
    //         })
    // },
    // 获取轮播图数据
    getSwiperList() {
            wxRequest('POST','/wx/home/info',).then(res => {
                //请求成功
                if(res.statusCode == 200 && res.data.code == 0){
                this.setData({
                    swiperList: res.data.result.rotationList,
                    catesList: res.data.result.classifyList
                })
                //   that.globalData.hasLogin = true;
                //   that.globalData.token=res.data.result.token;
                //   that.globalData.userInfo=res.data.result.userInfo;
                } else {
                //   that.globalData.token=res.data.result.token;
                }
             })
             .catch(err => {
                //请求失败
                console.log('登录失败！' + err.errMsg)
             })
             wxRequest('POST','/wx/home/recommendGood',).then(res => {
                //请求成功
                this.setData({
                    goodsList: res.data.result.recommendGoods,
                })
             })
             .catch(err => {
                //请求失败
                console.log('登录失败！' + err.errMsg)
             })
    },
    onShow: function () {
        if (typeof this.getTabBar === 'function' && this.getTabBar()) {
          this.getTabBar().setData({
            selected: 0  //这个数字是当前页面在tabBar中list数组的索引
          })
        }
      },
    // 获取 分类导航数据
    // getCateList() {
    //     request({ url: "/home/catitems" })
    //         .then(result => {
    //            let newResult = result;
    //            newResult.push(result[0])
    //             this.setData({
    //                 catesList: newResult.concat(newResult)
    //             })
    //         })
    // },
    // 获取 楼层数据
    getFloorList() {
        request({ url: "/home/floordata" })
            .then(result => {
                this.setData({
                    floorList: result
                })
            })
    },
})