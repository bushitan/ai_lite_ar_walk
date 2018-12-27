// pages/test/test.js
var Location = require("../../utils/map/Location.js")
var Line = require("../../utils/map/Line.js")
var Angle = require("../../utils/map/Angle.js")
var LocationUtils = require("../../utils/map/LocationUtils.js")
var CompassUtils = require("../../utils/map/CompassUtils.js")
var HeroUtils = require("../../utils/map/HeroUtils.js")
var NavUtils = require("../../utils/map/NavUtils.js")
var Route = require("../../utils/map/Route.js") 

var ARUtils = require("../../utils/map/ARUtils.js")
var ar_utils

var route
var Storage = require("../../utils/storage.js") 
Page({

    /**
     * 页面的初始数据
     */
    data: {
        GPSLocation: { latitue: 23.1290800000, longitude: 113.2643600000 }
    },
    search(e){
        console.log(e.currentTarget.dataset.key)
        var _keyword = e.currentTarget.dataset.key
        wx.setStorageSync(Storage.MAP_KEYWORD, _keyword)
        wx.navigateBack({
            
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {


        ar_utils = new  ARUtils({GP:this})
        // console.log(ar_utils.getName())
        
        // return 

        // ARUtils.render(90, _acc_z)

        // var routes = wx.getStorageSync("routes")

        // // console.log(NavUtils.s())
        
        // NavUtils.initRoutes(routes)
        // // console.log(NavUtils.s())
        // NavUtils.renderRoutes(90, 0.45, Location.create(22.8445090000, 108.3101860000))
        
        // var a = Location.create(22.8445090000, 108.3101860000) //广西电影制片厂
        // var b = Location.create(22.8441836241, 108.311709165) //歌迷时代
        // var c = LocationUtils.distance(a, b)
        // var d = LocationUtils.angleDirection(a, b)
        
        // console.log(d)

        // var lineA = Line.create(600, 60)
        // var lineB = Line.create(100, 80)
        // var l = CompassUtils.includedAngle(lineA, lineB)
        // console.log(CompassUtils.includedAngle(lineA, lineB))
        // console.log(CompassUtils.includedAngle(lineB, lineA))

        // console.log(CompassUtils.checkReverse( lineA , 0.5))
    },
    

    next(){
        route.next()
        console.log(
            route.getCurrentStep())
    },


    // route = new Route({
    //     route: wx.getStorageSync("routes")
    // })
    //     // wx.getStorageSync("routes")
    //     // console.log(route.getCurrentStep())
    //     var _gps = this.data.GPSLocation
    //     var _d = 50
    //     var _acc_z = 0.5

    //     var _current_step = route.getCurrentStep()
    //     var _step_location = _current_step.location
    //     var _info = {
    //     distance: LocationUtils.getDistanceAB(_gps, _step_location),
    //     instruction: _current_step.instruction,
    //     dialog: _current_step.dir_desc,
    // }
    //     var _direction = LocationUtils.getDirection(_d, _gps, _step_location)
    //     var _icon_height = route.getDerIconHeight({ acc_z: _acc_z })
    //     var _circle_list = route.getImageList({ direction: _direction, acc_z: _acc_z })
        
    //     var _nav = {
    //     info: _info,
    //     currentStep: _current_step,
    //     iconHeight: _icon_height,
    //     circleList: _circle_list,
    // }
    //     console.log(_nav)









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