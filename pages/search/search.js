// pages/search/search.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        traceList: ['IO', 'ww', 'IO', 'ww', 'IO', 'ww',],
        hotList: ["Dahe & Lee","察也手作&乐知咖啡"],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    back(){
        wx.navigateBack({
            
        })
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})