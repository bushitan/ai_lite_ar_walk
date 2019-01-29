// pages/map/map.js

var QQMapWX = require('../../utils/wexin/qqmap-wx-jssdk.min.js');
var qqmapsdk;
var KEY = "5KFBZ-OSU6F-SUPJ5-NJPMP-JYMU3-YCBZJ"
qqmapsdk = new QQMapWX({
    key: KEY,
});
var APP = getApp()

var GP
Page({

    /**
     * 页面的初始数据
     */
    data: {
        title:"",

        //罗盘、三轴陀螺仪、
        direction: 0, //罗盘方向
        accZ: 0, //手机俯仰姿势
        // mode: "nav",

        //浮动点
        pointList: [],
        focusList: [], //导航终点

        //导航模块
        route:{}, //导航信息
        nextStep: {}, //下一点的信息
        
        //地图相关
        cameraHeight:"100vh",
        showMap:false,

        //gps定位信息
        latitue: '',
        longitude: '',
        accuracy:'',
        speed:'',
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        GP = this

        console.log(APP.globalData.focusList )
        var _list = APP.globalData.focusList
        this.setData({
            focusList: _list,
            focusLatitue: _list[0].location.lat,
            focusLongitude: _list[0].location.lng,
            // nextPoint: wx.getStorageSync("nav_list").steps[0],
        })

        GP.startRender()
    },

    //开始渲染
    startRender(){
        //罗盘
        var  i = 0 
        GP.getLocation(true)
        wx.onCompassChange(function (res) {
            GP.setData({
                direction: res.direction
            })
            if( i % 70 == 0){
                GP.getLocation()
            }
            // GP.render()
        })
        //三轴陀螺仪
        wx.onAccelerometerChange(function (res) {
            GP.setData({
                accZ: res.z
            })
        })
    },

    //渲染步骤
    //TODO 手机倒下一个点10米范围内，设置下一个
    // render(){

    // },

    //获取自身定位
    getLocation(isQueryRoute) {
        wx.getLocation({
            type: 'gcj02',
            success(res) {
                GP.setData({
                    latitue: res.latitude,
                    longitude: res.longitude ,
                    accuracy: res.accuracy,
                    speed: res.speed,
                })

                //查询导航数据
                if (isQueryRoute) {
                    var from_str = res.latitude + "," + res.longitude
                    var to_str = GP.data.focusLatitue + "," + GP.data.focusLongitude
                    GP.getRoute(from_str, to_str)

                }

                // TODO 手机倒下一个点10米范围内，设置下一个
                // console.log(GP.data.GPSLocation)
            }
        })
    },

    //查询导航数据
    getRoute(from_str, to_str) {
        // var from_str = options.fromStr
        // var to_str = options.toStr
        // var callback = options.callback
        // var from_str = GP.data.location.latitude + "," + GP.data.location.longitude
        // var to_str = GP.data.focus.latitude + "," + GP.data.focus.longitude
        // 步行导航
        var opt = {
            //WebService请求地址，from为起点坐标，to为终点坐标，开发key为必填
            url: 'https://apis.map.qq.com/ws/direction/v1/walking/'
                + '?from=' + from_str
                + '&to=' + to_str
                + '&key=' + KEY,
            method: 'GET',
            dataType: 'json',
            //请求成功回调
            success: function (res) {
                console.log(res)
                var _route = res.data.result.routes[0]
                GP.setData({
                    // isNav:true,
                    route:_route,
                    nextStep: _route.steps[0],
                })
                // wx.setStorageSync("nav_list", _route)
                // GP.setData({ nextPoint: _route.steps[0]})

                // callback(_route)
            }
        };
        wx.request(opt);
    },

        // GP.setData({
        //     focus: { 
        //         latitue: options.latitude, 
        //         longitude: options.longitude 
        //     }
        // })
        // this.setData({
        //     pointList: wx.getStorageSync("point_list"),
        //     // nextPoint: wx.getStorageSync("nav_list").steps[0],
        // })
        // // console.log(wx.getStorageSync("nav_list"))
        // // console.log(wx.getStorageSync("point_list"))

        // setInterval(function(){
        //     GP.setData({
        //         direction: 0
        //         // direction: parseInt(Math.random() * 300)
        //     })
        // },1000)


        
    // },


    // startNav(e){
    //     wx.getLocation({
    //         type: 'gcj02',
    //         success(res) {
    //             GP.setData({
    //                 location: { latitue: res.latitude, longitude: res.longitude }
    //             })
    //         }
    //     })
    // },












    // getRoute(options) {
    //     // var from_str = options.fromStr
    //     // var to_str = options.toStr
    //     // var callback = options.callback
    //     var from_str = GP.data.location.latitude + "," + GP.data.location.longitude 
    //     var to_str = GP.data.focus.latitude + "," + GP.data.focus.longitude  
    //     // 步行导航
    //     var opt = {
    //         //WebService请求地址，from为起点坐标，to为终点坐标，开发key为必填
    //         url: 'https://apis.map.qq.com/ws/direction/v1/walking/'
    //             + '?from=' + from_str
    //             + '&to=' + to_str
    //             + '&key=' + KEY,
    //         method: 'GET',
    //         dataType: 'json',
    //         //请求成功回调
    //         success: function (res) {
    //             console.log(res)
    //             var _route = res.data.result.routes[0]

    //             // wx.setStorageSync("nav_list", _route)
    //             // GP.setData({ nextPoint: _route.steps[0]})
               
    //             // callback(_route)
    //         }
    //     };
    //     wx.request(opt);
    // },



    //打开地图
    openMap(){
        GP.setData({
            cameraHeight: "80vh",
            showMap:true,
        })
    },
    //关闭地图
    clickNavMapOff() {
        GP.setData({
            cameraHeight: "100vh",
            showMap: false,
        })
    },

    clickOption(){
        wx.navigateBack({
            
        })
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})