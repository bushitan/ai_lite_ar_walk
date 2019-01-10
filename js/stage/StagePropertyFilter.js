var StageBase = require("StageBase.js")
var Sprite = require("Sprite.js")
var SpriteMark = require("SpriteMark.js")
/**
 * @method  StagePropertyFilter过滤接口信息
 */
var Utils = {

    /**
     * 获取marklist列表
     */
    getMarkList(list) {
        var _org_list = list
        var _list = []
        for (var i = 0; i < _org_list.length; i++) {
            var _m = _org_list[i]

            // if (_m.style != "location") { throw Error('对象style不为location') }   

            var _sprite = new SpriteMark({
                id: _m.id,
                title: _m.title,
                // address: _m.address,
                // category: _m.category,
                latitue: _m.latitue,
                longitude: _m.longitude,
                distance: _m.distance,
                compass_direction: _m.compass_direction, 
            }) //创建mark精灵
            _list.push(_sprite)
        }
        return _list
    },

    /**
    * 罗盘抖动矫正
    */
    getDirectionShake(direction) {
        var abs = parseInt(direction / 4) * 4
        return parseInt(abs)
    },
     /**
     * 罗盘逆转
     */
    getDirectionReverse(direction, acc_z) {
        if (acc_z <= 0)
            return parseInt(direction)
        else {
            if (direction >= 180) {
                direction = direction - 180
                return parseInt(direction)
            }
            else {
                direction = direction + 180
                return parseInt(direction)
            }
        }
    },



}
class StagePropertyFilter extends StageBase{
    constructor(options) {
        super(options)
        // if (!options.GP) { throw Error('GP值不能为空'); }
    }

    /**
     * @method 过滤marklist数组
     */
    filterMarkList(options = {}) {
        if (!options.hasOwnProperty('list')) {throw Error('list值不能为空')}    
        var _list = options.list
        var _list = Utils.getMarkList(_list)
        return _list
    }

    /**
     * @method 罗盘方向
     */
    filterDirection(options = {}) {
        if (!options.hasOwnProperty("direction")) { throw Error('direction值不能为空') }
        if (!options.hasOwnProperty("acc_z")) { throw Error('acc_z值不能为空') }

        var _d = options.direction
        var _acc_z = options.acc_z
        _d = Utils.getDirectionShake(_d)
        _d = Utils.getDirectionReverse(_d, _acc_z)
        return _d
    }

    /**
    * @method 过滤nav导航数组
    */
    filterNavList(options = {}) {
        if (!options.hasOwnProperty('list')) { throw Error('list值不能为空') }
        var _list = options.list
        var _list = Utils.getMarkList(_list)
        return _list
    }


    /**
    * @method 过滤地图路径
    */
    filterMapPolyline(options = {}) {
        if (!options.hasOwnProperty('polyline')) { throw Error('polyline值不能为空') }
        var _polyline = options.polyline
        // console.log(_polyline,"poliline")
        // _polyline = [23.128729, 113.264359, 23.128729, 113.264259, 23.128729, 113.264259]

        var _points = []
        for (var i = 0; i < _polyline.length;i=i+2){
            _points.push({
                latitude: _polyline[i],
                longitude: _polyline[i+1],
            })
        }

        var _latitude = _polyline[0]
        var _longitude = _polyline[1]
        var _polyline_list = [{
            points: _points,
            color:"#FF0000DD",
            width:5,
            borderWidth:3,
        }]

        return {
            latitude: _latitude,
            longitude: _longitude,
            polyline:_polyline_list,
        }
    }

    /**
     * @method 过滤地图路径
    * @des 0 手机GPS / 1 起点  / 2 终点
     */
    filterMarkerInit(options = {}) {
        if (!options.hasOwnProperty('start')) { throw Error('start值不能为空') }
        if (!options.hasOwnProperty('end')) { throw Error('end值不能为空') }
        var _start = options.start
        var _end = options.end
        var _icon_width = 32
        var markers = [
            {  //开始点
                iconPath: '../../images/nav_icon_center.png', id: 0,
                latitude: _start.latitude, longitude: _start.longitude,
                width: _icon_width, height: _icon_width
            },
            {   //结束点
                iconPath: '../../images/menu_address.png', id: 1,
                latitude: _end.latitude, longitude: _end.longitude,
                width: _icon_width, height: _icon_width
            },
            { //手机位置
                iconPath: '../../images/map_hero.png', id: 2,
                latitude: _start.latitude, longitude: _start.longitude,
                width: _icon_width, height: _icon_width
            },
        ]

        return markers
    }

    /**
    * @method 过滤0手机在地图上的标注点  
    */
    filterMarkerGPS() {
        if (!options.hasOwnProperty('markers')) { throw Error('markers值不能为空') }
        if (!options.hasOwnProperty('gps')) { throw Error('gps值不能为空') }
        var _markers = options.markers
        var _gps = options.gps
        _markers[2].latitude = _gps.latitude
        _markers[2].longitude = _gps.longitude
        return markers 
        // for(var i=0;i<_markers.length;i++){
        //     if (_markers[i].id == 2) {
        //         _markers[i].latitude = _gps.latitude
        //         _markers[i].longitude = _gps.longitude
        //     }
        // }  

        // var markers = [{
        //     iconPath: '../../images/menu_address.png',
        //     id: 0,
        //     latitude: _obj.latitude,
        //     longitude: _obj.longitude,
        //     width: 32,
        //     height: 32
        // }]
        


    }
}
module.exports = StagePropertyFilter