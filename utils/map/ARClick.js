
var GP
var ARBase = require("ARBase.js")
var SwitchUtils = require("SwitchUtils.js")
var ApiUtils = require("ApiUtils.js")

var CAMERA = {
    FULL:100,
    WINDOW:80,
}
/**
 * @extends ARBase
 */
class ARClick extends ARBase {
    constructor(options) {

        super(options);
        // console.log("ARBase", options)
        if (!options.GP) { throw Error('route值不能为空'); }
        GP = options.GP
        GP.setData({
            show: SwitchUtils.onLoad()
        })
    }

    /**
     * @method 打开mark详情
     * 
     * @param
     *      {number} mark_id mark的ID
     */
    clickMark(options) {
        var mark_id = options.mark_id
        GP.setData({
            show: SwitchUtils.onMarkInfo()
        })
    }

    /**
     * @method 关闭mark详情
     */
    clickMarkInfoCancel() {
        GP.setData({
            show: SwitchUtils.offMarkInfo()
        })
    }

    /**
     * @method 在mark详情中打开导航
     * @for ARUtils
     * @param
     *      {number} mark_id mark的ID
     */
    clickMarkInfoToNav(mark_id) {
        // console.log(mark_id.length)
        var that = this
        ApiUtils.getNavWalk(
            '22.8122400000,108.3995300000',
            "22.8194235482,108.3917355537",
            callback
        )

        function callback(routes) {
            // console.log(e)
            that.nav_utils.setRoute({ route: routes })
            that.nav_utils.start()

            GP.setData({
                show: SwitchUtils.onNav()
            })
        }
    }

    /**
     * @method 退出导航
     * 
     * @param
     *      {number} mark_id mark的ID
     */
    clickNavCancel(mark_id) {
        GP.setData({
            show: SwitchUtils.offNav()
        })
        this.nav_utils.close()
    }

    /**
     * @method 在nav中打开地图，并设置绘制导航路线
     */
    clickNavAndMap() {
        GP.setData({
            show: SwitchUtils.onNavMap(),
            cameraHeight: CAMERA.WINDOW,
        })
    }

    /**
     * @method 关闭导航地图
     */
    clickNavMapOff() {
        GP.setData({
            show: SwitchUtils.offNavMap(),
            cameraHeight: CAMERA.FULL,
        })
    }

    
}
module.exports = ARClick