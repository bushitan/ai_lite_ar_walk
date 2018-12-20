//wxml控制开关

module.exports = {
    onLoad: onLoad,
    onMarkInfo: onMarkInfo,
    offMarkInfo: offMarkInfo,
    onNav: onNav,
    offNav: offNav,
    onNavMap: onNavMap,
    offNavMap: offNavMap,
}


/**
 * @method 初始化开关
 * @for SwitchUtils
 */
function onLoad(){
    var show = turnOffAll()
    show.menu = true
    show.mark = true
    // show.markInfo = true
    return show
}

/**
 * @method 打开markInfo
 * @for SwitchUtils
 */
function onMarkInfo() {
    var show = onLoad() //先打开基础的页面
    show.markInfo = true
    return show
}
/**
 * @method 打开markInfo
 * @for SwitchUtils
 */
function offMarkInfo() {
    var show = onLoad() //先打开基础的页面
    return show
}


/**
 * @method 打开nav导航
 * @for SwitchUtils
 */
function onNav() {
    var show = turnOffAll() //先打开基础的页面
    show.navInfo = true
    show.navIcon = true
    show.mapIcon = true
    show.navMark = true
    return show
}

/**
 * @method 打开nav导航
 * @for SwitchUtils
 */
function offNav() {
    var show = onMarkInfo() //先打开基础的页面
    return show
}


/**
 * @method 打开导航和地图 
 * @for SwitchUtils
 */
function onNavMap() {
    var show = turnOffAll() //先打开基础的页面
    show.navInfo = true
    show.navIcon = true
    show.map = true
    show.mapCamera = true
    // show.navInfo = true
    return show
}

/**
 * @method 关闭导航地图 
 * @for SwitchUtils
 */
function offNavMap() {
    var show = onNav()
    return show
}



/**
 * @method 关闭所有开关
 * @for SwitchUtils
 * @return
 *      {object} 开关封装对象
 */
function turnOffAll(){
    return {
        menu: false,
        navInfo: false,
        navIcon: false,
        navMark: false,
        mark: false,
        markInfo: false,
        map: false,
        mapIcon:false,
        mapCamera: false,

    }
}