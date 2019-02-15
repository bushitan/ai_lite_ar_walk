// pages/index/index.js
const API = require("../../utils/api.js");
var GP 
Page({

    /**
     * 页面的初始数据
     */
    data: {
        shopList:[],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        GP = this
        this.onInit()

        if(options.hasOwnProperty("shop_id")){
            GP.navStore(options.shop_id)
        }
    },

    toMy(e){        
        GP.navStore(e.currentTarget.dataset.shop_id)
    },
    toStore(e) {
        GP.navStore(e.currentTarget.dataset.shop_id)
    },
    navStore(id){
        wx.navigateTo({
            url: '/pages/store/store?shop_id=' + id,
        })
    },

    onInit(){
        API.Login().then((code) => {
            this.getUserID(code).then(() => {
                this.getTraceList()
            })
        })
    },

    /**
     * 请求：获取user_id
     */
    getUserID(code) {
        return API.Request({
            url: API.URL_USER_GET_ID,
            data:{
                code:code,                
            },
            success: function (res) {
                console.log("getUserID", res.data.user.id)
                wx.setStorageSync(API.KEY_USER_ID, res.data.user.id)
            },
        })
    },

    getTraceList(){
        return API.Request({
            url: API.URL_SHOP_TRACE,
            success: function (res) {
                GP.setData({
                    shopList: res.data.shop_list,
                })
                // console.log("getTrace",res)
                // wx.setStorageSync(API.KEY_SHOP_TRACE, res.data.shop_list)
            },
        }) 
    },

    


    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})