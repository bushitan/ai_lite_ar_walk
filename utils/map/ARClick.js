
var GP
var ARBase = require("ARBase.js")

/**
 * @extends ARBase
 */
class ARClick extends ARBase {
    constructor(options) {

        super(options);
        // console.log("ARBase", options)
        if (!options.GP) { throw Error('route值不能为空'); }
        GP = options.GP
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
        ApiUtils.getNavWalk(
            '22.8122400000,108.3995300000',
            "22.8194235482,108.3917355537",
            callback
        )
        function callback(routes) {
            // console.log(e)
            nav_utils.setRoute({ route: routes })
            nav_utils.start()

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
        nav_utils.close()
    }

    /**
     * @method 在nav中打开地图，并设置绘制导航路线
     */
    clickNavAndMap() {
        GP.setData({
            show: SwitchUtils.onNavMap()
        })
    }

    /**
     * @method 关闭导航地图
     */
    clickNavMapOff() {
        GP.setData({
            show: SwitchUtils.offNavMap()
        })
    }

    
}
module.exports = ARClick