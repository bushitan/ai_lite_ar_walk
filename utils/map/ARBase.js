
var GP 
class ARBase {
    name="tan"
    constructor(options){
        // console.log("ARBase", options)
        if (!options.GP) { throw Error('route值不能为空'); }
        GP = options.GP 
    }


    /**
     * @method 查询目标点
     * 
     * @param
     *      {Number} direction罗盘方向
     *      {Number} acc_z 罗盘方向
     */
    queryMark(options) {
        var key = options.key
        var _location = GP.data.GPSLocation
        ApiUtils.getMarkListByTXMap(key, "23.1290800000,113.2643600000", callback)
        function callback(res) {
            console.log(res)
            //TODO 把查询的腾讯值，改变为marklist
        }
    }


    /**
     * @method 过滤Z轴转动漂移
     * @for ARUtils
     * @param
     *      {object} GP 全局对象，
     * @return
     *      {number} s 两点距离
     */
    filterAccelerometerZ(valueZ) {
        return AccelerometerUtils.filterValueZ(valueZ)
    }


    /**
     * @method 过滤Z轴转动漂移
     * @for ARUtils
     * @param
     *      {number} direction 罗盘方向
     *      {number} acc_z Z轴姿势
     * @return
     *      {number} s 两点距离
     */
    filterCompassDirection(direction, acc_z) {
        direction = CompassUtils.filterDirection(direction)
        direction = CompassUtils.checkReverse(direction, acc_z)
        return direction
    }

}
module.exports = ARBase