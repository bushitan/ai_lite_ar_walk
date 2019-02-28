// components/xx_cover_news/xx_cover_news.js
Component({
  /**
   * 组件的属性列表
   */
    properties: {
        list: {
            type: Array,
            value: [
                {
                    summary: "做了个小包包",
                    snapshot: "../../images/group1.jpg",
                    record_id: 1,
                    shop_id: 1,
                    start_time: "2019-02-25 08:22",
                },
                {
                    summary: "不上传图片，纯粹打个卡",
                    snapshot: "", //../../images/group1.jpg
                    record_id: 1,
                    shop_id: "",
                    start_time: "2019-02-25 08:22",
                },
                {
                    summary: "喝了杯小咖啡",
                    snapshot: "../../images/group2.jpg", //
                    record_id: 1,
                    shop_id: "",
                    start_time: "2019-02-25 08:22",
                },
            ]
        },
        color: {
            type: String,
            value: "#000",
        }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
      // 改变
    _change(newVal, oldVal) {
    },

  }
})
