// pages/index/index.js
var ARUtils = require("../../js/ar/ARUtils.js")
var arUtils
var ApiUtils = require("ApiUtils.js")
var apiUtils
var Location = require("Location.js")

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
                var _location = new Location({ 'latitue': res.latitude, 'longitude': res.longitude })
                var _location_str = _location.getString()
                apiUtils.getMarkList(_keyword, _location_str , this._searchCallback)
                callback()
            }
        })

    },

    callback(){

    },


    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})