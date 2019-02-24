// components/xx_cover_news/xx_cover_news.js

var downCanvasID = "downCanvas"
var canvas
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        makeLandmark: {
            type: Object,
            value: {},
            // observer: '_makeLandmark',
            observer: 'qrEditor',
            
        },
        bg: {
            type: String,
            value: 0,
        },
        // width: {
        //     type: Number,
        //     value: 400,
        // },
        // height: {
        //     type: Number,
        //     value: 400,
        // },
        pointColor: {
            type: String,
            value: "#ffffff",
        },
        lineColor: {
            type: String,
            value: "#ffffff",
            // observer: '_changeColor',
        },

    },

    /**
     * 组件的初始数据
     */
    data: {
        width:0,
        height:0,
        borderSize:20,
        logoHeight:90,
    },

    /**
     * 组件的方法列表
     */
    methods: {


        qrEditor(newVal, oldVal) {
            if (newVal.hasOwnProperty("path") ) {
                var title = newVal.title
                var path = newVal.path
                var width = newVal.width
                var height = newVal.height
                console.log(newVal,path)
                // this.getImageInfo(path).then((res) => {
                    var _width = 450
                    var _height = parseInt(height * _width / width)
                    this.setData({
                        width: _width,
                        height: _height,
                    })
                    this.getCanvas(path, _width, _height, title)
                    // var that = this
                    // setTimeout(function(){
                    //     this.getCanvas(path, _width, _height, title)
                    // },1000)
                    
                // })
            }
        },

        getImageInfo(path){
            return new Promise(resolve => {
                wx.getImageInfo({
                    src: path,
                    success(res) {
                        resolve(res)
                    }
                })
            })
        },

        getCanvas(path, width, height, title){
            //  console.log(path,width,height)
            var borderSize = this.data.borderSize
            var logoHeight = this.data.logoHeight
            canvas = wx.createCanvasContext(downCanvasID, this)
            canvas.setFillStyle('white')
            canvas.fillRect(0, 0, width + borderSize * 2, height + logoHeight + borderSize * 3)
            canvas.drawImage(
                path,
                borderSize, /*画图要预留边框空白*/
                borderSize,  /*画图要预留边框空白*/
                width, //图片实际宽度
                height //图片实际高度
                // 50, //图片实际宽度
                // 50 //图片实际高度
            )

            //写文字
            canvas.setFillStyle("#000000")
            // canvas.fillText('2018.10.17', (_width + _border) / 2 - 30, _height + 30)
            // canvas.drawImage('../../images/qr.jpg', (_width + _border) - 70, _height + 40, 60, 60)
            canvas.font = "bolder 18px Arial";
            // font = "bold 30px Arial";
            canvas.fillText(title, borderSize , height + borderSize*3 )
            canvas.font = "18px Arial";
            // canvas.setFontSize(14)
            canvas.fillText('长按看全部内容', borderSize , height + borderSize*5)
            //画logo
            canvas.drawImage('../../images/qr.jpg',
                width + borderSize - logoHeight, 
                height + borderSize * 2 , 
                logoHeight, 
                logoHeight,
            )

            var that = this
            canvas.draw(false, () => {
                console.log(width,height)
                wx.canvasToTempFilePath({
                    x: 0,
                    y: 0,
                    // width: this.data.bgWidth,
                    // height: this.data.bgHeight,
                    width: width + borderSize * 2,
                    height: height + logoHeight + borderSize * 3,
                    // destWidth: 100,
                    // destHeight: 100,
                    canvasId: downCanvasID,
                    success(res) {

                        wx.getImageInfo({
                            src: res.tempFilePath,
                            success(res) {
                                // resolve(res)
                                console.log(res)
                            }
                        })



                        console.log(res.tempFilePath)
                        that.triggerEvent('getImage', res.tempFilePath);
                        // wx.previewImage({
                        //     urls: [res.tempFilePath],
                        // })
                    }
                }, this)
            })

            // this.setData({
            //     makeLandmark: {},
            // })

        },



















        // _makeLandmark(newVal, oldVal) {

        //     console.log(newVal)
        //     if (newVal!="") {
        //         var _width = this.data.width
        //         var _height = this.data.height
        //         var downCanvasID = "downCanvas"
        //         // GP.setData({ getImage: true })
        //         canvas = wx.createCanvasContext(downCanvasID, this)
        //         // 1. 绘制图片至canvas
        //         canvas.setFillStyle('white')
        //         canvas.fillRect(0, 0, _width + this.data.borderSize, _height + this.data.logoHeight)

        //         canvas.drawImage(
        //             newVal,
        //             this.data.borderSize / 2, //画图要预留边框空白
        //             this.data.borderSize / 2,  //画图要预留边框空白
        //             _width, //图片实际宽度
        //             _height //图片实际高度
        //         )
        //         this.drawLogo()
        //         // this.updateLine()
        //         canvas.draw(false, () => {
        //             wx.canvasToTempFilePath({
        //                 x: 0,
        //                 y: 0,
        //                 // width: this.data.bgWidth,
        //                 // height: this.data.bgHeight,
        //                 width: _width + + this.data.borderSize,
        //                 height: _height + this.data.logoHeight,
        //                 // destWidth: 100,
        //                 // destHeight: 100,
        //                 canvasId: downCanvasID,
        //                 success(res) {
        //                     console.log(res.tempFilePath)                           
        //                     wx.previewImage({
        //                         urls: [res.tempFilePath],
        //                     })
        //                 }
        //             }, this)
        //         })

        //         this.setData({
        //             makeLandmark: "",
        //         })
        //     }
        // },

        // updateLine() {
        //     var key = this.data.makeLandmark
        //     // console.log(key)
        //     this.drawLine(key["head"], key["neck"])
        //     this.drawLine(key["neck"], key["left_shoulder"])
        //     this.drawLine(key["neck"], key["right_shoulder"])

        //     this.drawLine(key["left_shoulder"], key["left_elbow"])
        //     this.drawLine(key["left_elbow"], key["left_hand"])

        //     this.drawLine(key["right_shoulder"], key["right_elbow"])
        //     this.drawLine(key["right_elbow"], key["right_hand"])

        //     this.drawLine(key["left_shoulder"], key["half"])
        //     this.drawLine(key["right_shoulder"], key["half"])


        //     this.drawLine(key["left_buttocks"], key["half"])
        //     this.drawLine(key["right_buttocks"], key["half"])

        //     this.drawLine(key["left_buttocks"], key["left_knee"])
        //     this.drawLine(key["left_knee"], key["left_foot"])

        //     this.drawLine(key["right_buttocks"], key["right_knee"])
        //     this.drawLine(key["right_knee"], key["right_foot"])
        //     this.drawPoint(key)
        //     this.drawLogo()
        // },

        // drawLogo(){

        //     var _width = this.data.width
        //     var _height = this.data.height
        //     var _border = this.data.borderSize

        //     canvas.setFillStyle("#000000")
        //     // canvas.fillText('2018.10.17', (_width + _border) / 2 - 30, _height + 30)
        //     // canvas.drawImage('../../images/qr.jpg', (_width + _border) - 70, _height + 40, 60, 60)
        //     canvas.setFontSize(22)
        //     canvas.fillText('飞雪连天射白鹿，笑书侠倚碧鸳', 10, _height + 40)
        //     canvas.setFontSize(11)
        //     canvas.fillText('我在江湖  |  致敬金庸', 10, _height + 70)
        //     canvas.drawImage('../../images/qr.jpg', (_width + _border) - 70, _height +20, 60, 60)
        //     // ctx.fillText('MINA', 100, 100)
        // },

        // drawPoint(key){
        //     canvas.setFillStyle(this.data.pointColor)
        //     for (var i in key) {
        //         canvas.beginPath()
        //         canvas.arc(
        //             this.getCenterPos(key[i]).x,
        //             this.getCenterPos(key[i]).y,
        //             key[i].width / 2,
        //             0,
        //             2 * Math.PI
        //         )
        //         canvas.fill()
        //     }

        // },

        // drawLine(point1, point2) {
        //     canvas.setLineWidth(2)
        //     canvas.setStrokeStyle(this.data.lineColor)
        //     canvas.beginPath()
        //     canvas.moveTo(
        //         this.getCenterPos(point1).x,
        //         this.getCenterPos(point1).y
        //     )
        //     canvas.lineTo(
        //         this.getCenterPos(point2).x,
        //         this.getCenterPos(point2).y
        //     )
        //     canvas.stroke()
        // },

        // getCenterPos(point) {
        //     var center_x = point.x + (point.width + this.data.borderSize ) / 2
        //     var center_y = point.y + (point.height + this.data.borderSize) / 2
        //     return { x: center_x, y: center_y, }
        // },





    }
})
