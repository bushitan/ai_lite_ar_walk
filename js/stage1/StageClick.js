
var StagePropertyFilter = require("StagePropertyFilter.js")
var SwitchUtils = require("SwitchUtils.js")
var GP
/**
 * @method  StagePropertyFilter过滤接口信息
 */
var Utils = {
    /**
     * 获取mark的详细信息
     */
    getMarkInfo(markList,markID){
        var _list = markList
        var _info = {}
        for (var i = 0; i < _list.length;i++){
            if(_list[i].id == markID)
                _info = {
                    id:_list[i].id,
                    title: _list[i].title,
                    distance: _list[i].distance,
                    address: _list[i].address,
                    des: _list[i].category,
                }
        }
        return _info
    },
}
class StageClick extends StagePropertyFilter {
    constructor(options) {
        super(options)
        if (!options.GP) { throw Error('GP值不能为空'); }
        GP = options.GP
    }
    /**
     * @method 打开mark详情
     * 
     * @param
     *      {number} mark_id mark的ID
     */
    clickMark(options) {
        var _mark_id = options.mark_id
        var s = new SwitchUtils()
        GP.setData({
            markInfo: Utils.getMarkInfo(GP.data.list,_mark_id),
            show: s.onInfo() ,
        })
    }

    /**
     * @method 关闭mark详情
     */    
    clickMarkInfoCancel() {
        var s = new SwitchUtils()
        GP.setData({
            show: s.onMark(),
        })
    }


    /**
     * @method 关闭mark详情
     */
    clickNavCancel() {
        var s = new SwitchUtils()
        GP.setData({
            show: s.onMark(),
        })
    }


    /**
     * @method 打开地图
     */
    clickNavAndMap(){
        var s = new SwitchUtils()
        GP.setData({
            show: s.onNavMap(),
            cameraHeight: 80,
            navOffsetY: 640,
        })
    }


    /**
     * @method 关闭地图
     */
    clickNavMapOff() {
        var s = new SwitchUtils()
        GP.setData({
            show: s.onNav(),
            cameraHeight:100,
            navOffsetY:840,
        })

    }



    /**
     * 设置mark模式
     */
    setModeMark() { 
        var s = new SwitchUtils()
        return s.onMark()
        // this.GP.setData({
        //     show:s.onMark()
        // }) 
    }


    /**
     * 设置导航模式
     */
    setModeNav() {
        var s = new SwitchUtils()
        return s.onNav()
        // this.GP.setData({
        //     show: s.onNav()
        // }) 
    }

}
module.exports = StageClick