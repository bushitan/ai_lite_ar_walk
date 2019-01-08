

/**
 * @method  地理位置基础类
 */
class Location {
    constructor(options = {}) {
        this.style = "location"
        this.id = options.id
        this.title = options.title
        this.address = options.address
        this.category = options.category
        this.latitue = options.latitue
        this.longitude = options.longitude
        this.distance = options.distance
        this.compass_direction = options.compass_direction
    }
    getString(){
        return String(this.latitue) + "," + String(this.longitude)
    }
}

module.exports = Location