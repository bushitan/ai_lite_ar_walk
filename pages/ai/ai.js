// pages/ai/ai.js
var GP
Page({

    /**
     * 页面的初始数据
     */
    data: {
        isCameraPage:true, 
        imageSnapshot:"",
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        GP = this
    },


    // 1 拍照
    takePhoto() {
        if (GP.data.isPhone == false) return
        const camera = wx.createCameraContext()
        camera.takePhoto({
            quality: 'high',
            success: (res) => {
                console.log(res)
                GP.setData({
                    isCameraPage:false,
                    imageSnapshot :res.tempImagePath,
                })
            }
        })
    },

    //预览图片
    toPreview(){
        wx.previewImage({
            urls: [GP.data.imageSnapshot],
        })
    },
    //返回
    toPhoto(){
        GP.setData({
            isCameraPage: true,
        })
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})