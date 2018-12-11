

// function create(latitue, longitude, name, style) {
//     return {
//         latitue: latitue,
//         longitude: longitude,
//         name: name,
//         style: style,
//     }
// }
module.exports = {
    GetPerspectiveTransImageList: GetPerspectiveTransImageList,
}



function GetPerspectiveTransImageList(value) {
    var change_list = []
    for (var i = 0; i < RULE_BASE_LIST.length; i++) {
        // var obj = {
        //     p1: { x: PerspectiveTrans(RULE_BASE_LIST[i].p1.x), y: PerspectiveTrans(RULE_BASE_LIST[i].p1.y) },
        //     p2: { x: PerspectiveTrans(RULE_BASE_LIST[i].p2.x), y: PerspectiveTrans(RULE_BASE_LIST[i].p2.y) },
        //     p3: { x: PerspectiveTrans(RULE_BASE_LIST[i].p3.x), y: PerspectiveTrans(RULE_BASE_LIST[i].p3.y) },
        //     p4: { x: PerspectiveTrans(RULE_BASE_LIST[i].p4.x), y: PerspectiveTrans(RULE_BASE_LIST[i].p4.y) },
        // }        
        accValue = value
        var obj = {
            p1: {
                x: PerspectiveTrans(RULE_BASE_LIST[i].p1.x, RULE_BASE_LIST[i].p1.y)['x'],
                y: PerspectiveTrans(RULE_BASE_LIST[i].p1.x, RULE_BASE_LIST[i].p1.y)['y']
            },
            p2: {
                x: PerspectiveTrans(RULE_BASE_LIST[i].p2.x, RULE_BASE_LIST[i].p2.y)['x'],
                y: PerspectiveTrans(RULE_BASE_LIST[i].p2.x, RULE_BASE_LIST[i].p2.y)['y']
            },
            p3: {
                x: PerspectiveTrans(RULE_BASE_LIST[i].p3.x, RULE_BASE_LIST[i].p3.y)['x'],
                y: PerspectiveTrans(RULE_BASE_LIST[i].p3.x, RULE_BASE_LIST[i].p3.y)['y']
            },
            p4: {
                x: PerspectiveTrans(RULE_BASE_LIST[i].p4.x, RULE_BASE_LIST[i].p4.y)['x'],
                y: PerspectiveTrans(RULE_BASE_LIST[i].p4.x, RULE_BASE_LIST[i].p4.y)['y']
            },
        }
        var new_obj = PoinToImage(obj)
        change_list.push(new_obj)
    }
    return change_list
}

var roll_angle = 30
var RULE_BASE_LIST = []
InitBaseLine() //初始化基础线条
function InitBaseLine() {
    for (var i = 0; i < 3; i++) {
        var _w = 50
        var _h = 50
        var _space = 10
        var _y_top = _h * (i + 1) + _space * i
        var _y_bottom = _h * i + _space * i


        RULE_BASE_LIST.push({
            p1: { x: -_w / 2, y: -_y_top }, p2: { x: _w / 2, y: -_y_top }, p3: { x: -_w / 2, y: -_y_bottom }, p4: { x: _w / 2, y: -_y_bottom },
        })
    }
}

var compassValue = 0
var accValue = 0
var CENTER = { x: 200, y: 325 }



function PoinToImage(obj) {

    // var shadow_list = []
    // for (var i = 0; i < RULE_BASE_LIST.length; i++) {
    var x = obj.p4.x
    var y = obj.p4.y
    var width = obj.p4.x - obj.p3.x
    var height = obj.p3.y - obj.p1.y
    var new_obj = {
        x: parseInt(obj.p1.x),
        y: parseInt(obj.p1.y),
        w: parseInt(Math.abs(width)),
        h: parseInt(Math.abs(height)),
    }
    return new_obj
    //         shadow_list.push(obj)
    //     }
    // return new_obj

}
