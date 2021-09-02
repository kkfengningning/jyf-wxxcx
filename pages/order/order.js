import { wxRequest } from "../../request/wxRequest.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

    /**
     * 页面的初始数据
     */
    data: {
        orders_o: [],
        orders_i: [],
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
        this.feachList();
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
    },
    xiajia(e){
        let item = e.currentTarget.dataset.item;
        wxRequest('POST','/wx/supplyDemand/onOff',{id:item.id,status:'1'}).then(res => {
            //请求成功
            console.log(res)
            this.feachList();
         })
    },
    shangjia(e){
        let item = e.currentTarget.dataset.item;
        wxRequest('POST','/wx/supplyDemand/onOff',{id:item.id,status:'0'}).then(res => {
            //请求成功
            console.log(res)
            this.feachList();
         })
    },
    feachList(){
        wxRequest('POST','/wx/supplyDemand/userSupplyDemand','').then(res => {
            //请求成功
            this.setData({ 
                orders_o: res.data.result.on,
                orders_i: res.data.result.off,
                Tabs:[{
                    id: 0,
                    name: '已发布',
                    isActive: true,
                    num:res.data.result.on.length
                }, {
                    id: 1,
                    name: '已下架',
                    isActive: false,
                    num:res.data.result.off.length
                }]
            });
         })
    },
    toDetail(e){
        let item = e.currentTarget.dataset.item;
        console.log(3311,item);
        wx.navigateTo({
            url: '/pages/goods_detail/goods_detail?goods_id='+item.id
          })
    },
    toUp(e){
        let item = e.currentTarget.dataset.item;
        console.log(3311,item);
        wx.navigateTo({
            url: '/pages/release/release?goods_id='+item.id
          })
    }
})