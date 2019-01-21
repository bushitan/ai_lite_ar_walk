

var point = {
    // 计算两个方向的夹角
    // TODO 慢慢检查计算结果 
    getIncludeAngle: function (selfVal, pointVal   ) {
        const ANGLE_FULL = 359 , ANGLE_HALF = 180
        if (selfVal > pointVal) { //手机 > 目标
            if (selfVal - pointVal <= ANGLE_HALF) //手机 - 目标 <= 180
                return pointVal - selfVal
            else
                return pointVal - selfVal - ANGLE_FULL 
        }
        else{
            if (pointVal - selfVal <= ANGLE_HALF) 
                return selfVal - pointVal
            else
                return ANGLE_FULL - pointVal + selfVal
        }
    },
    //计算屏幕X坐标
    getScreenX: function (angle) {
        var baseAngle = 60
        var screenWidth = 750
        var halfWidth = screenWidth / 2
        var baseStep = parseInt(screenWidth / baseAngle)
        if ( Math.abs(angle) > baseAngle)
            return 1000
        else 
            return halfWidth + baseStep * angle        
    },
    getScreenY: function (z) {
        var OFFSET_Y = 800   //顶部偏离高度
        var OFFSET_ACC = 300   //浮动范围
        return OFFSET_Y - OFFSET_ACC * Math.abs(z) - Math.abs(z)
    },

    
}
module.exports = point
