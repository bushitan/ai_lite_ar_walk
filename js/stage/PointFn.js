const ANGLE_FULL = 359, ANGLE_HALF = 180
var point = {
    // 计算两个方向的夹角
    // TODO 慢慢检查计算结果 
    getIncludeAngle: function (selfVal, pointVal   ) {
        
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
            if (angle > 0) return 630
            else return 10
        else 
            return halfWidth + baseStep * angle        
    },
    getScreenY: function (z) {
        var OFFSET_Y = 300   //顶部偏离高度
        var OFFSET_ACC = 300   //浮动范围
        return OFFSET_Y - OFFSET_ACC * Math.abs(z) - Math.abs(z)
    },

    //假设自身方向为0，顺时针旋转到目标的夹角
    getSelfAngle(selfVal, pointVal){
        if (selfVal > pointVal)  //自身大于比表
            return ANGLE_FULL - (selfVal - pointVal)
        else if (selfVal < pointVal) //自身小于目标
            return pointVal - selfVal
        else //两个一致
            return 0
    },
    
}
module.exports = point
