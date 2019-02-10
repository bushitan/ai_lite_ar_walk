


// var StageUtils = require("../../js/stage/StageUtils.js")
// var stageUtils = new StageUtils({GP:true})

var GP 
// var SpriteMark = require("../../js/stage/SpriteMark.js")
var PropertyUtils = require("../../js/stage/PropertyUtils.js")
var ShowUtils = require("../../js/stage/ShowUtils.js")
var RenderUtils = require("../../js/stage/RenderUtils.js")
var renderUtils = new RenderUtils()
var MODE_MARK = "mark", MODE_END = "end", MODE_NAV = "nav"
Component({
    properties: {


        keyword: {
            type: String,
            value: "",
            observer(newVal, oldVal) { this.setData({ title: newVal }) }
        },
        height : {
            type: String,
            value: "100vh",
            observer(newVal, oldVal) {
                 this.setData({ cameraHeight: newVal 
            }) }
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
                if (newVal == MODE_END) {
                    wx.showModal({
                        title: '导航结束',
                        content: '到达目的地，店铺就在周边',
                        success:function(){
                            wx.navigateBack({})
                        },
                    })
                }
                else
                    this.setData({ show: ShowUtils.onNav() })
            }
        },
        //下一点方向
        next: {
            type: Object,
            value: {},
            observer(newVal, oldVal) { this.setData({ nextStep: newVal }) }
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
        accZ:0.1,
        pointList:[],
        pointInfo:{},
        nextStep:{
            distance:80,
            instruction:"个人号突然好",
            dialog:"4728937893dhuisahdsoaih 萨达撒的",
        }, 
        focusList:[],
        center:{},
        navList:[],
        cameraHeight:"100vh",
        navOffsetY:840,

        show: ShowUtils.onMark(), //显示开关
        //标记
        // clickMarkID: 2,//点击mark的id

    },
    ready() {
        GP = this
        
    },

    methods:{
        //渲染
        render(){

            var point_list = this.data.pointList
            var focus_list = this.data.focusList
            // console.log(focus_list)
            var d = this.data.direction
            var z = this.data.accZ
            //默认下一点是60方向
            //测试用
            var next_dir = this.data.nextStep.direction || 180
            if (this.data.mode == MODE_MARK) { //渲染mark
                this.setData({
                    pointList: renderUtils.point(point_list, d, z),
                })      
                // console.log(this.data.pointList)
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
            
            var _list = this.data.list
            var _info = {}
            for (var i = 0; i < _list.length; i++) {
                if (_list[i].id == _mark_id)
                    _info = _list[i]
            }
            this.setData({
                pointInfo: _info,
                show: ShowUtils.onInfo(),
            })
        },

        // 关闭详情 latitue,longitude
        // @for template/mark_info/mark_info.wxml
        clickMarkInfoCancel(e) {
            this.setData({show: ShowUtils.onMark()})
        },


        /**
          * @method 开启导航
          * @for template/mark_info/mark_info.wxml
          * @param
          *      {object} e 事件对象
          */
        clickMarkInfoToNav(e) {
            var _mark_id = e.currentTarget.dataset.mark_id
            var _loc_str 
            var _list = this.data.list
            for (var i = 0; i < _list.length; i++) {
                if (_list[i].id == _mark_id){
                    console.log(_list[i])
                    _loc_str = _list[i].latitue + ',' + _list[i].longitude
                }
            }
            this.triggerEvent('startNav', _loc_str);
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
            // stageUtils.clickNavAndMap()
            this.triggerEvent('openMap');
        },

        /**
          * @method 关闭导航的地图
          * @for template/map/map.wxml
          * @param
          *      {object} e 事件对象
          */
        clickNavMapOff(e) {
            // stageUtils.clickNavMapOff()

            // this.triggerEvent('closeMap');
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
