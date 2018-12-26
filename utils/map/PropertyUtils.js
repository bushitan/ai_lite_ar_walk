

var MarkUtils = require("MarkUtils.js")

var MODE_NORMAL = "normal"  //内置搜索导航
var MODE_CUSTOM = "custom"  //自定义mark点
var currentMode = MODE_NORMAL
class PropertyUtils {

    /**
     * 构造函数
     * 
     * @param {Object} options 接口参数,key 为必选参数
     */
    constructor(options) {
        // if (!options.key) {
        //     throw Error('key值不能为空');
        // }
        // this.key = options.key;
    }


    /**
     * 构造函数
     * 
     * @param {Object} options 接口参数,list 为必选参数
     */
    filterCustomMarkList(options){
        options = options || {};
        if (!options.list) {
            throw Error('list值不能为空');
        }

        var _org_list = options.list

        var MODE_NORMAL = "normal"
        var MODE_CUSTOM = "custom"
        console.log(_org_list)
        var _list = MarkUtils.filterCustomList(_org_list)

        return _list
    }

    /**
     * 设置moded查询方式
     * 
     * @param {Object} options 接口参数,mode 为必选参数
     */
    setMode(options){
        var that = this;
        options = options || {};

        if (!options.mode) {
            throw Error('mode值不能为空');
        }

        if (options.mode == MODE_CUSTOM )
            currentMode = MODE_CUSTOM
        else
            currentMode = MODE_NORMAL
    }

    /**
     * 检测mode是否为正常模式
     * 
     * @return {Boolean} true：正常模式， false:自定义模式
     */
    checkModeIsNormal(){
        if (currentMode == MODE_NORMAL)
            return true
        else
            return false
    }

    /**
     * 过滤keyword
     * 
     * @param {Object} options 接口参数,key 为必选参数
     */
    filterKeyword(options) {
        return options.keyword
    }

    /**
     * 过滤keyword
     * 
     * @param {Object} options 接口参数,power 为必选参数
     * @return {Number} GPS刷新帧间隔(5帧/s)
     */
    filterPower(options) {
        options = options || {};
        if (!options.power) {
            throw Error('list值不能为空');
        }

        var _p = options.power
        var _fram_fre = 70
        if (_p == "low") _fram_fre = 140
        if (_p == "normal") _fram_fre = 70
        if (_p == "high") _fram_fre = 30
        return _fram_fre
    }
    
}
module.exports = PropertyUtils;