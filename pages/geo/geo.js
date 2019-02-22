// pages/geo/geo.js
const API = require("../../utils/api.js");
var APP =getApp()
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
        APP.login()
    },

    onInit(){
        wx.setStorageSync(API.KEY_USER_ID, 3)
        GP.getTraceList()
    },

    getTraceList() {
        return API.Request({
            url: API.URL_SHOP_LIST_SEARCH,
            success: function (res) {
                GP.setData({
                    shopList: res.data.shop_list,
                    markers:GP.initMarker( res.data.shop_list),
                })

                // GP.setData({
                //     currentShop: GP.getMarkerInfo(6)
                // })
            },
        })
    },

    initMarker(shopList){
        var shop_list = shopList
        var list = []
        for (var i = 0; i < shop_list.length; i++){
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
                    anchorY:0,
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

    //点击冒泡
    clickMarker(e){
        console.log(e.markerId)
        console.log()
        GP.setData({
            currentShop:GP.getMarkerInfo(e.markerId),
            isShowCallout:true,
        })
     
    },

    //根据id，筛查shop
    getMarkerInfo(id){
        var shop_list = GP.data.shopList
        for(var i = 0; i<shop_list.length;i++)
        if (shop_list[i].shop_id == id)
            return shop_list[i]
        //结束，不存在
        wx.showModal({
            title: '此标记点不存在',
        })
    },
    
    //跳转到AI
    toAI(){
        wx.navigateTo({
            url: '/pages/ai/ai',
        })
    },
    //跳转到store
    toStore(e) {
        GP.navStore(e.currentTarget.dataset.shop_id)
    },
    navStore(id) {
        wx.navigateTo({
            url: '/pages/store/store?shop_id=' + id,
        })
    },
    
    //到集点卡
    toSearch(){
        wx.navigateTo({
            url: '/pages/search/search',
        })
        // wx.showModal({
        //     title: '功能即将开放',
        //     content: '多喝多送福利',
        // })
    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})
