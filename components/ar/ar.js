
var ARUtils = require("../../utils/map/ARUtils.js")
var ApiUtils = require("../../utils/map/ApiUtils.js")
var Location = require("../../utils/map/Location.js")
var GP
var queryLock = true
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        markList: {
            type: Array,
            value: [
            ], 
            observer(newVal, oldVal) {
                // markList: [
                //     {
                //         id: 1, x: 10, y: 50, name: "水浒人家", distance: 500,
                //         latitude: 24.4972341880, longitude: 108.6384236813, compass_value: 0
                //     }
                var _list = []
                for (var i = 0; i < newVal.length;i++){
                    newVal[i].location =  Location.create(newVal[i].latitude, newVal[i].longitude)
                    _list.push(newVal[i])
                }
                return _list
            }
        },
        mode: {
            type: String,
            value: "normal", //auto
            observer(newVal, oldVal) {
                if (newVal != "normal")
                    return "custom"
            },
        },
        keyword: {
            type: String,
            value: "", 
            observer(newVal, oldVal) {
                if (this.data.mode == "normal")
                    // if (newVal != "")
                    if (queryLock == false)
                        ARUtils.queryMark(newVal)                
            },
        },
        power: { 
            type: String, 
            value: 'normal', 
            observer(newVal, oldVal) {
                var frameFre = 70
                if (newVal == "low") frameFre = 140
                if (newVal == "normal") frameFre = 70
                if (newVal == "high") frameFre = 30
                GP.setData({ GPSFrameFre: frameFre})
            }
        }

    },

    /**
     * 组件的初始数据
     */
    data: {
        //基础数据
        GPSFrameFre: 70, //获取GPS坐标频率(按罗盘转动次数)
        GPSAccuray: 30, //GPS的精度
        GPSSpeed: 5,//移动速度
        GPSLocation: { latitue: 23.1290800000, longitude: 113.2643600000 },


        //罗盘
        directionName: "东",

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
        this.onInit()
        queryLock = false
        // if()
        // console.log(this.data.keyword)
        ARUtils.queryMark(this.data.keyword)



        const context = wx.createCanvasContext('navCanvas',this)
        context.setStrokeStyle('#00ff00')
        context.setLineWidth(5)
        context.rect(0, 0, 200, 200)
        context.stroke()
        context.setStrokeStyle('#ff0000')
        context.setLineWidth(2)
        context.moveTo(160, 100)
        context.arc(100, 100, 60, 0, 2 * Math.PI, true)
        context.moveTo(140, 100)
        context.arc(100, 100, 40, 0, Math.PI, false)
        context.moveTo(85, 80)
        context.arc(80, 80, 5, 0, 2 * Math.PI, true)
        context.moveTo(125, 80)
        context.arc(120, 80, 5, 0, 2 * Math.PI, true)
        context.stroke()
        context.draw()
    },


    /**
     * 组件的方法列表
     */
    methods: {       
        /**
        * @method 初始化
        */
        onInit() {
            var _step = 0
            var _acc_z = 0.45
            // var tempAccZ = 0
            ARUtils.init(GP)
            ARUtils.render( 90, _acc_z)
            //开启罗盘
            wx.onCompassChange(function (res) {
                //更新位置
                _step++
                if (_step % GP.data.GPSFrameFre == 0) {
                    GP.getCurrentLocation()
                }
                var _direction = ARUtils.filterCompassDirection(res.direction, _acc_z) //校正方向
                ARUtils.render(_direction, _acc_z)//渲染
                // GP.setData({
                //     tempAccZ: tempAccZ
                // })
                
            })
            // wx.startAccelerometer({
            //     interval: 'game'
            // })
            //开启三轴陀螺仪
            // GP.setData({
            //     tempAccZ: 10
            // })
            wx.onAccelerometerChange(function (res) {
                // console.log(res.z)
                _acc_z = ARUtils.filterAccelerometerZ(res.z) //重力加速度
                
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
            ARUtils.clickMark(mark_id)
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
            ARUtils.clickMarkInfoCancel()
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
            ARUtils.clickMarkInfoToNav()

        },
        /**
          * @method 关闭导航
          * @for template/nav/info.wxml
          * @param
          *      {object} e 事件对象
          */
        clickNavCancel(e) {
            // var mark_id = e.currentTarget.dataset.mark_id
            ARUtils.clickNavCancel()
        },

        

        /**
          * @method 开启导航的地图
          * @for template/map/map.wxml
          * @param
          *      {object} e 事件对象
          */
        clickNavAndMap(e) {
            // var mark_id = e.currentTarget.dataset.mark_id
            ARUtils.clickNavAndMap()
        },

        /**
          * @method 关闭导航的地图
          * @for template/map/map.wxml
          * @param
          *      {object} e 事件对象
          */
        clickNavMapOff(e) {
            // var mark_id = e.currentTarget.dataset.mark_id
            ARUtils.clickNavMapOff()
        },

        /**
          * @method 关闭导航
          * @for template/map/map.wxml
          * @param
          *      {object} e 事件对象
          */
        clickNavOff(e) {
            // var mark_id = e.currentTarget.dataset.mark_id
            ARUtils.clickNavOff()
        },


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

