// pages/check_record/check_record.js
var GP 
Page({

    /**
     * 页面的初始数据
     */
    data: {
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
            // {
            //     summary: "随便测试一下",
            //     snapshot: "../../images/store_logo.jpg",
            //     record_id: 1,
            //     shop_id: 1,
            //     start_time: "2019-02-25 08:22",
            // },
        ],
        
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        GP = this
        // GP.setData({
        //     recordList: GP.data.recordList.reverse()
        // })
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

    //跳到上传打卡图片
    toCheckUpload() {
        wx.navigateTo({
            url: '/pages/check_upload/check_upload',
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