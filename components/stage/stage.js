


var StageUtils = require("../../js/stage/StageUtils.js")
var stageUtils = new StageUtils({GP:true})
var GP 
// var SpriteMark = require("../../js/stage/SpriteMark.js")

var MODE_MARK = "mark"
var MODE_NAV = "nav"
Component({
    properties: {
        list: {
            type: Array,
            value: [],
            observer(newVal, oldVal) {
                if (newVal) {
                    this.setData({
                        markList: stageUtils.filterMarkList({ list: newVal })
                    })
                    // console.log(newVal)
                    // console.log(GP.data.markList)

                }
            }
        },
        
        direction: {
            type: Number,
            value: 0,
            observer(newVal, oldVal) {

                //过滤罗盘方向
                newVal = stageUtils.filterDirection({
                    direction: newVal,
                    acc_z: this.data.acc_z
                })

                //渲染
                if (this.data.mode == MODE_MARK) //渲染mark
                    stageUtils.rendMark()
                else  //渲染导航
                {
                    stageUtils.rendNav()

                }
                return newVal
            }
        },
        acc_z: {
            type: Number,
            value: 0,
        },

        /**模式 */
        mode:{
            type: String,
            value: MODE_MARK,
            observer(newVal, oldVal) {
                console.log(newVal,"modes")
                if (newVal == MODE_MARK) //渲染mark
                    this.setData({ show: stageUtils.setModeMark()})                        
                else
                    this.setData({ show: stageUtils.setModeNav() })
            }
        },

        /**下一点 */
        step: {
            type: Object,
            value: {},
            observer(newVal, oldVal) { }
        },

        /**
         * 结束点 
        */
        focus: {
            type: Array,
            value: [],
            observer(newVal, oldVal) {
                if (newVal)
                    this.setData({ //
                        focusList: stageUtils.filterMarkList({ list: newVal })
                    })
             }
        },

        navInfo: {
            type: Object,
            value: {},
        },

        polyline: {
            type: Object,
            value: {},
            observer(newVal, oldVal) {
                var _map = stageUtils.filterMapPolyline({ polyline: newVal })
                var _markers = stageUtils.filterMarkerInit({
                    start: { latitude: newVal[0], longitude: newVal[1]},
                    end: { latitude: newVal[newVal.length - 2], longitude: newVal[newVal.length - 1]},
                })

                this.setData({
                    map: _map,
                    markers: _markers
                })
            }
        },
        
        
        keyword: {
            type: String,
            value: "",
            observer(newVal, oldVal){
                this.setData({
                    title: newVal
                })
            }
        },

        // gps: {
        //     type: Object,
        //     value: {},
        //     observer(newVal, oldVal) {
        //         var _markers = stageUtils.filterMarkerGPS({ 
        //             markers: this.data.markers,
        //             gps: newVal 
        //         })
        //         this.setData({
        //             markers: _markers
        //         })
        //     }
        // },
    },
    data: {
        markList: [], //mark数组
        markInfo:{}, //标记点信息
        focusList:[], //终点数组
        show: {},//显示控制
        cameraHeight: 100, //摄像头高度，可空出容纳map
        navOffsetY:840, //导航图标的偏移量，打开地图时会变化

        map:{}, //地图数据
        markers: [],

        title:"",
        // polylineObj:[], //导航路径
        //标记
        // clickMarkID: 2,//点击mark的id

    },
    ready() {
        GP = this
        stageUtils = new StageUtils({GP:this})
        this.setData({ show: stageUtils.setModeMark() })                 
    },

    methods:{
        /**
         * @method 点击mark展示详情
         * @for template/mark/mark.wxml
         * @param
         *      {object} e 事件对象
         */
        clickMark(e) {
            var _mark_id = e.currentTarget.dataset.mark_id
            console.log(GP.data.list)
            stageUtils.clickMark({ mark_id: _mark_id})
        
        },

        /**
             * @method 关闭mark详情
             * @for template/mark_info/mark_info.wxml
             * @param
             *      {object} e 事件对象
             */
        clickMarkInfoCancel(e) {
            stageUtils.clickMarkInfoCancel()
        },


        /**
          * @method 开启导航
          * @for template/mark_info/mark_info.wxml
          * @param
          *      {object} e 事件对象
          */
        clickMarkInfoToNav(e) {
            var _mark_id = e.currentTarget.dataset.mark_id
            this.triggerEvent('startNav', _mark_id);
        },
        /**
           * @method 关闭导航
           * @for template/mark_info/mark_info.wxml
           * @param
           *      {object} e 事件对象
           */
        clickNavCancel(e) {
            // var _mark_id = e.currentTarget.dataset.mark_id
            this.triggerEvent('closeNav');
            stageUtils.clickNavCancel()
        },
        
        /**
        * @method 开启导航的地图
        * @for template/map/map.wxml
        * @param
        *      {object} e 事件对象
        */
        clickNavAndMap(e) {
            // var mark_id = e.currentTarget.dataset.mark_id
            stageUtils.clickNavAndMap()
        },

        /**
          * @method 关闭导航的地图
          * @for template/map/map.wxml
          * @param
          *      {object} e 事件对象
          */
        clickNavMapOff(e) {
            stageUtils.clickNavMapOff()
        },
    },
})