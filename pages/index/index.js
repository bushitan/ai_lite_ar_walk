
//获取应用实例
const app = getApp()
var GEO = require("../../utils/geo.js") 





Page({
    data: {
        motto: 'Hello World',
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),

        keyword:"酒店",

        markList: [
            {
                id: 1, x: 10, y: 50, name: "水浒人家", distance: 500,
                latitude: 24.4972341880, longitude: 108.6384236813, compass_value: 0
            },
            {
                id: 1, x: 10, y: 50, name: "广西民族影城", distance: 500,
                latitude: 22.8122400000, longitude: 108.3995300000, compass_value: 0
            },
            {
                id: 1, x: 10, y: 50, name: "邮政小区", distance: 500,
                latitude: 22.8194235482, longitude: 108.3917355537, compass_value: 0
            },
            {
                id: 1, x: 10, y: 50, name: "水电大厦", distance: 500,
                latitude: 22.8134306166, longitude:  108.3889245987, compass_value: 0
            },
            {
                id: 1, x: 10, y: 50, name: "泰迪咖啡(航洋店)", distance: 500,
                latitude: 22.8147953668, longitude: 108.3848476410, compass_value: 0
            },
            {
                id: 1, x: 10, y: 50, name: "桃源山庄", distance: 500,
                latitude: 22.8099692323, longitude: 108.3908343315, compass_value: 0
            },
            
        ]

    },
    //事件处理函数
    bindViewTap: function() {
        wx.navigateTo({
        url: '../logs/logs'
        })
    },
    onLoad: function () {

        // var g = GEO.distance(22.847797, 108.306804, 22.8450354800, 108.3107908500)
        // var g = GEO.distance(22.8449251703, 108.3104860783, 22.845023057725694, 108.31077419704862)

        var g = GEO.compassBetweenAngle(200,5)
        console.log(g )
 
    },

    /**
    * @method 设置
    * @for template/menu/base.wxml
    * @param
    *      {object} e 事件对象
    */
        clickOption(e) {
            console.log(e,"Option")
        },

        /**
        * @method 搜索
        * @for template/menu/base.wxml
        * @param
        *      {object} e 事件对象
        */
        clickSearch(e) {
            console.log(e, "clickSearch")
        },
        /**
        * @method 更多信息
        * @for template/map/map.wxml
        * @param
        *      {object} e 事件对象
        */
        clickMarkInfoToMore(e) {
            console.log(e, "clickMarkInfoToMore")
        },



    onShareAppMessage(){},
})
