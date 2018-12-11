//菜单工具类

function create(request ) {

    return {
        info: request,
    }
}
module.exports = {
    create: create,
    getList: getList,
}


/**
 * @method 获取渲染的mark数组
 * @for 标记
 * @param
 *      {object} value 手机的方向数值
 */
function getList(value){
    return  [
        { name: "全部", id: 0 },
        { name: "景点", id: 1 },
        { name: "厕所", id: 2 },
    ]
}