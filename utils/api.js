

var KEY_USER_ID = "USER_ID"
// const URL = "http://127.0.0.1:8000"
const URL = "http://192.168.200.101:8000"

module.exports = {
    KEY_USER_ID: KEY_USER_ID,
    // KEY_SHOP_TRACE: "SHOP_TRACE",

    URL_USER_GET_ID: URL+ "/ai/lite/user/login/",  //用户登录

    URL_SHOP_ADD: URL +"/ai/lite/shop/add/", //增加、更新店铺
    URL_SHOP_DELETE: URL +"/ai/lite/shop/delete/", //删除店铺
    URL_SHOP_LIST: URL +"/ai/lite/shop/list/",//获取店铺列表
    URL_SHOP_GET: URL +"/ai/lite/shop/get/", //获取店铺内容
    URL_SHOP_TRACE: URL +"/ai/lite/shop/trace/",//获取用户记录

    // USER_LOGIN: "http://127.0.0.1:8000/ai/lite/qiniu/token/",
    Login(){
        return new Promise(resolve => {
            wx.login({
                success: function (res) {
                    console.log(res)
                    resolve(res.code)
                }
            })
        })
    },


    Request(options){
        return new Promise(resolve => {

            var data = options.data || {}
            data['user_id'] = wx.getStorageSync(KEY_USER_ID)
            wx.request({
                url: options.url,
                data:data,
                success: function (res) {
                    options.success(res)
                    resolve(res);
                },
                fail: function (res) {
                    if (options.hasOwnProperty("fail")) options.fail(res)
                    resolve(res);
                },
                complete: function (res) {
                    if (options.hasOwnProperty("complete")) options.complete(res)
                }
            })
        })
    },
}



