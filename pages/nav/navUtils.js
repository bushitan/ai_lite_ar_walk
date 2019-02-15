var QQMapWX = require('../../utils/wexin/qqmap-wx-jssdk.min.js');
var qqmapsdk;
var KEY = "5KFBZ-OSU6F-SUPJ5-NJPMP-JYMU3-YCBZJ"
qqmapsdk = new QQMapWX({
    key: KEY,
});


var GeoFn = require('../../js/geo/geoFn.js');
class NavUtils {
    //初始化
    constructor(options) {

    }

    //初始化经纬度
    getLocation(){
        return new Promise(resolve => {
            
            //测试接口
            // resolve({
            //     latitude: 22.8365877155,
            //     longitude: 108.2939911945,
            //     accuracy:0,
            //     speed:0,
            // })      
            wx.getLocation({
                type: 'gcj02',
                success(res) {
                    resolve(res)
                }
            })
        })
    }

    //查询导航数据
    requestRoute(from_str, to_str) {
        return new Promise(resolve => {
            // 步行导航
            var opt = {
                //WebService请求地址，from为起点坐标，to为终点坐标，开发key为必填
                url: 'https://apis.map.qq.com/ws/direction/v1/walking/'
                    + '?from=' + from_str
                    + '&to=' + to_str
                    + '&key=' + KEY,
                method: 'GET',
                dataType: 'json',
                //请求成功回调
                success: function (res) {

                    function filter(routes) {
                        var coors = routes.polyline, pl = [];
                        var steps = routes.steps
                        console.log(steps)
                        //坐标解压（返回的点串坐标，通过前向差分进行压缩）
                        var kr = 1000000;
                        for (var i = 2; i < coors.length; i++) {
                            coors[i] = Number(coors[i - 2]) + Number(coors[i]) / kr;
                        }
                        for (var i = 0; i < steps.length; i++) {
                            steps[i].latitude = coors[steps[i].polyline_idx[0]]
                            steps[i].longitude = coors[steps[i].polyline_idx[1]]
                        }
                        routes.steps = steps
                        return routes
                    }
                    var _route = filter(res.data.result.routes[0])
                    resolve(_route)
                }
            };
            wx.request(opt);
        })
    }

    


    //更新下一步
    refreshNextStep(GP,step) {
        console.log(step)

        //与下一点的距离
        var _distance = GeoFn.distance(
            GP.data.latitude,
            GP.data.longitude,
            step.latitude,
            step.longitude,
        )
        //纵轴辅助计算距离
        var _dh = GeoFn.distance(
            GP.data.latitude,
            GP.data.longitude,
            step.latitude,
            GP.data.longitude,
        )

        //下一点的方向
        step.distance = _distance
        //角度 + 象限判断
        step.direction = GeoFn.compass(
            GP.data.latitude,
            GP.data.longitude,
            step.latitude,
            step.longitude,
            GeoFn.angle(_dh, _distance)  //角度计算
        )

        return step
    }

    getNextDir(GP, step) {
        console.log(step)

        //与下一点的距离
        var _distance = GeoFn.distance(
            GP.data.latitude,
            GP.data.longitude,
            step.latitude,
            step.longitude,
        )
        //纵轴辅助计算距离
        var _dh = GeoFn.distance(
            GP.data.latitude,
            GP.data.longitude,
            step.latitude,
            GP.data.longitude,
        )

        //下一点的方向
        step.distance = _distance
        //角度 + 象限判断
        step.direction = GeoFn.compass(
            GP.data.latitude,
            GP.data.longitude,
            step.latitude,
            step.longitude,
            GeoFn.angle(_dh, _distance)  //角度计算
        )
        return step
    }

    refreshFocusDis(focusList, latitude, longitude){
        //距离
        var _distance = GeoFn.distance(
            latitude,
            longitude,
            focusList[0].latitude,
            focusList[0].longitude,
        )
        //纵轴辅助计算距离
        var _dh = GeoFn.distance(
            latitude,
            longitude,
            focusList[0].latitude,
            longitude,
        )

        focusList[0].distance = _distance  
        focusList[0].compass_direction = GeoFn.compass(
            latitude,
            longitude,
            focusList[0].latitude,
            focusList[0].longitude,
            GeoFn.angle(_dh, _distance)  //角度计算
        )

        return focusList
    }


}

module.exports = NavUtils
