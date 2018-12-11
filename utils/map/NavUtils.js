

var Location = require("../../utils/map/Location.js")
var tempImageList = []
var navInfo = {} // 路线信息
var navPolyLine = [] //路线坐标点串
var navIndex = 0 //当前b步数
var navStepList = [] //路线步骤
//设置导航路线
SetNavInit()
function SetNavInit() {
    navInfo = {                                         //路线方案，目前只提供一种
        "mode": "WALKING",                               //出行方式
        "distance": 38385,                               //方案总距离（单位：米）
        "duration": 581,                                 //方案估算时间（含路况，单位：分钟）
        "direction": "东",                               //方案整体方向
    }
    navPolyLine = [39.915219, 116.403857, 0, 12, 40, 1180, 40, 1520, 0, 80]
    for (var i = 2; i < navPolyLine.length; i++) {
        navPolyLine[i] = navPolyLine[i - 2] + navPolyLine[i] / 1000000
    }
    navStepList = [
        {                                           //第一阶段路线,起始位置，该阶段路线描述
            "instruction": "从起点朝东,沿东华门大街步行239米,直行进入东安门大街",
            "polyline_idx": [navPolyLine[0], navPolyLine[9]],                   //路线在【路线坐标点串】数组中的下标0-9
            "road_name": "东华门大街",               //道路名称(非必有)
            "dir_desc": "东",                        //路线方向
            "distance": 239,                         //路线距离（单位：米）
            "act_desc": "直行"                       //路线末尾动作（非必有）
        },
        {                                           //最终阶段路线
            "instruction": "步行255米,到达终点",
            "polyline_idx": [1556, 1567],
            "road_name": "",
            "dir_desc": "东",
            "distance": 255,
            "act_desc": ""
        }
    ]
}



function create(request ) {

    return {
        info: navInfo,
        stepList: navStepList,
    }
}
module.exports = {
    create: create
}