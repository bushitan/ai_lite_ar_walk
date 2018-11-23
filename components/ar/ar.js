// components/xx_cover_news/xx_cover_news.js
var GEO = require("../../utils/geo.js") 

var GP
var i = 0
var roll_z = 0
Component({
    /**
     * 组件的属性列表
     */
    properties: {      
        markList: {
            type: Array,
            value: [
                { id:1, x: 10, y: 50, name: "景山公园", distance: 500, },
                { id:2, x: 500, y: 300, name: "友爱电影厂", distance: 26, },
            ],
        },
            
        
    },

    /**
     * 组件的初始数据
     */
    data: {
        //标记
        clickMarkID:2 ,//点击mark的id

        //导航
        navDirection: "", // 方向 参照：GEO.DIRECTION_LEFT 
        navIcon:"../../images/nav_front.png", //导航图标 
        navDistance:50 , //与下一导航点的距离
        isNav:false,//是否在导航
        navList:[],//导航点数组
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

        },

        //标记
        /**
         * @method 点击标记
         * @for 标记
         * @param
         *      {object} e 点击事件对象
         */
        clickMark(e){
            GP.setData({
                clickMarkID:e.currentTarget.dataset.mark_id
            })
           
        },

        /**
         * @method 渲染标记列表
         * @for 标记
         */
        render(){},

        //导航
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


    }
})
