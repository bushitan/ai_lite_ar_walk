//index.js
//获取应用实例
const app = getApp()
var GEO = require("../../utils/geo.js") 

Page({
    data: {
        motto: 'Hello World',
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),

        markList:[
        {
            id: 1, x: 10, y: 50, name: "水浒人家", distance: 500,
            latitude: 24.4972341880, longitude: 108.6384236813, compass_value: 0
        },]

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
    getUserInfo: function(e) {
        console.log(e)
        app.globalData.userInfo = e.detail.userInfo
        this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
        })
    },
    onShareAppMessage(){},
})
