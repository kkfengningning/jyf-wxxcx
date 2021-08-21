// 0 引入 用来发送请求的 方法 一定要把路径补全
import { request } from "../../request/index.js";
Page({
    data: {
        // 轮播图数组
        swiperList: [],
        // 导航 数组
        catesList: [],
        // 楼层数据
        floorList: [],
        //分类数据
        catesList: []
    },
    // 页面开始加载 就会触发
    onLoad: function(options) {
        this.getSwiperList();
        this.getCateList();
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
        request({ url: "/home/swiperdata" })
            .then(result => {
                result.forEach((v, i) => {
                    console.log(v.navigator_url);
                    result[i].navigator_url = v.navigator_url.replace('main', 'goods_detail')
                })
                this.setData({
                    swiperList: result.concat(result)
                })
            })
    },
    // 获取 分类导航数据
    getCateList() {
        wx.login({
            success (res) {
              if (res.code) {
                  console.log('login',res);
                //发起网络请求
                wx.request({
                  url: 'http://192.168.0.118:8080/wx/auth/loginByWechat',
                  method:'POST',
                  data: {
                    code: res.code,
                  }
                })
              } else {
                console.log('登录失败！' + res.errMsg)
              }
            }
          })
        request({ url: "/home/catitems" })
            .then(result => {
               let newResult = result;
               newResult.push(result[0])
                this.setData({
                    catesList: newResult.concat(newResult)
                })
            })
    },
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