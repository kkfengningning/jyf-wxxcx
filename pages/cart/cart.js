import areaList from './area';
import { wxRequest } from "../../request/wxRequest.js";
Page({

    /**
     * 页面的初始数据
     */
    data: {
      areaList : areaList,
      itemTitle: '地区',
      maiList:[],
      pageNum: 1,
      province:'',
      city:'',
    },
    //添加收货地址事件
    onReady: function () {
      this.feachList()
    },
    onShow: function () {
        if (typeof this.getTabBar === 'function' && this.getTabBar()) {
          this.getTabBar().setData({
            selected: 1  //这个数字是当前页面在tabBar中list数组的索引
          })
        }
      },
    //商品选择状态改变
    handleItemChange(e) {
    },
    onChange(val) {
      console.log(val,'val');
    },
    onReachBottom: function () {
      this.setData({ 
        pageNum: this.data.pageNum+1
      });
      this.feachList( 'more' );
    },
    onConfirm(val) {
      console.log(val,val.detail.values[0].name,val.detail.values[1].name);
      
      this.selectComponent('#item').toggle();
      this.setData({ 
        province:val.detail.values[0].name,
        city:val.detail.values[1].name,
        pageNum: 1
      });
      this.feachList();
    },
    onClose() {
      this.selectComponent('#item').toggle();
    },
    onPullDownRefresh: function () {
      wx.showNavigationBarLoading() //在标题栏中显示加载
      this.setData({
        pageNum: 1,
        province:'',
        city:'',
      })
      this.feachList()
    },
    feachList(more){
      console.log(122333);
      wxRequest('POST','/wx/maiList/list',{
        province:this.data.province,
        city:this.data.city,
        pageNum: this.data.pageNum
      }).then(res => {
        wx.hideNavigationBarLoading() //完成停止加载
        wx.stopPullDownRefresh() //停止下拉刷新
        this.setData({ 
          maiList:more?this.data.maiList.concat(res.data.result.mailList):res.data.result.mailList,
              wenan:res.data.result.mailList.length > 0 ?'下拉加载更多' : '暂无数据'
          });
          //请求成功
          // this.setData({ 
          //     orders_o: res.data.result.on,
          //     orders_i: res.data.result.off,
          //     Tabs:[{
          //         id: 0,
          //         name: '已发布',
          //         isActive: true,
          //         num:res.data.result.on.length
          //     }, {
          //         id: 1,
          //         name: '已下架',
          //         isActive: false,
          //         num:res.data.result.off.length
          //     }]
          // });
       })
  },
    // 全选按钮改变
    //数量改变

    //结算
    // async allPlay() {
    //     const { totalNum, address } = this.data;
    //     if (!address.userName) {
    //         await showToast('未填联系方式')
    //     } else if (totalNum === 0) {
    //         await showToast('未选择商品')
    //     } else {
    //         wx.navigateTo({
    //             url: '/pages/pay/pay',
    //         })
    //     }

    // },
    //更新购物车数据
})