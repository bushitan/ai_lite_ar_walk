// components/xx_cover_news/xx_cover_news.js
var ARUtils = require("../../utils/map/ARUtils.js")
var AccelerometerUtils = require("../../utils/map/AccelerometerUtils.js")
var CompassUtils = require("../../utils/map/CompassUtils.js")
// var numbers = require('../../utils/numbers');
var GP
var GlobalValue = {
    accelerometerZ: 0 ,//三轴陀螺仪Z轴数值
    compassDirection:260,
    selfLocation: { latitue: 22.8445090000, longitude: 108.3101860000},  //我的坐标
    selfAccuray:0,   //GPS精度
    selfUpdateFre:70, //获取GPS坐标频率(按罗盘转动次数)
} 





Component({
    /**
     * 组件的属性列表
     *  var mark_la = 22.8454590810
            var mark_lo = 108.3109956980
     */
    properties: {
        markList: {
            type: Array,
            value: [
            ],
        },
        mode: {
            type: String,
            value: "normal",  
        },


    },

    /**
     * 组件的初始数据
     */
    data: {

        directionName: "东",
        //标记
        clickMarkID: 2,//点击mark的id
        //菜单
        isPack: !false,
        clickMenuID: 0,
        menuList: [
            { name: "全部", id: 0 },
            { name: "景点", id: 1 },
            { name: "厕所", id: 2 },
        ],
    },
    ready() {
        GP = this       
        this.onInit()
    },


    /**
     * 组件的方法列表
     */
    methods: {       
        /**
        * @method 初始化
        */
        onInit() {

            ARUtils.render(GP, GlobalValue)
            //开启罗盘
            wx.onCompassChange(function (res) {
                GlobalValue.compassDirection = CompassUtils.filterDirection(res.direction)
                ARUtils.render(GP, GlobalValue)
                // console.log(GlobalValue)
            })
            //开启三轴陀螺仪
            wx.onAccelerometerChange(function (res) {
                GlobalValue.accelerometerZ = AccelerometerUtils.filterValueZ(res.z)
            })
        },
        clickMark(){
            ARUtils.queryNavByBaidu("lalalal")
        },

    }
})
