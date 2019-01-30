// pages/store/store.js

var QQMapWX = require('../../utils/wexin/qqmap-wx-jssdk.min.js');
var qqmapsdk;
var KEY = "5KFBZ-OSU6F-SUPJ5-NJPMP-JYMU3-YCBZJ"
qqmapsdk = new QQMapWX({
    key: KEY,
});
var GP
var APP = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        isPrepare:false,
        focusList:[], //导航结束点
        content: "../../images/coffee_content.jpg",
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

        GP = this
        GP.getGroup()
    },
    toNav(){
        if (GP.data.isPrepare)
            wx.navigateTo({
                url: '/pages/nav/nav',
            })
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


    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})