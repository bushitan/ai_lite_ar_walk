// pages/map/map.js

var ARUtils = require("../../js/ar/ARUtils.js")
var arUtils
var GP
Page({

    /**
     * 页面的初始数据
     */
    data: {
        //基础数据
        GPSFrameFre: 70, //获取GPS坐标频率(按罗盘转动次数)
        GPSAccuray: 30, //GPS的精度
        GPSSpeed: 5,//移动速度
        GPSLocation: { latitue: 23.1290800000, longitude: 113.2643600000 },

        keyword:"酒店",
        isSearch:true,
        pointList:[],
        direction:0, //罗盘方向
        accZ:0, //手机俯仰姿势

        focusList:[{
            id: 14573289671493206044,                
            title:'广州逸贤居独栋别墅',		
            address: '广东省广州市越秀区温泉西路二巷13号',
            tel: 13926116396,		
            category:'酒店宾馆: 经济型酒店',		
            type	: 0,	
            latitude	: 23.12908,		
            longitude	: 113.264359,
            distance: 0,   
            compass_direction:10,
        }],

        //导航部分
        navInfo:{
            distance: "80",
            instruction: "这是路口",
            dialog: "100向右拐",
        },

        mode:"mark",
        polyline:[],// 导航路径


        groupMode: 1,//根据关键字
        groupID: 1,//群ID
        groupKeyword: "KFC",//默认搜索关键字
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        GP = this
        console.log(options.mode,options.group_id)
        arUtils = new ARUtils({ GP:this })

        GP.setData({
            pointList: wx.getStorageSync("mark_list"),
            keyword: wx.getStorageSync("keyword"),
        })        
        

        // setInterval(function(){
        //     GP.setData({
        //         direction: parseInt(Math.random() * 300)
        //         // direction: 20
        //     })
        //     arUtils.renderRoute()
        // },1000)

        GP.turnOn()
        
    },



    // sea


    /**
     * 初始化工具
     */
    onInit() {
        if (GP.data.isSearch) {
            GP.setData({
                isSearch: false
            })
            arUtils.search({
                "keyword": GP.data.keyword,
                "GPSLocation": GP.data.GPSLocation
            })
        }

    },




    onRequest(){
        wx.request({
            url: 'https://www.51zfgx.com/ai/lite/search/shop/',
            data:{
                "group_id":2
            },
            success(res){
                console.log(res)
            },
        })
    },
    turnOn(){
        wx.onCompassChange(function (res) {
            GP.setData({
                direction:res.direction
            })
            arUtils.renderRoute()
        })

        wx.onAccelerometerChange(function (res) {
            GP.setData({
                accZ: res.z
            })
        })
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        
        this.getLocation()

        // this.onInit() //测试类
    },

    /**
     * 更新经纬度
     */
    getLocation(){
        wx.getLocation({
            type: 'gcj02',
            success(res) {
                GP.setData({
                    GPSLocation: { latitue: res.latitude, longitude: res.longitude} ,
                    GPSAccuracy: res.accuracy,
                    GPSSpeed: res.speed,
                })

                console.log(GP.data.GPSLocation)
                //TODO 进入 
                // arUtils.checkNav()
            }
        })
    },



    startNav(e){
        console.log("id",e.detail)
        var _mark_id = e.detail
        arUtils.setNavRoute({markID:_mark_id})
        
    },


    closeNav(e) {
        console.log("id", e.detail)
        var _mark_id = e.detail
        arUtils.closeRoute()

    },
    clickOption(){
        // wx.redirectTo({
        //     url: '/pages/my/my',
        // })
        wx.navigateBack({
            
        })
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