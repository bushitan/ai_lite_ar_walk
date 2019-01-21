
// var Switch = require("Switch.js")
var GP
/**
 * @method  开关工具
 */
class SwitchUtils  {
    constructor(options = {}) {
        // if (!options.GP) { throw Error('GP值不能为空'); }
        // GP = options.GP
        this.closeAll()
    }
    _get(){
        return {
            menu: this.menu,
            navInfo: this.navInfo,
            navIcon: this.navIcon,
            navMark: this.navMark,
            mark: this.mark,
            markInfo: this.markInfo,
            map: this.map,
            mapIcon: this.mapIcon,
            mapCamera: this.mapCamera,

        }
    }
    closeAll() {
        this.menu = false
        this.navInfo = false
        this.navIcon = false
        this.navMark = false
        this.mark = false
        this.markInfo = false
        this.map = false
        this.mapIcon = false
        this.mapCamera = false
    }
    /**
     * 初始化 、打开mark
     */
    onMark() {
        this.menu = true
        this.mark = true
        return this._get()
    }
    /**
     * 打开信息
     */
    onInfo() {
        this.menu = true
        this.mark = true
        this.markInfo = true
        return this._get()
    }

    /**
     * 打开导航
     */
    onNav(){
        this.navInfo = true
        this.navIcon = true
        this.mapIcon = true
        this.navMark = true
        return this._get()
    }

    /**
     * 打开导航地图
     */
    onNavMap(){
        this.navInfo = true
        this.navIcon = true
        this.map = true
        this.mapCamera = true
        return this._get()
    }
}

var show = {

    //打开mark  
    onMark(){
        return {
            menu: true,
            navInfo : false,
            navIcon : false,
            navMark : false,
            mark: true,
            markInfo : false,
            map : false,
            mapIcon : false,
            mapCamera : false,
        }
    },
    onInfo() {
        return {
            menu: true,
            navInfo: false,
            navIcon: false,
            navMark: false,
            mark: true,
            markInfo: true,
            map: false,
            mapIcon: false,
            mapCamera: false,
        }
    },
    onNav() { 
        return {
            menu: false,
            navInfo: true,
            navIcon: true,
            navMark: true,
            mark: false,
            markInfo: false,
            map: false,
            mapIcon: true,
            mapCamera: false,
        }
    },
}

module.exports = show