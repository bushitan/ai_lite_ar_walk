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
            distance: 88,
            instruction: "",
            dialog: "",
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

        //地图中心经纬度
        centerLatitude: '',
        centerLongitude:'',

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

    refreshLocation(res){
        GP.setData({
            latitude: res.latitude,
            longitude: res.longitude,
            accuracy: res.accuracy,
            speed: res.speed,
        })
        //更新目标点的距离
        GP.setData({
            focusList: navUtils.refreshFocusDis(GP.data.focusList, res.latitude, res.longitude)
        })
    },

    //设置起始位置icon
    setRouteIcon(startLat,startLng,endLat,endLng){
        GP.setData({
            markers: [
                {
                    iconPath: '../../images/map_start.png',
                    id: 0,
                    latitude: startLat,
                    longitude: startLng,
                    width: 50,
                    height: 50
                },
                {
                    iconPath: '../../images/map_end.png',
                    id: 0,
                    latitude: endLat,
                    longitude: endLng,
                    width: 50,
                    height: 50
                },
            ],
            centerLatitude: startLat,
            centerLongitude: startLng,
        })
    },
    //初始化：导航路径
    initRoute(focusLatitude, focusLongitude){
        //获取位置
        navUtils.getLocation(GP).then((res) => {
            GP.refreshLocation(res)
            //请求导航数据      
            var from_str = res.latitude + "," + res.longitude
            var to_str = GP.data.focusLatitude + "," + GP.data.focusLongitude
            //设置起始位置icon
            GP.setRouteIcon(res.latitude, res.longitude, GP.data.focusLatitude, GP.data.focusLongitude)

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
            // console.log(res.direction)
            GP.setData({
                direction: res.direction
            })
            i++
            if( i % 10 == 0){
                navUtils.getLocation().then((res) => {
                    GP.refreshLocation(res)
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
            if (GP.data.routeIndex >= GP.data.route.steps.length) { 
                GP.end()  //导航结束
            }
            else{
                GP.next()  //下一点
            }
        }
    },


    next(){
        var _index = GP.data.routeIndex + 1
        var _nextStep = GP.data.route.steps[_index]
        GP.setData({
            nextStep: navUtils.refreshNextStep(GP, _nextStep),
            routeIndex: _index,
        })
    },
    end(){
        wx.showModal({
            title: '导航结束',
            content: '到达目的地，店铺就在周边',
            success: function () {
                wx.navigateBack({})
            },
        })
        // GP.setData({
        //     mode: "end"
        // })
    },


    //按钮：打开地图
    openMap(){
        GP.setData({
            cameraHeight: "70vh",
            showMap:true,
            centerLatitude: GP.data.latitude,
            centerLongitude: GP.data.longitude,
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
        return {
            title: "AR地图导航：" + GP.data.focusList[0].name,
            path: "/pages/index/index?shop_id=" + GP.data.focusList[0].shop_id,
            imageUrl: GP.data.focusList[0].cover,
        }
    }
})