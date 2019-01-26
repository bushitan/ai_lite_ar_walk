// pages/map/map.js

var QQMapWX = require('../../utils/wexin/qqmap-wx-jssdk.min.js');
var qqmapsdk;
var KEY = "5KFBZ-OSU6F-SUPJ5-NJPMP-JYMU3-YCBZJ"
qqmapsdk = new QQMapWX({
    key: KEY,
});


var GP
Page({

    /**
     * 页面的初始数据
     */
    data: {
        title:"",
        pointList: [],
        direction: 0, //罗盘方向
        accZ: 0, //手机俯仰姿势
        mode: "mark",
        focusList:[], //导航终点
        nextPoint:0,

        cameraHeight:"100vh",
        showMap:false,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        GP = this
        GP.setData({
            focus: { 
                latitue: options.latitude, 
                longitude: options.longitude 
            }
        })
        this.setData({
            pointList: wx.getStorageSync("point_list"),
            // nextPoint: wx.getStorageSync("nav_list").steps[0],
        })
        // console.log(wx.getStorageSync("nav_list"))
        // console.log(wx.getStorageSync("point_list"))

        setInterval(function(){
            GP.setData({
                direction: 0
                // direction: parseInt(Math.random() * 300)
            })
        },1000)
        GP.getGroup()
        // GP.startNav()
    },

    getGroup(){
        wx.request({
            url: 'https://www.51zfgx.com/ai/lite/search/shop/',
            data: {
                "group_id": 1
            },
            success(res) {
                console.log(res.data)
                GP.setData({
                    pointList: filterGroupToAPI(res.data.shop_list),
                    focusList: filterGroupToAPI(res.data.shop_list),
                })
            },
        })

        function filterGroupToAPI(shop_list){
            var _list = shop_list
            var _temp_list = []
            for (var i = 0; i < _list.length; i++) {
                var _s = _list[i]
                _temp_list.push({
                    'id': _s.id,
                    'title': _s.name,
                    'address': _s.address,
                    'tel': _s.phone,
                    'category': _s.category,
                    'location': { lat: _s.latitude, lng: _s.longitude },
                })
            }
            return _temp_list
        }
    },

    startNav(e){
        wx.getLocation({
            type: 'gcj02',
            success(res) {
                GP.setData({
                    location: { latitue: res.latitude, longitude: res.longitude }
                })
            }
        })
    },

    getRoute(options) {
        // var from_str = options.fromStr
        // var to_str = options.toStr
        // var callback = options.callback
        var from_str = GP.data.location.latitude + "," + GP.data.location.longitude 
        var to_str = GP.data.focus.latitude + "," + GP.data.focus.longitude  
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

                // wx.setStorageSync("nav_list", _route)
                // GP.setData({ nextPoint: _route.steps[0]})
               
                // callback(_route)
            }
        };
        wx.request(opt);
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