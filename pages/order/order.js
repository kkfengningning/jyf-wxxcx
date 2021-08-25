import { request } from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

    /**
     * 页面的初始数据
     */
    data: {
        orders_o: [{
            "order_number": "HMDD20190802000000000428",
            "order_price": 11,
            "create_time": 1564731518
        }, {
            "order_number": "HMDD20190802000000000428",
            "order_price": 111,
            "create_time": 1564731518
        }, {
            "order_number": "HMDD20190802000000000428",
            "order_price": 1111,
            "create_time": 1564731518
        }, {
            "order_number": "HMDD20190802000000000428",
            "order_price": 1111,
            "create_time": 1564731518
        }],
        orders_i: [{
            "order_number": "HMDD20190802000000000428",
            "order_price": 22,
            "create_time": 1564731518
        }, {
            "order_number": "HMDD20190802000000000428",
            "order_price": 2222,
            "create_time": 1564731518
        }, {
            "order_number": "HMDD20190802000000000428",
            "order_price": 2222,
            "create_time": 1564731518
        }, {
            "order_number": "HMDD20190802000000000428",
            "order_price": 2222,
            "create_time": 1564731518
        }],
        //Tabs数据
        Tabs: [{
            id: 0,
            name: '已发布',
            isActive: true,
            num:11
        }, {
            id: 1,
            name: '已下架',
            isActive: false,
            num:22
        }]
    },
    onShow(options) {
        //判断是否登陆
    },
    //获取订单方法
    //切换Tab栏
    tabsItemChange(e) {
        const id = e.detail.id;
        const Tabs = this.data.Tabs;
        Tabs.forEach((v, i) => i === id ? v.isActive = true : v.isActive = false)
        this.setData({
            Tabs
        })
    }
})