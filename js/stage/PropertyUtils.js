

var Sprite = require("Sprite.js")
var SpriteMark = require("SpriteMark.js")
var PropertyUtils = {

    //更新标记点数组
    pointList:function(list){

        var _org_list = list
        var _list = []
        for (var i = 0; i < _org_list.length; i++) {
            var _m = _org_list[i]
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

    //更新手机罗盘方向
    direction: function (direction,accZ){
        //防止手机抖动矫正
        direction = parseInt(direction / 4) * 4 
        //手机俯仰方向矫正
        if (accZ > 0) {
            if (direction >= 180) direction = direction - 180
            else direction = direction + 180            
        }
        return parseInt(direction)
    },

}
module.exports = PropertyUtils