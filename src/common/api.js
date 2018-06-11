import utils from "./utils";

const baseUrl = "http://58.247.0.18:18082/NewUisAutoReg/";
const uri = "/v1/forward";
const pageSize=10;

Date.prototype.format= function(fmt) {
    let o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if(/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for(var k in o)
        if(new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};

const api = {
    /*
     * 获取消息列表
     * 服务名称qryMsgInfoListForApp
     */
    getMsgList(obj, callback) {
        let param = {
            "appRequestDate": (new Date()).format("yyyyMMddhhmmss"),
            "service": "qryMsgInfoListForApp", //财务通知
            "msgTypeId": obj["msgTypeId"],
            "pageSize": pageSize,
            "startIndex": (obj["page"] - 1) * pageSize,
            "endIndex": obj["page"] * pageSize
        };
        UmsApi.base.call(uri, param, function (data) {
            try {
                if (data == null || data == undefined) {
                    UmsApi.notification.error("Data Error!");
                }
                data = data["response"];
                data = JSON.parse(data);
                if (data["responseCode"] == '000000') {
                    utils.closeDialog();
                    callback&&callback(data);
                } else {
                    utils.closeDialog();
                    UmsApi.notification.tip('网络错误，请稍后再试');
                }
                
            } catch (e) {
                //TODO handle the exception
            }
        }, function (data) {
            dialog.close();
            UmsApi.notification.tip(data.errInfo);
        });
        
    }
};

export default api;
