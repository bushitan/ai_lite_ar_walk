// pages/check/check.js
const API = require("../../utils/api.js");
var APP = getApp()
var GP 
Page({

    /**
     * 页面的初始数据
     */
    data: {
        latitude: '22.81077',
        longitude: '108.340187',
        isShowCallout:false,
        currentShop:{},
        shopList: [],
        markers: [],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        GP = this
        GP.getTraceList()
    },
    
    getTraceList() {
        return API.Request({
            url: API.URL_SHOP_LIST_SEARCH,
            success: function (res) {
                GP.setData({
                    shopList: res.data.shop_list,
                    markers: GP.initMarker(res.data.shop_list),
                })

                // GP.setData({
                //     currentShop: GP.getMarkerInfo(6)
                // })
            },
        })
    },


    initMarker(shopList) {
        var shop_list = shopList
        var list = []
        for (var i = 0; i < shop_list.length; i++) {
            var shop = shop_list[i]
            list.push({
                id: shop.shop_id,
                latitude: shop.latitude,
                longitude: shop.longitude,
                iconPath: "../../images/map_coffee.png",
                // iconPath: "../../images/1.gif",
                width: 40,
                height: 40,
                callout: {
                    content: shop.title,
                    fontSize: 14,
                    color: '#ffffff',
                    bgColor: '#000000',
                    padding: 8,
                    borderRadius: 4,
                    boxShadow: '4px 8px 16px 0 rgba(0)',
                    // display:"ALWAYS",
                },
                label: {
                    content: shop.name,
                    anchorX: 0,
                    anchorY: 0,
                    fontSize: 14,
                    color: '#888',
                    bgColor: '#fff',
                    padding: 8,
                    borderRadius: 4,
                    boxShadow: '4px 8px 16px 0 rgba(0)'
                },
            })
        }

        return list
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})