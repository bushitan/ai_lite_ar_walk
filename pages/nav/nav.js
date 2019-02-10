// pages/map/map.js


var NavUtils = require('navUtils.js');
var navUtils = new NavUtils()

var APP = getApp()

var GP
Page({

    /**
     * 页面的初始数据
     */
    data: {
        title:"",
        mode:"nav", //导航模式

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
        var _shop_list = wx.getStorageSync("shopList" )
        
        this.setData({
            focusList: _shop_list,
            focusLatitue: _shop_list[0].latitude,
            focusLongitude: _shop_list[0].longitude,
            // nextPoint: wx.getStorageSync("nav_list").steps[0],
        })


        GP.initRoute(_shop_list.latitude, _shop_list.longitude)


        setInterval(function(){
            GP.setData({
                // direction: 0
                direction: parseInt(Math.random() * 300)
            })
        },1000)
    },

    //初始化：导航路径
    initRoute(focusLatitude, focusLongitude){
        // var from_str = res.latitude + "," + res.longitude
        // var to_str = GP.data.focusLatitue + "," + GP.data.focusLongitude
        navUtils.initLocation().then((res) => {
            GP.setData({
                latitue: res.latitude,
                longitude: res.longitude,
                accuracy: res.accuracy,
                speed: res.speed,
            })
            var from_str = res.latitude + "," + res.longitude
            var to_str = GP.data.focusLatitue + "," + GP.data.focusLongitude
            //请求具体路径
            navUtils.requestRoute(from_str, to_str).then( (route)=>{
                GP.setData({
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
                // if (isQueryRoute) {
                //     var from_str = res.latitude + "," + res.longitude
                //     var to_str = GP.data.focusLatitue + "," + GP.data.focusLongitude
                //     GP.getRoute(from_str, to_str)
                // }

                // if (

                // )
                //与下一点的距离
                var _distance = GeoFn.distance(
                    GP.data.latitue,
                    GP.data.longitude,
                    GP.data.nextStep.latitue,
                    GP.data.nextStep.longitude,
                )
                //距离小于5米
                if(_distance < 5) {
                    //是否导航结束
                    if (GP.data.routeIndex >= GP.data.route.steps.length ){
                        GP.end()
                        return
                    }
                    var _index = GP.data.routeIndex + 1
                    var _nextStep = GP.data.route.steps[_index]
                    GP.setData({
                        nextStep: navUtils.refreshNextStep(GP,_nextStep),
                        routeIndex: _index,
                    })
                }
            }
        })
    },

    //导航结束
    end(){
        GP.setData({
            mode:"end"
        })
    },

  











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