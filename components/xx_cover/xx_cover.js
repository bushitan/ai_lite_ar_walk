
Component({
  /**
   * 组件的属性列表
   */
    properties: {
        mode: {
            type: String,
            value: "news",
            observer: '_changeStyle',
        },
        list: {
            type: Array,
            value: [],
            // observer: '_changeList',
        },
  },

  /**
   * 组件的初始数据
   */
    data: {
        MODE_AGENDA : "agenda",
        MODE_GUEST : "guest",
        MODE_NEWS : "news",

    },

  /**
   * 组件的方法列表
   */
  methods: {

      // 改变等级
      _changeStyle(newVal, oldVal) {
            // console.log(1111,newVal, oldVal)
            // this.setData({
            //     style: newVal
            // })
      },
      click(e) {     
          this.triggerEvent('click', e.currentTarget.dataset.index);
      },

      //点击截图
      clickSnapshot(e) {
          this.triggerEvent('snapshot', e.currentTarget.dataset.index);
      },
      //点击店铺地址
      clickAddress(e) {
          this.triggerEvent('address', e.currentTarget.dataset.index);
      },
      //点击分享
      clickShare(e) {
          this.triggerEvent('share', e.currentTarget.dataset.index);
      },
  }
})
