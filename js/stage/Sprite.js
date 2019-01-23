

/**
 * @method  Sprite对象
 */
class Sprite {
    constructor(options = {}) {
        // super(options)
        // console.log("options.x")
        // console.log(options.x)
        // console.log(options.x || 0)
        this.x = options.x || 50
        this.y = options.y || 500
        this.width = options.width || 32
        this.height = options.height || 32
        this.icon = options.icon || ""
    }
    

}
module.exports = Sprite