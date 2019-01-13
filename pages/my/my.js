// pages/my/my.js

var ApiUtils = require("../../js/ar/ApiUtils.js")
var apiUtils = new ApiUtils()
var Location = require("../../js/ar/Location.js")
var LocationUtils = require("../../js/ar/LocationUtils.js")
var GP
Page({

    /**
     * 页面的初始数据
     */
    data: {
        list: [
            { group_id: 1, name: "木可咖啡" },
            { group_id: 2, name: "广西大学" },
            { group_id: 3, name: "广西大学（4点）" },
            { group_id: 4, name: "福彩大厦" },
            // { group_id: 4, name: "KFC" },
        ],

        // latitue:23,
        // longitude:108,
        location:{},
        keyword:"酒店",
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        GP = this

        GP.setData({
            location: new Location({ 
                'latitue': 23.258445, 
                'longitude': 107.985462 
            })
        })
        GP.initLocation()
    },

    /**
     * 不停更新gps
     */
    initLocation(){
        
        setTimeout(function () {
            wx.getLocation({
                type: 'gcj02',
                success(res) { 
                    GP.setData({ 
                        location: new Location({ 'latitue': res.latitude, 'longitude': res.longitude })
                    })
                }
            })
        }, 2000)
    },

    searchBtn() {
        wx.showLoading({
            title: '查询中...',
        })
        var _location = GP.data.location
        var _location_str = _location.getString()
        apiUtils.getMarkList("酒店", _location_str, GP.callback)

    },

    clickBtn(e) {
        var _group_id = e.currentTarget.dataset.group_id
        wx.showLoading({
            title: '查询中...',
        })
        GP.setData({
            keyword: e.currentTarget.dataset.name
        })
        wx.request({
            url: 'https://www.51zfgx.com/ai/lite/search/shop/',
            data: {
                "group_id": _group_id
            },
            success(res) {
                console.log(res.data)
                // wx.setStorageSync("mark_list",res.data)
                var _data = GP.filterGroupToAPI(res.data.shop_list)
                GP.callback({
                    data: _data
                })
            },
        })
    },

    filterGroupToAPI(shop_list) {
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
                // 'type': _s.type,
                'location': { lat: _s.latitude, lng: _s.longitude },
            })
        }
        return _temp_list
    },


    callback(res) {
        var locationUtils = new LocationUtils()
        var _list = locationUtils.formatSearch({
            list: res.data,
            location: GP.data.location,
        })
        console.log(_list)

        wx.setStorageSync("mark_list", _list)
        wx.setStorageSync("keyword", GP.data.keyword)
        //          wx.redirectTo({
        //     url: '/pages/my/my',
        // })
        setTimeout(function () {
            wx.hideLoading()
            wx.navigateTo({
                url: '/pages/map/map',
            })
        }, 1500)
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})