import areaList from './area';
Page({

    /**
     * 页面的初始数据
     */
    data: {
      areaList : areaList,
      itemTitle: '地区'
    },
    onShow() {
        //收货地址接收
    },
    //添加收货地址事件
    onShow: function () {
        if (typeof this.getTabBar === 'function' && this.getTabBar()) {
          this.getTabBar().setData({
            selected: 2  //这个数字是当前页面在tabBar中list数组的索引
          })
        }
      },
    //商品选择状态改变
    handleItemChange(e) {
    },
    onChange(val) {
      console.log(val,'val');
    },
    onConfirm(val) {
      console.log(val,'val');
      this.selectComponent('#item').toggle();
    },
    onClose() {
      this.selectComponent('#item').toggle();
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