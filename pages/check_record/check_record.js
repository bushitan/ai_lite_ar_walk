// pages/check_record/check_record.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        recordList: [
            {
                summary:"随便测试一下随便测试一下随便测试一下随便测试一下",
                snapshot: "", //../../images/group1.jpg
                record_id: 1,
                shop_id: "",
                start_time:"2019-02-25 08:22",
            },
            {
                summary: "随便测试一下",
                snapshot: "../../images/group2.jpg",
                record_id: 1,
                shop_id: 1,
                start_time: "2019-02-25 08:22",
            },
            {
                summary: "随便测试一下",
                snapshot: "../../images/store_logo.jpg",
                record_id: 1,
                shop_id: 1,
                start_time: "2019-02-25 08:22",
            },
        ],
        

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})