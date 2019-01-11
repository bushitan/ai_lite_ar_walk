// pages/index/index.js
var ARUtils = require("../../js/ar/ARUtils.js")
var arUtils
var ApiUtils = require("../../js/ar/ApiUtils.js")
var apiUtils
var Location = require("../../js/ar/Location.js")
var LocationUtils = require("../../js/ar/LocationUtils.js")
var GP
var GROUP_MODE_ID = 0
var GROUP_MODE_KEYWORD = 1
Page({

    /**
     * 页面的初始数据
     */
    data: {
        mode: 1,//根据关键字
        groupID: 1,//群ID
        keyword: "KFC",//群关键字
    },

    /** 
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        wx.showLoading({
            title: '坐标寻找中...',
        })
        setTimeout(function () {
            wx.navigateTo({
                url: '/pages/my/my',
            })
        }, 1500)
        return

        options = {
            mode:1,
            keyword:"美食",
        }
        

        GP = this 
        arUtils = new ARUtils({ GP: this })
        apiUtils = new ApiUtils()
        
        GP.filterOptions(options)
        GP.route()

    },

    /**
     * 过滤参数，提取mode
     */
    filterOptions(options) {
        if (!options.hasOwnProperty('mode')) return //从小程序栏打开，没附带属性

        var _mode = options.mode
        if (_mode == GROUP_MODE_ID) //根据ID搜索
            GP.setData({
                mode: GROUP_MODE_ID,
                groupID: options.group_id,
            })
        else
            GP.setData({
                mode: GROUP_MODE_KEYWORD,
                keyword: options.keyword,
            })
    },

    /**
     * @method  选择数据获取模式
     */
    route(){
        if (GP.data.mode == GROUP_MODE_ID)
            GP.searchGroup()
        else
            GP.searchAPI()
    },

    /**
     * @method 搜索后台的group数组
     */
    searchGroup() {
        wx.request({
            url: 'https://www.51zfgx.com/ai/lite/search/shop/',
            data: {
                "group_id": GP.data.groupID
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

    filterGroupToAPI(shop_list){
        var _list = shop_list
        var _temp_list = []
        for (var i = 0; i < _list.length;i++){
            var _s = _list[i]
            _temp_list.push({
                'id': _s.id,
                'title': _s.name,
                'address': _s.address,
                'tel': _s.phone,
                'category': _s.category,
                // 'type': _s.type,
                'location': { lat:_s.latitude, lng:_s.longitude },
            })
        }
        return _temp_list
    },

    /**
     * @method 搜索腾讯API
     */
    searchAPI() { 
        wx.getLocation({
            type: 'gcj02',
            success(res) {
                // arUtils.search({
                //     "keyword": GP.data.keyword,
                //     "GPSLocation": { latitue: res.latitude, longitude: res.longitude }
                //     "success":function(res){

                //     }
                // })
                var _keyword = GP.data.keyword
                var _location = new Location({ 'latitude': res.latitude, 'longitude': res.longitude })
                var _location_str = _location.getString()
                apiUtils.getMarkList(_keyword, _location_str, GP.callback)

                GP.setData({
                    location: _location
                })
                // callback()
            }
        })
    },

    callback(res){
        console.log(res)
        var locationUtils = new LocationUtils()
        var _list = locationUtils.formatSearch({
            list: res.data,
            location: GP.data.location,
        })


        wx.setStorageSync("mark_list", _list)
        wx.setStorageSync("keyword", GP.data.keyword)


        setTimeout(function () {
            wx.navigateTo({
                url: '/pages/map/map',
            })
        },1500)
    },


    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})

// id
// title
// address
// tel
// category
// type
// location:{lat , lng}