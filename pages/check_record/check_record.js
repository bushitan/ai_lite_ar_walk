// pages/check_record/check_record.js
const API = require("../../utils/api.js");
var GP 
Page({

    /**
     * 页面的初始数据
     */
    data: {


        userInfo: false,


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
      
        var userInfo = wx.getStorageSync(API.KEY_USER_INFO)
        if (userInfo != "")
            GP.setData({
                userInfo: userInfo
            })

    },

    onShow(){
        var recordList = GP.data.recordList
        var recod = wx.getStorageSync("record")
        if (recod == ""){
           
        }
        else{
            recordList.unshift(recod)
            GP.setData({
                recordList: recordList
            })
            var recod = wx.setStorageSync("record","")
        }
    },

    getUserInfo(){
        wx.getUserInfo({
            success: function (res) {
                // console.log(res);
                // that.data.userInfo = res.userInfo;
                var userInfo = res.userInfo
                var info = {
                    nickName: userInfo.nickName,
                    avatarUrl: userInfo.avatarUrl,
                    gender: userInfo.gender,// 性别 0：未知、1：男、2：女
                    province: userInfo.province,
                    city: userInfo.city,
                    country: userInfo.country,
                }
                GP.setData({
                    userInfo: info 
                })
                wx.setStorageSync(API.KEY_USER_INFO, info)
            }
        })
    },



    //跳到上传打卡图片
    toCheckUpload() {
        wx.chooseImage({
            count: 1,
            success: function (res) {
                wx.navigateTo({
                    url: '/pages/check_upload/check_upload?path=' + res.tempFilePaths[0],
                })
            }
        })
    },


    //预览图片
    prepareImage(e){
        wx.previewImage({
            urls: [e.detail],
        })
    },

    address(){
        wx.navigateTo({
            url: '/pages/store/store?shop_id=36',
        })
        // wx.showModal({
        //     title: '跳转店铺按钮',
        //     content: '',
        // })
    },



    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})