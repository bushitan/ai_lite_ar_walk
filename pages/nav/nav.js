// pages/map/map.js
var GeoFn = require('../../js/geo/geoFn.js');
var NavUtils = require('navUtils.js');
var navUtils = new NavUtils()
var APP = getApp()
var GP
var MODE_NAV="nav",MODE_MARK="mark"
Page({

    /**
     * 页面的初始数据
     */
    data: {
        title:"",
        mode: MODE_NAV, //导航模式

        //罗盘、三轴陀螺仪、
        direction: 0, //罗盘方向
        accZ: 1, //手机俯仰姿势
        // mode: "nav",

        //浮动点
        pointList: [],
        focusList: [], //导航终点

        //导航模块
        route:{}, //导航信息
        nextStep: {
            distance: 80,
            instruction: "个人号突然好",
            dialog: "4728937893dhuisahdsoaih 萨达撒的",
        },  //下一点的信息
        routeIndex:0,
        
        //地图相关
        cameraHeight:"100vh",
        showMap:false,

        //gps定位信息
        latitude: '',
        longitude: '',
        accuracy:'',
        speed:'',

        latitude: '',
        longitude:'',

        polyline:[], //导航路线
        markers:[],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        GP = this

        console.log(APP.globalData.focusList )
        var _shop_list = wx.getStorageSync("shopList" )
        
        this.setData({
            focusList: _shop_list,
            focusLatitude: _shop_list[0].latitude,
            focusLongitude: _shop_list[0].longitude,
            // nextPoint: wx.getStorageSync("nav_list").steps[0],
        })

        GP.initRoute(_shop_list.latitude, _shop_list.longitude)



        // setInterval(function(){
        //     GP.setData({
        //         // direction: 0
        //         direction: parseInt(Math.random() * 300)
        //     })
        // },1000)
    },


    //初始化：导航路径
    initRoute(focusLatitude, focusLongitude){
        navUtils.getLocation().then((res) => {
            this.setData({
                markers: [{ //标记点
                    iconPath: '../../images/map_hero.png',
                    id: 0,
                    latitude: 22.8365877155,
                    longitude: 108.2939911945,
                    width: 50,
                    height: 50
                }]
            })
            GP.setData({
                latitude: res.latitude,
                longitude: res.longitude,
                accuracy: res.accuracy,
                speed: res.speed,
            })
            var from_str = res.latitude + "," + res.longitude
            var to_str = GP.data.focusLatitude + "," + GP.data.focusLongitude
            //请求具体路径
            navUtils.requestRoute(from_str, to_str).then( (route)=>{

                var polyline = route.polyline
                var points = []
                for (var i = 0; i < polyline.length;i=i + 2 ){
                    points.push({
                        latitude: polyline[i],
                        longitude: polyline[i+1],
                    })
                }
                var polyline = [{
                    points: points,
                    color: '#FF0000DD',
                    width: 2,
                    dottedLine: true
                }]
                // route.polyline = polyline

                GP.setData({
                    polyline: polyline,
                    route: route,
                    nextStep: navUtils.refreshNextStep(GP,route.steps[0]),
                    routeIndex: 0,
                })
                GP.startRender()
            })
        })
    },

    //开始渲染
    startRender(){
        //罗盘
        var  i = 0 
        // GP.getLocation(true)
        wx.onCompassChange(function (res) {
            console.log(res.direction)
            GP.setData({
                direction: res.direction
            })
            if( i % 70 == 0){
                navUtils.getLocation().then((res) => {
                    
                  
                    GP.isNext()
                })
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

    //判断：是否到导航下一点
    isNext(){
        const RANGE = 5  //5米的范围
        //与下一点的距离
        var _distance = GeoFn.distance(
            GP.data.latitude,
            GP.data.longitude,
            GP.data.nextStep.latitude,
            GP.data.nextStep.longitude,
        )
        //距离小于5米
        if (_distance < RANGE) {
            //是否导航结束
            if (GP.data.routeIndex >= GP.data.route.steps.length) {
                GP.setData({
                    mode: "end"
                })
                return
            }
            else{
                var _index = GP.data.routeIndex + 1
                var _nextStep = GP.data.route.steps[_index]
                GP.setData({
                    nextStep: navUtils.refreshNextStep(GP, _nextStep),
                    routeIndex: _index,
                })
            }
        }
    },

    //按钮：打开地图
    openMap(){
        GP.setData({
            cameraHeight: "80vh",
            showMap:true,
        })
    },
    //按钮：关闭地图
    clickNavMapOff() {
        GP.setData({
            cameraHeight: "100vh",
            showMap: false,
        })
    },

    //按钮：返回上一页
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