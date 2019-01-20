// pages/map/map.js
var GP
Page({

    /**
     * 页面的初始数据
     */
    data: {
        title:"",
        pointList: [],
        direction: 0, //罗盘方向
        accZ: 0, //手机俯仰姿势
        mode: "mark",
        focusList:[], //导航终点

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        GP = this
        this.setData({
            pointList: wx.getStorageSync("point_list")
        })

        setInterval(function(){
            GP.setData({
                direction: parseInt(Math.random() * 300)
            })
        },1000)
    },




    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})