// components/zdySelect/zdySelect.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    actions: {
      type: Array,
      value: []
    },
    type: {
      type: String,
      value: ''
    },
    label: {
      type: String,
      value: ''
    }
  },



  /**
   * 组件的初始数据
   */
  data: {
    show:false,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onClose() {
      this.setData({ show: false });
    },
    onSelect(event) {
      console.log(666, event.detail.name);
      this.triggerEvent("selectChoose", event.detail.name)
      // this.setData({
      //   type: event.detail.name
      // })
    },
    typeChange(event) {
      console.log('this.properties',this.properties);
      this.setData({
        show: true
      })
    },
  }
})
