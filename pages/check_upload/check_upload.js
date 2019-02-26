// pages/check_upload/check_upload.js
const Util = require("../../utils/util.js");
var GP 
Page({

    /**
     * 页面的初始数据
     */
    data: {
        inputContent:"",
        imageList: [
            // { "path": "../../images/store_logo.jpg" },
            // { "path": "../../images/loading.jpg" },
            // { "path": "../../images/store_logo.jpg" },
            // { "path": "../../images/store_logo.jpg" },
            // { "path": "../../images/store_logo.jpg" },
        ],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        GP = this
        GP.setPath(options.path)
        // GP.getCamera()
    },

    setPath(path) {
        GP.setData({
            imageList: [{ "path": path }]
        }) 
    },

    getCamera(){
        wx.chooseImage({
            count:1,
            success: function(res) {
                console.log(res.tempFilePaths)
                GP.setData({
                    imageList: [{ "path": res.tempFilePaths[0]}]
                }) 
            },
            fail:function(){
                console.log('fail')
                wx.navigateBack({ })
            }
        })
    },

    input(e){
        GP.setData({ inputContent:e.detail.value})
    },

    //确认打卡
    confirm(){
        var record =
        {
            summary: GP.data.inputContent,
            snapshot: GP.data.imageList[0].path,
            record_id: 1,
            shop_id: "",
            start_time: Util.formatTime(new Date()),
        }
        console.log(record)
        wx.setStorageSync("record", record)
        wx.switchTab({
            url: '/pages/check_record/check_record',
        })
    },

    //图片预览
    prepare(e){
        console.log(e.currentTarget.dataset.path)
        wx.previewImage({
            urls: [e.currentTarget.dataset.path],
        })
    },

    //增加图片
    add(){
        wx.showModal({
            title: '温馨提示',
            showCancel:false,
            content: '内测期间，每次只能上传1张图片',
        })
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})