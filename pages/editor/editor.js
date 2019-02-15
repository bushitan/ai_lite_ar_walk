
var GP
var APP = getApp()
const API = require("../../utils/api.js");
var KEY


Page({
    data: {
        // male: ['男', '女'],
        // area:['北京','广西','天津','广东'],
        // userInfo:{},
        // lock:false,
        // bb:"43243254",
        color:"#ffbc34",
        isNewCover:false,
        shop: {
            'shop_id': "",
            'cover': "",
            'name': "",
            'title': "",
            'summary': "",
            'content': "",
            'address': "",
            'latitude': "",
            'longitude': "",
        },
    },
    onLoad: function (options) {
        GP = this
        console.log(options)
        if (options.hasOwnProperty("shop_id")){
            var shop = GP.data.shop
            shop["shop_id"] = options.shop_id
            GP.setData({ shop: shop})
            GP.getContent(options.shop_id)
        }
        // GP.onInit()
    },

    //获取内容
    getContent(shop_id) {
        wx.showLoading({
            title: '数据加载中',
        })
        return API.Request({
            url: API.URL_SHOP_GET,
            data: { shop_id: shop_id },
            success: function (res) {
                GP.setData({
                    shop: res.data.shop,
                })
                wx.hideLoading()
            },
        })
    },

    //确定更新
    confirm(){
        if (GP.data.isNewCover)
            API.Qiniu(GP.data.shop.cover).then((key) =>{

                var shop = GP.data.shop
                shop.cover = "http://img.12xiong.top/" + key
                GP.setData({
                    shop: shop,
                })
                a()
            })
        else 
            a()

        function a(){
            var options = {
                url: API.URL_SHOP_ADD,
                data: GP.data.shop,
            }
            API.Request(options).then((res) => {
                var pages = getCurrentPages();
                var prePage = pages[pages.length - 2];
                prePage.setData({
                    shopList: res.data.shop_list
                })
                wx.showModal({
                    title: res.data.msg,
                    content: '',
                    showCancel: false,
                    confirmText: "返回",
                    success() {
                        wx.navigateBack({})
                    },
                })
            })
        }
        // API.QiniuToken().then( (res)=>{
        //     console.log(res)
            
            // API.Request({
            //     url: API.URL_SHOP_ADD,
            //     data: GP.data.shop,
            //     success: function (res) {
            //         var pages = getCurrentPages();
            //         var prePage = pages[pages.length - 2];
            //         prePage.setData({
            //             shopList: res.data.shop_list
            //         })
            //         wx.showModal({
            //             title: res.data.msg,
            //             content: '',
            //             showCancel: false,
            //             confirmText: "返回",
            //             success() {
            //                 wx.navigateBack({})
            //             },
            //         })
            //     },
            // })
        // })
       
    },

    /*******编辑内容模块*****/

    //选择图片
    chooseImage(){
        console.log("upload")
        wx.chooseImage({
            count:1,
            sizeType:'compressed',
            success: function(res) {
                // GP.setData({ 
                //     isNewCover: true,
                // })
                console.log(res)
                var shop = GP.data.shop
                shop.cover = res.tempFilePaths[0]
                GP.setData({ 
                    isNewCover: true,
                    shop: shop,
                })
            },
        })
    },
    
    //基础输入数据更新
    inputBase(key, value) {
        var shop = GP.data.shop
        shop[key] = value
        GP.setData({
            shop: shop
        })
    },

    //输入名称
    inputName(e) { GP.inputBase("name", e.detail) },
    //输入标题
    inputTitle(e) { GP.inputBase("title", e.detail) },
    //输入简介
    inputSummary(e) { GP.inputBase("summary", e.detail) },
    //事件：输入商铺定位
    inputLocation() {
        wx.chooseLocation({
            success(res) {
                console.log(res)
                GP.inputBase("address", res.address)
                GP.inputBase("latitude", res.latitude)
                GP.inputBase("longitude", res.longitude) 
            }
        })
    },
    inputAddress(e) { GP.inputBase("address", e.detail) },
    //导航：内容编辑框
    toContent(){
        wx.setStorageSync("temp_content", GP.data.shop.content)
        wx.navigateTo({
            url: '/pages/content/content',
        })
    },











    back(){
        wx.navigateBack({
            
        })
    },

    inputPhone(e) {
        var _userInfo = GP.data.userInfo
        _userInfo.phone = e.detail
        GP.setData({
            userInfo: _userInfo
        })
    },
    inputCompany(e) {
        var _userInfo = GP.data.userInfo
        _userInfo.company = e.detail
        GP.setData({
            userInfo: _userInfo
        })
    },

    inputTaxpayerNumber(e) {
        var _userInfo = GP.data.userInfo
        _userInfo.taxpayer_number = e.detail
        GP.setData({
            userInfo: _userInfo
        })
    },

    inputCompanyAddress(e) {
        var _userInfo = GP.data.userInfo
        _userInfo.company_address = e.detail
        GP.setData({
            userInfo: _userInfo
        })
    },

    inputBankAccount(e) {
        var _userInfo = GP.data.userInfo
        _userInfo.bank_account = e.detail
        GP.setData({
            userInfo: _userInfo
        })
    },


    selectMale(e) {
        var index = e.detail
        console.log(GP.data.male[index])
    },
    selectArea(e){
        var index = e.detail
        console.log(GP.data.area[index])
    },

    /**
     *  进入渠道：
     * 1 、 文章进入，有点播
     * 2、 供求、花名册、会员，没有点播
     */
    onInit: function (options) {
        API.Request({
            url: API.MEET_SIGN_GET_INFO,
            success: function (res) {
                console.log(res)
                GP.setData({
                    userInfo: res.data.dict_attendee
                })
            }
        })

        // 获取入场券信息
        API.Request({
            url: API.MEET_SIGN_PAY_GET_INFO,
            success: function (res) {
                console.log(res)
                GP.setData({
                    signList: res.data.list_sign
                })
                // wx.setStorageSync(KEY.USER_INFO, res.data.dict_attendee)
            }
        })
    },

    // 上传信息
    updateInfo(){
        wx.showToast({
            title: '店铺信息上传中',
            icon:"loading",
            success(){
                setTimeout(function () {
                    wx.showToast({
                        title: '上传成功',
                        success() {
                            setTimeout(function () {
                                wx.navigateBack({
                                })
                            },1000)                           
                        }
                    })
                },1500)
            }
        })
        return 

        var userInfo = GP.data.userInfo
        if (userInfo.name == "" || userInfo.company == "" || userInfo.phone == "") {
            var n = userInfo.name == "" ? "姓名  " : ""
            var c = userInfo.company =="" ? "企业名称  " : ""
            var p = userInfo.phone == "" ? "手机  " : ""
            wx.showModal({
                title: '温馨提示',
                content: '为了方便联系您，请填写：' +n+c+p ,
            }) 
            return 
        }
        // 上锁
        if ( GP.data.lock == true){
            wx.showModal({
                title: '温馨提示',
                content: '正在上传中，请别着急',
            })
            return 
        }
        GP.setData({
            lock:true,
        })
        API.Request({
            url: API.MEET_SIGN_SET_INFO,
            data: {
                name: userInfo.name,
                phone: userInfo.phone,
                company: userInfo.company,
                taxpayer_number: userInfo.taxpayer_number,
                company_address: userInfo.company_address,
                bank_account: userInfo.bank_account,
            },
            success: function (res) {
                console.log(res)
                wx.showModal({
                    title: '更新成功',
                    success:function(){
                        wx.navigateBack({                           
                        })
                    },
                })
            },
            fail: function (res) {
                wx.showModal({
                    title: '更新失败',
                    content:"请重试",
                })
            },
            complete:function(res){
                GP.setData({
                    lock: false,
                })
            },
        })
    },



})