// pages/ai/ai.js
var GP
Page({

    /**
     * 页面的初始数据
     */
    data: {
        isCameraPage: true,
        imageSnapshot: "../../images/dialog_image_null.png",
        // imageSnapshot: "",
        

        // makeLandmark: {
        //     title: "我在Dahe&Lee咖啡工作室，来偶遇吗",
        //     path: "../../images/loading.jpg",
        // },
        makeLandmark:{},
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        GP = this
        var name = options.name.replace(/\@/g, '&')
        var summary = options.summary.replace(/\@/g, '&')
        GP.setData({
            name: name,
            summary: summary || "我在" + name +"，来偶遇吗",
        })
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
                    // isCameraPage:false,
                    imageSnapshot: "../../images/dialog_image_null.png",
                    makeLandmark:{
                        title: GP.data.summary,
                        path: res.tempImagePath,
                        width: res.width,
                        height: res.height,
                    },
                    // imageSnapshot :res.tempImagePath,
                })
            }
        })
    },

    getSnaphot(e){
        var snaphot = e.detail
        // wx.previewImage({
        //     urls: [snaphot],
        // })
        GP.setData({
            isCameraPage: false,
            imageSnapshot: snaphot
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