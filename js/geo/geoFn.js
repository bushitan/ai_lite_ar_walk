


module.exports = {

    //两点间距离
    distance( latA, lngA , latB , lngB) {
        // if (!options.hasOwnProperty("locationA")) { throw Error('A值不能为空'); }
        // if (!options.hasOwnProperty("locationB")) { throw Error('B值不能为空'); }
        var A = { latitue: latA, longitude: lngA}
        var B = { latitue: latB, longitude: lngB}
        const EARTH_RADIUS = 6378137.0;
        var radLat1 = (A.latitue * Math.PI / 180.0);
        var radLat2 = (B.latitue * Math.PI / 180.0);
        var a = radLat1 - radLat2;
        var b = (A.longitude - B.longitude) * Math.PI / 180.0;
        var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) +
            Math.cos(radLat1) * Math.cos(radLat2) *
            Math.pow(Math.sin(b / 2), 2)));
        s = s * EARTH_RADIUS;
        s = Math.round(s * 10000) / 10000;
        return parseInt(s);
    },

    //罗盘方向角
    compass(latA, lngA, latB, lngB) {
        var A = { latitue: latA, longitude: lngA }
        var B = { latitue: latB, longitude: lngB }
        var D = { latitue: A.latitue, longitude: B.longitude }
        // var D = Location.create(A.latitue, B.longitude) //水平辅助点
        var _distance = this.getDistanceAB({ locationA: A, locationB: B })
        var _duan = this.getDistanceAB({ locationA: A, locationB: D })
        var value = 180 * Math.asin(_duan / _distance) / Math.PI
        //TODO 四个象限
        return parseInt(value)
    }

    
}

