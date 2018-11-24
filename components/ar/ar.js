// components/xx_cover_news/xx_cover_news.js
var GEO = require("../../utils/geo.js") 

var GP
var i = 0 //定时器，调用getLocation函数
var offset_line = 0  //水平面偏移量
Component({
    /**
     * 组件的属性列表
     */
    properties: {      
        markList: {
            type: Array,
            value: [
                { id:1, x: 10, y: 50, name: "景山公园", distance: 500,info:"/pages/logs/logs" },
                { id:2, x: 500, y: 300, name: "友爱电影厂", distance: 26, },
            ],
        },
            
        
    },

    /**
     * 组件的初始数据
     */
    data: {

        directionName:"东",
        //标记
        clickMarkID:2 ,//点击mark的id

        //导航
        navDirection: "", // 方向 参照：GEO.DIRECTION_LEFT 
        navIcon:"../../images/nav_front.png", //导航图标 
        navDistance:50 , //与下一导航点的距离
        isNav:false,//是否在导航
        navList:[],//导航点数组

        //菜单
        isPack:!false,
        clickMenuID:0,
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
        onInit(){
            GP.getLocation() //一开始就更新一次位置
            //开启罗盘
            wx.onCompassChange(function (res) {
                var abs = parseInt(res.direction / 4) * 4
                GP.render(res.direction)
                i++
                if (i % 70 == 0) {
                    GP.getLocation()
                }
            })
            //开启三周陀螺仪，计算水平面参数
            wx.onAccelerometerChange(function (res) {
                var z = res.z
                if (z > 1) z = 1
                if (z < -1) z = -1
                offset_line = parseInt(350 + z * 300)
            })

        },
        /*************标记***************/
        /**
         * @method 渲染标记列表
         * @for 标记
         * @param
         *      {number} value 手机方向数值
         */
        render(value){
            var _direction_name = GEO.compassToDirectionName(value)

            GP.setData({
                directionName: _direction_name
            })
        },

        /**
         * @method 更新手机经纬度
         * @for 标记
         */
        getLocation() {
            wx.getLocation({
                type: 'gcj02',
                success(res) {
                    const latitude = res.latitude
                    const longitude = res.longitude
                    const speed = res.speed
                    const accuracy = res.accuracy
                    console.log(latitude, longitude)
                    //TODO 测算与所有目标点的距离、方向角
                }
            })
        },

        /**
         * @method 点击标记
         * @for 标记
         * @param
         *      {object} e 点击事件对象
         */
        clickMark(e) {
            GP.setData({
                clickMarkID: e.currentTarget.dataset.mark_id
            })
        },

        /**
         * @method 点击详情
         * @for 标记
         * @param
         *      {object} e 点击事件对象
         */
        clickInfo(e) {
            var mark_id = e.currentTarget.dataset.mark_id
            //TODO  根据mark_id 去拿详情的操作指令。
            
            // wx.navigateTo({
            //     url: e.currentTarget.dataset.mark_id,
            // })
        },







        /*************导航***************/
        /**
         * @method 渲染标记列表
         * @for 导航
         */
        changeNavIcon(direction) { 
            var _icon_name = ""
            if (direction == GEO.DIRECTION_FRONT) _icon_name = "nav_front"
            if (direction == GEO.DIRECTION_LEFT) _icon_name = "nav_left"
            if (direction == GEO.DIRECTION_RIGHT) _icon_name = "nav_right"
            if (direction == GEO.DIRECTION_BACK) _icon_name = "nav_back"
            GP.setData({
                navIcon: "../../images/" + _icon_name +".png", 
            })
        },


        /*************菜单***************/
        /**
         * @method 菜单显示/隐藏切换
         * @for 菜单
         */
        menuChange(){
            
            GP.setData({ isPack: !this.data.isPack})
        },
        /**
         * @method 菜单选择
         * @for 菜单
         */
        menuClick(e){
            GP.setData({
                clickMenuID: e.currentTarget.dataset.menu_id
            })
        },


    }
})
