// plugin/pages/test.js

// var Loaction = require("../../js/ar/Location.js")
// var LocationUtils = require("../../js/ar/LocationUtils.js")
// var StageUtils = require("../../js/stage/StageUtils.js")
// var Sprite = require("../../js/stage/Sprite.js")
// var ARUtils = require("../../js/ar/ARUtils.js")
Page({

    /**
     * 页面的初始数据
     */
    data: {
        markers: [{
            iconPath: '/resources/others.png',
            id: 0,
            latitude: 23.099994,
            longitude: 113.324520,
            width: 50,
            height: 50
        }],
        polyline: [{
            points: [{
                longitude: 113.3245211,
                latitude: 23.10229
            }, {
                longitude: 113.324520,
                latitude: 23.21229
            }],
            color: '#FF0000DD',
            width: 2,
            dottedLine: true
        }],

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var location = new LocationUtils()
        var a = location.format({
            list: wx.getStorageSync("mark_list"),
            location: { latitue: 23.1590800000, longitude: 113.2443600000 }
        })
        console.log(a)
    },









     // // var loa_obj =
        // var locA = new Loaction({ latitue: 23.1290800000, longitude: 113.2643600000 })
        // var locB = new Loaction({ latitue: 23.1220800000, longitude: 113.2673600000 })

        // var locationUtils = new LocationUtils()
        // var _angle = locationUtils.getCompassDirectionSelfToFocus({
        //     locationSelf: locA,
        //     locationFocus: locB
        // })
        // console.log("in test.js", _angle)

        // var myAngle = locationUtils.getAngleSelfToFocus({
        //     direction:60,
        //     locationSelf: locA,
        //     locationFocus: locB

        // })

        // console.log(myAngle)


        // var filter = new StageUtils()


        // var sprite = new Sprite()
        // console.log(sprite.x)









    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})