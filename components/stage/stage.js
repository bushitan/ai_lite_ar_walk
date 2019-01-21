


// var StageUtils = require("../../js/stage/StageUtils.js")
// var stageUtils = new StageUtils({GP:true})

var GP 
// var SpriteMark = require("../../js/stage/SpriteMark.js")
var PropertyUtils = require("../../js/stage/PropertyUtils.js")
var ShowUtils = require("../../js/stage/ShowUtils.js")
var RenderUtils = require("../../js/stage/RenderUtils.js")
var renderUtils = new RenderUtils()
var MODE_MARK = "mark"
var MODE_NAV = "nav"
Component({
    properties: {


        keyword: {
            type: String,
            value: "",
            observer(newVal, oldVal) {this.setData({ title: newVal })}
        },
        //标记点数组
        list: {
            type: Array,
            value: [],
            observer(newVal, oldVal) {
                // if (newVal)
                    this.setData({ pointList: PropertyUtils.pointList(newVal)})
            }
        },
        //手机方向更新
        dir: {
            type: Number,
            value: 0,
            observer(newVal, oldVal) {
                this.setData({ direction: PropertyUtils.direction(newVal, this.data.accZ ) })
                // console.log(this.data.direction)
                this.render()
            }
        },
        //手机俯仰角
        z: {
            type: Number,
            value: 0,
            observer(newVal, oldVal) { this.setData({ accZ: newVal }) }
        },
        mode:{
            type: String,
            value: MODE_MARK,
            observer(newVal, oldVal) {
                console.log(newVal,"modes")
                if (newVal == MODE_MARK) //渲染mark
                    this.setData({ show: ShowUtils.onMark()})                        
                else
                    this.setData({ show: ShowUtils.onNav() })
            }
        },
        //下一点方向
        next: {
            type: Object,
            value: {},
            observer(newVal, oldVal) { this.setData({ nextPoint: newVal }) }
        },
        //导航终点
        focus: {
            type: Array,
            value: [],
            observer(newVal, oldVal) {
                // if (newVal.length > 0)
                    this.setData({ focusList: PropertyUtils.pointList(newVal) })
             }
        },
    },
    data: {
        title:"酒店",
        direction:0,
        accZ:0,
        pointList:[],
        pontInfo:{},
        nextPoint:{}, 
        focusList:[],
        center:{},
        navList:[],
        cameraHeight:100,
        navOffsetY:840,

        show:{}, //显示开关
        //标记
        // clickMarkID: 2,//点击mark的id

    },
    ready() {
        GP = this
        GP.setData({
            show: ShowUtils.onMark()
        })            
    },

    methods:{
        //渲染
        render(){

            var point_list = this.data.pointList
            var focus_list = this.data.focusList
            var d = this.data.direction
            var z = this.data.accZ
            //默认下一点是60方向
            //测试用
            var next_dir = this.data.nextPoint.direction || 60 
            if (this.data.mode == MODE_MARK) { //渲染mark
                this.setData({
                    pointList: renderUtils.point(point_list, d, z),
                })      
            }                        
            else  //渲染导航
            {
                this.setData({
                    focusList: renderUtils.point(focus_list, d, z), //目标终点
                    center: renderUtils.center(z),//中心icon手机方向
                    navList:renderUtils.nav(next_dir,d,z ),//下一点方向
                })
            }
        },








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


        clickOption(){
            this.triggerEvent('clickOption');
        },

        /**
         * 导航到新页面
         */
        clickMarkInfoToMore(){
            wx.navigateTo({
                url: '/pages/content/content',
            })
        },
    },
})
