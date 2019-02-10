// pages/my/my.js

// var ApiUtils = require("../../js/ar/ApiUtils.js")
// var apiUtils = new ApiUtils()
// var Location = require("../../js/ar/Location.js")
// var LocationUtils = require("../../js/ar/LocationUtils.js")
var GP

const API = require("../../utils/api.js");

Page({

    /**
     * 页面的初始数据
     */
    data: {
        shopList:[],
        list: [
            { shop_id: 1, name: "木可咖啡" },
            { shop_id: 2, name: "广西大学" },
            { shop_id: 3, name: "广西大学（4点）" },
            { shop_id: 4, name: "福彩大厦" },
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

        // GP.setData({
        //     location: new Location({ 
        //         'latitue': 23.258445, 
        //         'longitude': 107.985462 
        //     })
        // })
        // GP.initLocation()
        GP.getShopList()
    },

    //获取店铺列表
    getShopList(code) {
        return API.Request({
            url: API.URL_SHOP_LIST,
            success: function (res) {
                GP.setData({
                    shopList: res.data.shop_list,
                })
                // console.log("getUserID", res.data.user.id)
                // wx.setStorageSync(API.KEY_USER_ID, res.data.user.id)
            },
        })
    },

    deleteShop(e) {
        var shop_id = e.currentTarget.dataset.shop_id
        var shop_title = e.currentTarget.dataset.shop_title
        wx.showModal({
            title: '温馨提示',
            content: '即将删除:' + shop_title + '，删除后信息将无法恢复',
            success(res){
                if(res.confirm){
                    GP.deleteAPI(shop_id)
                }
                    // console.log("confirm")
            },
        })
        // GP.deleteAPI(shop_id)
    },
    //删除店铺
    deleteAPI(shop_id) {
        return API.Request({
            url: API.URL_SHOP_DELETE,
            data:{
                shop_id: shop_id
            },
            success: function (res) {
                GP.setData({
                    shopList: res.data.shop_list,
                })
                wx.showToast({
                    title: '删除成功',
                    icon:'success',
                })
            },
        })
    },











    // /**
    //  * 不停更新gps
    //  */
    // initLocation(){
        
    //     setTimeout(function () {
    //         wx.getLocation({
    //             type: 'gcj02',
    //             success(res) { 
    //                 GP.setData({ 
    //                     location: new Location({ 'latitue': res.latitude, 'longitude': res.longitude })
    //                 })
    //             }
    //         })
    //     }, 2000)
    // },

    // // searchBtn() {
    // //     wx.showLoading({
    // //         title: '查询中...',
    // //     })
    // //     var _location = GP.data.location
    // //     var _location_str = _location.getString()
    // //     apiUtils.getMarkList("酒店", _location_str, GP.callback)

    // // },

    // clickBtn(e) {
    //     var _group_id = e.currentTarget.dataset.group_id
    //     wx.showLoading({
    //         title: '查询中...',
    //     })
    //     GP.setData({
    //         keyword: e.currentTarget.dataset.name
    //     })
    //     wx.request({
    //         url: 'https://www.51zfgx.com/ai/lite/search/shop/',
    //         data: {
    //             "group_id": _group_id
    //         },
    //         success(res) {
    //             console.log(res.data)
    //             // wx.setStorageSync("mark_list",res.data)
    //             var _data = GP.filterGroupToAPI(res.data.shop_list)
    //             GP.callback({
    //                 data: _data
    //             })
    //         },
    //     })
    // },

    // filterGroupToAPI(shop_list) {
    //     var _list = shop_list
    //     var _temp_list = []
    //     for (var i = 0; i < _list.length; i++) {
    //         var _s = _list[i]
    //         _temp_list.push({
    //             'id': _s.id,
    //             'title': _s.name,
    //             'address': _s.address,
    //             'tel': _s.phone,
    //             'category': _s.category,
    //             // 'type': _s.type,
    //             'location': { lat: _s.latitude, lng: _s.longitude },
    //         })
    //     }
    //     return _temp_list
    // },


    // callback(res) {
    //     var locationUtils = new LocationUtils()
    //     var _list = locationUtils.formatSearch({
    //         list: res.data,
    //         location: GP.data.location,
    //     })
    //     console.log(_list)

    //     wx.setStorageSync("point_list", _list)
    //     wx.setStorageSync("keyword", GP.data.keyword)
    //     //          wx.redirectTo({
    //     //     url: '/pages/my/my',
    //     // })
    //     setTimeout(function () {
    //         wx.hideLoading()
    //         wx.navigateTo({
    //             url: '/pages/map/map',
    //         })
    //     }, 1500)
    // },

    /**
     * 导航：店面展示
     */
    toStore(e) {
        wx.navigateTo({
            url: '/pages/store/store?shop_id=' + e.currentTarget.dataset.shop_id,
        })
    },
    /**
     * 导航：店面数据修改
     */
    toUpdate(e) {
        wx.navigateTo({
            url: '/pages/editor/editor?shop_id=' + e.currentTarget.dataset.shop_id,
        })
    },
    /**
     * 导航：新增店面
     */
    toEditor(e) {
        var num = 3
        if (GP.data.shopList.length > num){
            wx.showModal({
                title: '数量限制',
                confirmText:"复制微信",
                content: '内测期间，每位用户暂能创建' + num + '个店铺，店铺数量会逐步开放。若急需更多的数量，请添加客服微信:suojun_code_test（点击下方按钮即可复制）',
                success(res){
                    if(res.confirm)
                        wx.setClipboardData({
                            data: 'suojun_code_test',
                            success(res) {
                                wx.showToast({
                                    title: '复制成功',
                                })
                            }
                        })
                },
            })
            return 
        }
        wx.navigateTo({
            url: '/pages/editor/editor',
        })
    },



    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },
})