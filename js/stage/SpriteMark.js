

var Sprite = require("Sprite.js")
/**
 * @method  Mark精灵
 *
 * 精灵数据原型
 * {
        id: 1, x: 10, y: 50, name: "水浒人家", distance: 500,
        latitude: 24.4972341880, longitude: 108.6384236813, compass_value: 0
    },
 * 
 */
class SpriteMark extends Sprite {
    constructor(options = {}) {
        super(options)
        this.id = options.id || -1
        this.name = options.name || "名字"
        this.title = options.title || "标题"
        this.latitude = options.latitude || 24.4972341880
        this.longitude = options.longitude || 108.6384236813
        this.distance = options.distance || 500
        this.compass_direction = options.compass_direction || 0
    }

    /**
     * 精灵渲染
     */
    static render(options = {}) {
        var _list = options.markList || []
        var _acc_z = options.acc_z || 0
        console.log(_list,_acc_z)
        return []
    }
}
module.exports = SpriteMark