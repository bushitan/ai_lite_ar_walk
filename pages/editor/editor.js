
var GP
var APP = getApp()
var API 
var KEY


Page({
    data: {
        male: ['男', '女'],
        area:['北京','广西','天津','广东'],
        userInfo:{},
        lock:false,
        bb:"43243254",

        shop:{
            cover_url:"",
            content:"321321",
        },
    },
    onLoad: function (options) {
        GP = this
        console.log(options)
        // GP.onInit()
    },

    /* 
    *   事件：商铺定位
    */
    getLocation(){
        wx.chooseLocation({
            success(res) {
                console.log(res)
            }
        })
        // wx.getLocation({
        //     type: 'gcj02', // 返回可以用于wx.openLocation的经纬度
        //     success(res) {
        //         const latitude = res.latitude
        //         const longitude = res.longitude
        //         wx.openLocation({
        //             latitude,
        //             longitude,
        //             scale: 18
        //         })
        //     }
        // })
    },
    toContent(){
        wx.navigateTo({
            url: '/pages/content/content',
        })
    },

    back(){
        wx.navigateBack({
            
        })
    },

    inputName(e) {
        var _userInfo = GP.data.userInfo
        _userInfo.name = e.detail
        GP.setData({
            userInfo: _userInfo
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