

var PointFn = require("../../js/stage/PointFn.js")
var NavFn = require("../../js/stage/NavFn.js")


var OFFSET_Y = 840   //基础高度
var ICON_RADIUS = 140
var ICON_RADIUS_HALF = ICON_RADIUS / 2
var ICON_BASE = 40
var ICON_RANGE = 100

var CIRCLE_LENGTH = 5
var CIRCLE_RADIUS = 50
var CIRCLE_RADIUS_HALF = CIRCLE_RADIUS / 2
var CIRCLE_BASE = 40
var CIRCLE_RANGE = 100

var SPACE_RADIUS = 30
var SPACE_3D = 16   //图标与方向3D效果的分离


class renderUtils {
    constructor(options) {

    }

    //渲染point
    point(pointList,d,z) { 
        for (var i = 0; i < pointList.length; i++) {
            var p = pointList[i]
            var angle = PointFn.getIncludeAngle(d, p.compass_direction)
            p.x = PointFn.getScreenX(angle)
            p.y = PointFn.getScreenY(z)
        }
        return pointList
    }
    //渲染中心图标
    center(z) {
        var z = (Math.abs(z)) * ICON_RANGE
        z = z + ICON_BASE
        z = parseInt(z)
        if (z > ICON_RADIUS)
            z = ICON_RADIUS
        return {
            y: OFFSET_Y,
            width: ICON_RADIUS,
            height: z,
        }
    }
    //渲染方向
    nav(nextDir, d, z) {

        var _list = [], _length = 5
        for (var i = 0; i < _length; i++) {
            _list.push({
                x: NavFn.getScreenX(),
                y: NavFn.getScreenY(),
                w: NavFn.getWidth(),
                h: NavFn.getHeight(),
            })
        }
        return _list
    }
}

module.exports = renderUtils
