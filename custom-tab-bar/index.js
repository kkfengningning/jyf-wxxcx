Component({
  data: {
    selected: 0,
    color: "#7A7E83",
    selectedColor: "#3cc51f",
    "list": [
      {
        "pagePath": "pages/index/index",
        "text": "首页",
        "iconPath": "/icons/home.png",
        "selectedIconPath": "/icons/home-o.png"
      },
      {
        "pagePath": "pages/category/category",
        "text": "分类",
        "iconPath": "/icons/category.png",
        "selectedIconPath": "/icons/category-o.png"
      },
      {
        "pagePath": "pages/cart/cart",
        "text": "通讯录",
        "iconPath": "/icons/cart.png",
        "selectedIconPath": "/icons/cart-o.png"
      },
      {
        "pagePath": "pages/user/user",
        "text": "我的",
        "iconPath": "/icons/my.png",
        "selectedIconPath": "/icons/my-o.png"
      }
    ]
  },
  attached() {
  },
  methods: {
    switchTab(e) {
      console.log('e',e);
      const data = e.currentTarget.dataset
      const url = data.path
      if(data.index!==0){
        return;
      }
      wx.switchTab({url})
      this.setData({
        selected: data.index
      })
    }
  }
})