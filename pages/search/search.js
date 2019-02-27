// pages/search/search.js
const API = require("../../utils/api.js");
var GP
Page({

    /**
     * 页面的初始数据
     */
    data: {
        traceList: ['IO', 'ww', 'IO', 'ww', 'IO', 'ww',],
        hotList: [],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        GP = this
        GP.onInitShopList()
    },

    onInitShopList(){
        GP.setData({
            hotList: wx.getStorageSync(API.KEY_SHOP_LIST)
        })
       
    },

    
    back(){
        wx.showModal({
            title: '暂停搜索功能',
            content: '内侧期间，可点击下部按钮，跳转到店铺',
        })
        // wx.navigateBack({
            
        // })
    },

    //跳转至店铺
    toAddress(e) {
        var latitude = e.currentTarget.dataset.latitude
        var longitude = e.currentTarget.dataset.longitude
        console.log(getCurrentPages())
        var length = getCurrentPages().length
        var pre = getCurrentPages()[length-2]
        pre.setData({
            latitude: latitude,
            longitude: longitude,
        })
        wx.navigateBack({
            
        })
    },


    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})