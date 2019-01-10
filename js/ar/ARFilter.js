

var ARBase = require("ARBase.js")
var GP
/**
 * @method  AR的基础类
 */
class ARFilter extends ARBase {
    constructor(options) {
        super(options)
        if (!options.hasOwnProperty('GP')) { throw Error('GP值不能为空'); }
        GP = options.GP

    }


}

module.exports = ARFilter