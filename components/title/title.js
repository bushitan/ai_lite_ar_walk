// components/xx_cover_news/xx_cover_news.js
var GP
var i = 0
var roll_z = 0
Component({
    /**
     * 组件的属性列表
     */
    properties: {      
        nodeList: {
            type: Array,
            value: [
                { x: 10, y: 50, name: "北京景山公园", distance:500,},
            ],
        },
            
        
    },

    /**
     * 组件的初始数据
     */
    data: {
        // nodePos: {
        //     compass: 80,
        // },
        // myPos:{
        //     compass:60,
        // },
        markCompass:0,
    },
    ready() {
        GP = this
        this.onInit()
    },
        


    /**
     * 组件的方法列表
     */
    methods: {
        main(){

        },
        render(){},

        //初始化
        onInit() {
            // var that = this
            wx.onCompassChange(function (res) {
                // console.log(res.direction)
                var abs = parseInt(res.direction / 4) * 4
                GP.updateTarget(abs)
                
                i++
                if(i%70 == 0){
                    GP.getLocation()
                }
            })

            wx.onAccelerometerChange(function (res) {
                // console.log(res.x, res.y, res.z)
                // console.log(res.y)
                // console.log(res.z)
                var z = res.z
                // if (z >= 0)
                //     roll_z = parseInt(50 + z * 50)
                // else
                if (z > 1) z = 1
                if ( z < -1 ) z = -1
                roll_z = parseInt(350 + z * 300)
                // console.log(roll_z)
            })


            //测试
            // GP.updateTarget(50)
            // GP.mathMarkDistance()
        },

        getLocation(){
            wx.getLocation({
                type: 'gcj02',
                success(res) {
                    const latitude = res.latitude
                    const longitude = res.longitude
                    const speed = res.speed
                    const accuracy = res.accuracy

                    console.log(latitude, longitude)
                    GP.mathMarkDistance(latitude, longitude)
                }
            })
        },

        //计算目标点的距离，弧度
        mathMarkDistance(latitude, longitude) {
            // var mark_la = 39.928712
            // var mark_lo = 116.393345
            var mark_la = 22.8454590810
            var mark_lo = 108.3109956980
            
            // var latitude = 22.8477
            // var longitude = 108.306385

            var distance = GP.distance(mark_la, mark_lo, latitude, longitude)
            var nodeList = GP.data.nodeList
            nodeList[0].distance = parseInt(distance)
            GP.setData({
                nodeList: nodeList
            })

            var duan = GP.distance(mark_la, mark_lo, mark_la, longitude)
            // console.log(distance, duan)

            var markCompass = 180 * Math.asin(duan / distance) / Math.PI
            // 把与目标点的角度赋值到全局变量
            GP.setData({
                markCompass: markCompass
            })
            // return markCompass
        },

        //计算距离
        distance: function (la1, lo1, la2, lo2) {
            var La1 = la1 * Math.PI / 180.0;
            var La2 = la2 * Math.PI / 180.0;
            var La3 = La1 - La2;
            var Lb3 = lo1 * Math.PI / 180.0 - lo2 * Math.PI / 180.0;
            var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(La3 / 2), 2) + Math.cos(La1) * Math.cos(La2) * Math.pow(Math.sin(Lb3 / 2), 2)));
            s = s * 6378137;//地球半径
            s = Math.round(s * 10000) / 10000 ;
            // console.log("计算结果", s)
            return s
        },



        //更新罗盘方向
        updateTarget(direction) {
            var myCompass = parseInt(direction)
            var nodeCompass = GP.data.markCompass //目标点固定
          var baseAngle = compassBetweenAngle
            var halfAngle = baseAngle / 2
            var stepPixle = 750 / baseAngle

            var valueAngle = myCompass - nodeCompass 

            if (valueAngle > halfAngle && valueAngle < 120) {
                var nodeList = GP.data.nodeList
                nodeList[0].x = 0
                // GP.setData({
                //     nodeList: nodeList
                // })
            }
            else if (valueAngle < -halfAngle && valueAngle > -100) {
                var nodeList = GP.data.nodeList
                nodeList[0].x = 750 - 56
                // GP.setData({
                //     nodeList: nodeList
                // })
            }
            else if ( valueAngle >= 0 && valueAngle <= halfAngle  ){
                var nodeList = GP.data.nodeList
                nodeList[0].x = (halfAngle - valueAngle)* stepPixle - 25

                // GP.setData({
                //     nodeList: nodeList
                // })
            }
            else if (valueAngle >  -halfAngle && valueAngle < 0) {
                var nodeList = GP.data.nodeList
                nodeList[0].x = (-valueAngle + halfAngle) * stepPixle - 25

                // GP.setData({
                //     nodeList: nodeList
                // })
            }
            else{
                var nodeList = GP.data.nodeList
                nodeList[0].x = 1000

                // GP.setData({
                //     nodeList: nodeList
                // })
            }
            nodeList[0].y = roll_z 
            GP.setData({
                nodeList: nodeList
            })
        },

        // 改变
        _changeMode(newVal, oldVal) {
            if (this.data.mode == "")
                this.setData({
                    mode: this.data.MODE_MENU
                })
        },

        /**
         * return: 点击列表的index
         */
        click(e) {
            this.setData({
                initindex: e.currentTarget.dataset.index
            })
            this.triggerEvent('click', e.currentTarget.dataset.index);
        },
    }
})
