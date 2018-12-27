// wxPage.js
// import http from '../utils/http'

const wxPage = function (config) {
    // config.http = http
    console.log("in config")
    const originalPage = Page
    Page = function (config) {
        console.log(config)
        const { onLoad } = config
        const { onShow } = config
        config.onLoad = function (onLoadOptions) {
            // 打 log、埋点……
            console.log('每个页面都会打出这个log')
            const pages = getCurrentPages()

            console.log(pages)
            this.__previousPage = pages[pages.length - 2] // 将上一页的页面对象赋为this.__previousPage



            if (typeof onLoad === 'function') {
                console.log('onload')
                onLoad.call(this, onLoadOptions)
                
            }
        }

        config.onShow = function (onLoadOptions) {
            if (typeof onShow === 'function') {
                console.log('onShow')
                onLoad.call(this, onLoadOptions)
            }
        }

        
        return originalPage(config)
    }

    return Page(config)
}


export default wxPage
