// pages/store/store.js
var WxParse = require('../../utils/wxParse/wxParse.js');

var GP
var APP = getApp()
const API = require("../../utils/api.js");

Page({

    /**
     * 页面的初始数据
     */
    data: {
        isPrepare:false,
        focusList:[], //导航结束点
        content: "../../images/coffee_content.jpg",
        shopID:1,
        shop:{},

        recordList: [
            {
                summary: "做了个小包包",
                snapshot: "../../images/group1.jpg",
                record_id: 1,
                shop_id: 1,
                start_time: "2019-02-25 08:22",
            },
            {
                summary: "不上传图片，纯粹打个卡",
                snapshot: "", //../../images/group1.jpg
                record_id: 1,
                shop_id: "",
                start_time: "2019-02-25 08:22",
            },
            {
                summary: "喝了杯小咖啡",
                snapshot: "../../images/group2.jpg", //
                record_id: 1,
                shop_id: "",
                start_time: "2019-02-25 08:22",
            },
        ],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

        GP = this

        var shop_id = options.shop_id //商店的id
        GP.setData({
            shopID: shop_id || 1
        })
        GP.getContent()
    },

    getContent(){
        return API.Request({
            url: API.URL_SHOP_GET,
            data: { shop_id:GP.data.shopID},
            success: function (res) {

                var that = this;
                WxParse.wxParse('article', 'html', res.data.shop.content, GP, 0);
                
                GP.setData({
                    isPrepare: true,
                    shop: res.data.shop,
                })
            },
        })
    },




    toNav(){
        if (GP.data.isPrepare) {
            // var options = "?name=" + GP.data.name +
            //     "&latitude=" + GP.data.latitude +
            //     "&longitude=" + GP.data.longitude    
            wx.setStorageSync('shopList', [GP.data.shop])            
            wx.navigateTo({
                url: '/pages/nav/nav',
            })
        }
        else
            wx.showModal({
                title: '请稍后重试',
                content: 'AR导航准备中',
            })

    },

    getGroup() {
        wx.request({
            url: 'https://www.51zfgx.com/ai/lite/search/shop/',
            data: {
                "group_id": 1
            },
            success(res) {
                console.log(res.data)
                var _shop_obj = filterGroupToAPI(res.data.shop_list)
                APP.globalData.focusList = _shop_obj
                wx.setStorageSync("focusList", _shop_obj)
                GP.setData({
                    isPrepare:true,
                    focusList: _shop_obj,
                    content:"../../images/coffee_content.jpg",
                })
            },
        })

        function filterGroupToAPI(shop_list) {
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


    //跳到上传打卡图片
    toCheck(e) {
        var style = e.currentTarget.dataset.style
        var sourceType = ['camera']
        if (style == "photo") sourceType = ['album']
        wx.chooseImage({
            count: 1,
            sourceType: sourceType,
            success: function (res) {
                wx.navigateTo({
                    url: '/pages/check_upload/check_upload?path=' + res.tempFilePaths[0],
                })
            }
        })

    },


    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
        return {
            title:"AR地图导航：" + GP.data.shop.name,
            path: "/pages/geo/geo?shop_id=" + GP.data.shop.shop_id,
            imageUrl: GP.data.shop.cover,
        }
    }
})