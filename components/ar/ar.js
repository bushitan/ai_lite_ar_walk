
var ARUtils = require("../../utils/map/ARUtils.js")
var ar_utils
var ApiUtils = require("../../utils/map/ApiUtils.js")
var Location = require("../../utils/map/Location.js")
var GP
var keywordLock = true
// var MODE_NORMAL = "normal"
// var MODE_CUSTOM = "custom"


var PropertyUtils = require("../../utils/map/PropertyUtils.js")
var propertyUtils = new PropertyUtils({
    mode:"normal"
})


// import Component from '../../utils/wxComponents'

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        list: {
            type: Array,
            value: [
                {
                    id: 1, x: 10, y: 50, name: "水浒人家", distance: 500,
                    location: { latitude: 24.4972341880, longitude: 108.6384236813},
                    compass_value: 0
                },
            ], 
            observer(newVal, oldVal) {
                this.setData({
                    markList: propertyUtils.filterCustomMarkList({ list: newVal })
                })
            }
        },
        mode: {
            type: String,
            value: "", //custom
            observer(newVal, oldVal) {
                propertyUtils.setMode({ mode: newVal })
                // this.setData({
                //     markInputMode: propertyUtils.filterMode({ mode: newVal })
                // })
            },
        },
        keyword: {
            type: String,
            value: "麦当劳", 
            observer(newVal, oldVal) {
                this.setData({
                    keyword: propertyUtils.filterKeyword({ keyword: newVal })
                })        
            },
        },
        power: { 
            type: String, 
            value: 'normal', 
            observer(newVal, oldVal) {
                this.setData({
                    GPSFrameFre: propertyUtils.filterPower({ power: newVal })
                }) 
            }
        }

    },

    /**
     * 组件的初始数据
     */
    data: {
        markList: [],
        keywordValue:"",


        //基础数据
        GPSFrameFre: 70, //获取GPS坐标频率(按罗盘转动次数)
        GPSAccuray: 30, //GPS的精度
        GPSSpeed: 5,//移动速度
        GPSLocation: { latitue: 23.1290800000, longitude: 113.2643600000 },


        //罗盘
        directionName: "东",
        cameraHeight:100,
        //导航
        navDirection:0,

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

        //显示控制
        show:{},
    },
    ready() {
        GP = this      
        console.log("ready")

        ar_utils = new ARUtils({GP:GP})

        // ARUtils.init(GP) //初始化类
        this.onProperty()

        this.onInit() //初始化系统流程
    },


    /**
     * 组件的方法列表
     */
    methods: {    

        /**
        * @method 初始化接口函数
        */
        onProperty(){
            if ( propertyUtils.checkModeIsNormal() ){ //正常模式，查询key
                this.setData({ markList: [] })
                ar_utils.queryMark({ keyword:this.data.keyword})       
            }
        },     

        /**
        * @method 初始化系统流程
        */
        onInit() {
            var _step = 0
            var _acc_z = 0.45
            // var tempAccZ = 0
            ar_utils.render({ direction: 90, acc_z: _acc_z})
            // setInterval(function(){
            //     ar_utils.render({ direction: 90, acc_z: _acc_z })
            // },1000)

            //开启罗盘
            wx.onCompassChange(function (res) {
                //更新位置
                _step++
                if (_step % GP.data.GPSFrameFre == 0) {
                    GP.getCurrentLocation()
                }
                var _direction = ar_utils.filterCompassDirection({ direction: res.direction, acc_z: _acc_z}) //校正方向
                ar_utils.render({ direction: _direction, acc_z: _acc_z })
                // GP.setData({
                //     tempAccZ: tempAccZ
                // })
            })

            wx.onAccelerometerChange(function (res) {
                // console.log(res.z)
                _acc_z = ar_utils.filterAccelerometerZ({acc_z:res.z}) //重力加速度
                
            })
            GP.getQQMapInfo()

        },

        /**
         * @method 获取导航信息
         * @for ar
         * @param
         *      {object} e 事件对象
         */
        getQQMapInfo(e) {
        },



        /**
         * @method 点击mark展示详情
         * @for template/mark/mark.wxml
         * @param
         *      {object} e 事件对象
         */
        clickMark(e) {
            var mark_id = e.currentTarget.dataset.mark_id
            console.log(mark_id)
            ar_utils.clickMark(mark_id)
            // ARUtils.queryMark("厕所", '22.8122400000,108.3995300000')
            // ARUtils.queryNav('22.8122400000,108.3995300000',"22.8194235482,108.3917355537")
        },

        /**
          * @method 关闭mark详情
          * @for template/mark_info/mark_info.wxml
          * @param
          *      {object} e 事件对象
          */
        clickMarkInfoCancel(e) {
            ar_utils.clickMarkInfoCancel()
        },

        /**
          * @method 开启导航
          * @for template/mark_info/mark_info.wxml
          * @param
          *      {object} e 事件对象
          */
        clickMarkInfoToNav(e) {
            // var mark_id = e.currentTarget.dataset.mark_id

            // ApiUtils.getNavWalk(
            //     '22.8122400000,108.3995300000', 
            //     "22.8194235482,108.3917355537",
            //     ARUtils.clickMarkInfoToNav
            // )
            ar_utils.clickMarkInfoToNav()

        },
        /**
          * @method 关闭导航
          * @for template/nav/info.wxml
          * @param
          *      {object} e 事件对象
          */
        clickNavCancel(e) {
            // var mark_id = e.currentTarget.dataset.mark_id
            ar_utils.clickNavCancel()
        },

        

        /**
          * @method 开启导航的地图
          * @for template/map/map.wxml
          * @param
          *      {object} e 事件对象
          */
        clickNavAndMap(e) {
            // var mark_id = e.currentTarget.dataset.mark_id
            ar_utils.clickNavAndMap()
        },

        /**
          * @method 关闭导航的地图
          * @for template/map/map.wxml
          * @param
          *      {object} e 事件对象
          */
        clickNavMapOff(e) {
            // var mark_id = e.currentTarget.dataset.mark_id
            ar_utils.clickNavMapOff()
        },

        // /**
        //   * @method 关闭导航
        //   * @for template/map/map.wxml
        //   * @param
        //   *      {object} e 事件对象
        //   */
        // clickNavOff(e) {
        //     // var mark_id = e.currentTarget.dataset.mark_id
        //     ARUtils.clickNavOff()
        // },


        /************对外的接口 **************/

        /**
        * @method 设置
        * @for template/menu/base.wxml
        * @param
        *      {object} e 事件对象
        */
        clickOption(e) {
            // var mark_id = e.currentTarget.dataset.mark_id
            this.triggerEvent('clickOption');
        },

        /**
        * @method 搜索
        * @for template/menu/base.wxml
        * @param
        *      {object} e 事件对象
        */
        clickSearch(e) {
            // var mark_id = e.currentTarget.dataset.mark_id
            this.triggerEvent('clickSearch');
        },
        /**
        * @method 更多信息
        * @for template/map/map.wxml
        * @param
        *      {object} e 事件对象
        */
        clickMarkInfoToMore(e) {
            // var mark_id = e.currentTarget.dataset.mark_id
            this.triggerEvent('clickMarkInfoToMore');
        },
        

        /**
         * @method 过去当前经纬度
         * @for ar
         */
        getCurrentLocation() {
            wx.getLocation({
                type: 'gcj02',
                success(res) {
                    GP.setData({
                        GPSLocation: Location.create(res.latitude, res.longitude),
                        GPSAccuracy: res.accuracy,
                        GPSSpeed: res.speed,
                    })
                }
            })
        },
    }
})

