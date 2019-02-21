

var KEY_USER_ID = "USER_ID"
// const URL = "http://127.0.0.1:8000"
// const URL = "http://192.168.200.101:8000"
// const URL = "http://192.168.1.101:8000"
const URL = "https://www.51zfgx.com"
// const URL = "http://192.168.43.113:8000"


// const APPID = "wxd2f409241725502b" //找店店
const APPID = "wx7500cd1b23a33998" //咖啡小地图

module.exports = {
    KEY_USER_ID: KEY_USER_ID,
    // KEY_SHOP_TRACE: "SHOP_TRACE",

    URL_QINIU_TOKEN: URL + "/ai/lite/qiniu/token/",  //上传token
    URL_QINIU_UPLOAD : 'https://up.qbox.me',

    URL_USER_GET_ID: URL+ "/ai/lite/user/login/",  //用户登录

    URL_SHOP_ADD: URL +"/ai/lite/shop/add/", //增加、更新店铺
    URL_SHOP_DELETE: URL + "/ai/lite/shop/delete/", //删除店铺
    URL_SHOP_LIST: URL + "/ai/lite/shop/list/",//获取店铺列表
    URL_SHOP_LIST_SEARCH: URL + "/ai/lite/shop/list/search/",//搜索店铺列表
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
            data['app_id'] = APPID
            wx.request({
                url: options.url,
                data:data,
                success: function (res) {
                    if (options.hasOwnProperty("success")) options.success(res)
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


    // 七牛上传封装
    Qiniu(filepath){
        return new Promise(resolve => {
            this.QiniuToken().then((res) => {
                var options = {
                    "filepath": filepath,
                    "key": res.data.key,
                    "token": res.data.uptoken,
                }
                this.QiniuUpload(options).then((res)=>{
                    resolve(res);
                })
            })
        })
    },
    /**
     * 方法：获取token
     */
    QiniuToken() {
        return new Promise(resolve => {
            wx.request({
                url: this.URL_QINIU_TOKEN,
                success: function (res) {
                    // console.log("uploadQiniuImage", res)
                    resolve(res);
                },
            })
        })
    },
    // 上传七牛云
    // 上传的详细参数
    // {
    //     filePath: "",
    //     key: "",
    //     token: "",
    //     success: "",
    //     fail: "", 
    //     complete: "", 
    // }
    QiniuUpload(options) {
        // var that = this
        return new Promise(resolve => {
            // var filePath = node.attrs.src
            wx.uploadFile({
                url: "https://up.qbox.me",
                // filePath: tempFilePaths[0],//图片
                // filePath: node.attrs.src,//小视频
                filePath: options.filepath,//小视频
                name: 'file',
                formData: {
                    'key': options.key,
                    'token': options.token,
                },
                success: function (res) {
                    if (options.hasOwnProperty("success")) options.success(res)
                    resolve(options.key);
                   
                    // if (options.hasOwnProperty("fail")) options.fail(res)
                    // resolve(res);
                    // console.log("in uploadQiniuImage ")
                    // node.attrs.src = "http://img.12xiong.top/" + key;
                    // node.attrs._uploaded = true;
                    // resolve(res);
                },
                fail(res) {

                    if (options.hasOwnProperty("success")) options.fail(res)
                    resolve(res);

                    // if (GP.uploadFailAction != undefined)
                    //     GP.uploadFailAction()
                },
                complete: function (res) {
                    if (options.hasOwnProperty("complete")) options.complete(res)
                }
            })
        })
    },
}



