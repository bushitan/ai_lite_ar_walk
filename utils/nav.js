
var roll_angle = 30
var RULE_BASE_LIST = [
    // {
    //     p1: { x: -25, y: -50 }, p2: { x: 25, y: -50 }, p3: { x: -25, y: 0 }, p4: { x: 25, y: 0 },
    // },
    // {
    //     p1: { x: -25, y: -150 }, p2: { x: 25, y: -150 }, p3: { x: -25, y: -100 }, p4: { x: 25, y: -100 },
    // },
    // {
    //     p1: { x: -50, y: -10 }, p2: { x: 50, y: -10 }, p3: { x: -50, y: 0 }, p4: { x: 50, y: 0 },
    // },
    // {
    //     p1: { x: -50, y: -25 }, p2: { x: 50, y: -25 }, p3: { x: -50, y: -15 }, p4: { x: 50, y: -15 },
    // },
    // {
    //     p1: { x: -50, y: -40 }, p2: { x: 50, y: -40 }, p3: { x: -50, y: -30 }, p4: { x: 50, y: -30 },
    // },
    // {
    //     p1: { x: -50, y: -55 }, p2: { x: 50, y: -55 }, p3: { x: -50, y: -45 }, p4: { x: 50, y: -45 },
    // },
    // {
    //     p1: { x: -50, y: -70 }, p2: { x: 50, y: -70 }, p3: { x: -50, y: -60 }, p4: { x: 50, y: -60 },
    // },
    // {
    //     p1: { x: -50, y: -85 }, p2: { x: 50, y: -85 }, p3: { x: -50, y: -75 }, p4: { x: 50, y: -75 },
    // },
    // {
    //     p1: { x: -50, y: -100 }, p2: { x: 50, y: -100 }, p3: { x: -50, y: -90 }, p4: { x: 50, y: -90 },
    // },
]
for (var i = 0 ;i<20;i++){
    var _w = 50
    var _h = 50
    var _space = 10
    var _y_top = _h * (i + 1) + _space * i
    var _y_bottom = _h * i+ _space * i 
    

    RULE_BASE_LIST.push({
        p1: { x: -_w / 2, y: -_y_top }, p2: { x: _w / 2, y: -_y_top }, p3: { x: -_w / 2, y: -_y_bottom }, p4: { x: _w / 2, y: -_y_bottom },
    })
}
var compassValue = 0

var CENTER = {x:200,y:325}

function AccelerometerToRollAngle(acc_value){
    return roll_angle

}


/**
 * 原始列表换算为投影列表
 * @for nav
 * @return 
 *      {number} v 投影后的值
 */
function GetCurrentNavIconist() {
    var shadow_list = []
    for (var i = 0; i < RULE_BASE_LIST.length; i++) {
        // var obj = {
        //     p1: { x: ValueToShadow(RULE_BASE_LIST[i].p1.x), y: ValueToShadow(RULE_BASE_LIST[i].p1.y) },
        //     p2: { x: ValueToShadow(RULE_BASE_LIST[i].p2.x), y: ValueToShadow(RULE_BASE_LIST[i].p2.y) },
        //     p3: { x: ValueToShadow(RULE_BASE_LIST[i].p3.x), y: ValueToShadow(RULE_BASE_LIST[i].p3.y) },
        //     p4: { x: ValueToShadow(RULE_BASE_LIST[i].p4.x), y: ValueToShadow(RULE_BASE_LIST[i].p4.y) },
        // }

        var x = ValueToShadow(RULE_BASE_LIST[i].p1.x)
        var y = ValueToShadow(RULE_BASE_LIST[i].p1.y)
        // var width = x + ValueToShadow(RULE_BASE_LIST[i].p2.x) - ValueToShadow(RULE_BASE_LIST[i].p1.x)
        // var height = y + ValueToShadow(RULE_BASE_LIST[i].p1.y) - ValueToShadow(RULE_BASE_LIST[i].p3.y)
        var height = x + ValueToShadow(RULE_BASE_LIST[i].p2.x) - ValueToShadow(RULE_BASE_LIST[i].p1.x)
        var width = y + ValueToShadow(RULE_BASE_LIST[i].p1.y) - ValueToShadow(RULE_BASE_LIST[i].p3.y)
        var obj = {
            x: parseInt(x),
            y: parseInt(y),
            w: parseInt(width),
            h: parseInt(height),
        }
        shadow_list.push(obj)
    }
    return shadow_list
}


/**
 * 点的投影
 * @for nav
 * @param
 *      {number} value 点的原始值，
 * @return 
 *      {number} v 投影后的值
 */
function ValueToShadow(value) {
    // var v = value * Math.sin(roll_angle)
    var v = value * Math.sin(Math.sin(roll_angle * Math.PI / 180) )     
    return Math.abs(v)
}









/**
 * 获取原始投影数组
 * @for nav
 * @return 
 *      {array} org_list 原始投影数组
 */
function GetPerspectiveOrgList(){
    return RULE_BASE_LIST
}

/**
 * 获取投影变换后的数组
 * @for nav
 * @return 
 *      {array} change_list 投影变换数组
 */
function GetPerspectiveTransList() {
    var change_list = []
    for (var i = 0; i < RULE_BASE_LIST.length; i++) {
        // var obj = {
        //     p1: { x: PerspectiveTrans(RULE_BASE_LIST[i].p1.x), y: PerspectiveTrans(RULE_BASE_LIST[i].p1.y) },
        //     p2: { x: PerspectiveTrans(RULE_BASE_LIST[i].p2.x), y: PerspectiveTrans(RULE_BASE_LIST[i].p2.y) },
        //     p3: { x: PerspectiveTrans(RULE_BASE_LIST[i].p3.x), y: PerspectiveTrans(RULE_BASE_LIST[i].p3.y) },
        //     p4: { x: PerspectiveTrans(RULE_BASE_LIST[i].p4.x), y: PerspectiveTrans(RULE_BASE_LIST[i].p4.y) },
        // }        
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
        // var new_obj = PoinToImage(obj)
        change_list.push(obj)
    }
    return change_list
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
        compassValue = value
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



function PoinToImage(obj){

        // var shadow_list = []
        // for (var i = 0; i < RULE_BASE_LIST.length; i++) {
            var x = obj.p4.x
            var y = obj.p4.y
            var width =  obj.p4.x - obj.p3.x
            var height= obj.p3.y - obj.p1.y 
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

function PerspectiveTrans(x,y,m){
    var m =
        [
            [1, 0 , 0],
            [0, 1, -0.01 * Math.abs(compassValue)],
            [0, 0, 1],
        ]

        // [
        // [Math.cos(60 * Math.PI / 180), Math.sin(60 * Math.PI / 180), 0],
        // [Math.sin(60 * Math.PI / 180), Math.cos(60 * Math.PI / 180), 0],
        // [0, 0, 1],
        // ]

    // float x = points[i];
    // float y = points[i + 1];
    // float denominator = a13 * x + a23 * y + a33;
    // points[i] = (a11 * x + a21 * y + a31) / denominator;
    // points[i + 1] = (a12 * x + a22 * y + a32) / denominator
    var _d = m[0][2] * x + m[1][2] * y + m[2][2]
    var _x = parseInt( (m[0][0] * x + m[1][0] * y + m[2][0]) / _d)
    var _y = parseInt( (m[0][1] * x + m[1][1] * y + m[2][1]) / _d)
    
    return {x:_x,y:_y}
}



module.exports = {
    GetCurrentNavIconist: GetCurrentNavIconist,
    GetPerspectiveOrgList: GetPerspectiveOrgList,
    GetPerspectiveTransList: GetPerspectiveTransList,
    GetPerspectiveTransImageList: GetPerspectiveTransImageList,
}