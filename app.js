//app.js
const API = require("utils/api.js");
var GP 
App({

    getUserID(code) {
        return API.Request({
            url: API.URL_USER_GET_ID,
            data: {
                code: code,
            },
            success: function (res) {
                console.log("getUserID", res.data.user.id)
                wx.setStorageSync(API.KEY_USER_ID, res.data.user.id)
            },
        })
    },
    login(){

        API.Login().then((code) => {
            this.getUserID(code).then(() => {
                // page.onInit()
                getCurrentPages()[0].onInit()
            })
        })
    },

    onLaunch: function () {

    // // 展示本地存储能力
    //     var logs = wx.getStorageSync('logs') || []
    //     logs.unshift(Date.now())
    //     wx.setStorageSync('logs', logs)

    //     // 登录
    //     wx.login({
    //         success: res => {
    //         // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //         }
    //     })
    //     // 获取用户信息
    //     wx.getSetting({
    //         success: res => {
    //         if (res.authSetting['scope.userInfo']) {
    //             // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //             wx.getUserInfo({
    //             success: res => {
    //                 // 可以将 res 发送给后台解码出 unionId
    //                 this.globalData.userInfo = res.userInfo

    //                 // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //                 // 所以此处加入 callback 以防止这种情况
    //                 if (this.userInfoReadyCallback) {
    //                 this.userInfoReadyCallback(res)
    //                 }
    //             }
    //             })
    //         }
    //         }
    //     })
    },
    globalData: {
        userInfo: null,
        focusList:[],
    }
})

// "navigationStyle":"custom"