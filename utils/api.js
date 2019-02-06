

var KEY_USER_ID = "USER_ID"
module.exports = {
    KEY_USER_ID: KEY_USER_ID,
    // KEY_SHOP_TRACE: "SHOP_TRACE",

    URL_USER_GET_ID: "http://127.0.0.1:8000/ai/lite/user/login/",

    URL_SHOP_ADD: "http://127.0.0.1:8000/ai/lite/shop/add/",
    URL_SHOP_LIST: "http://127.0.0.1:8000/ai/lite/shop/list/",
    URL_SHOP_GET: "http://127.0.0.1:8000/ai/lite/shop/get/",
    URL_SHOP_TRACE: "http://127.0.0.1:8000/ai/lite/shop/trace/",

    // USER_LOGIN: "http://127.0.0.1:8000/ai/lite/qiniu/token/",
    Login(){
        return new Promise(resolve => {
            wx.login({
                success: function (res) {
                    console.log(res)
                    resolve(res.code);
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



