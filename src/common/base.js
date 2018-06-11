import Vue from 'vue'
import utils from "./utils";

// 客户端API是否已注册
let isRegistered = false;
let isBackRegister = false;

const base = {
    getUserInfo(callback) {
        if (!isRegistered) {
            let type = 3025;
            let action = "set";
            let reflectClazz = "getUserInfo";
            let isSuccess = UmsApi.base.registerApi(type, action, reflectClazz, "getInfoCallback");
            if (isSuccess) {
                isRegistered = true;
            }
        }
        if (isRegistered) {
            let param = {};
            UmsApi.custom["getInfoCallback"](param, function (data) {
                //缓存数据
                Vue.prototype.userInfo = data["bizData"];
                callback(data["bizData"]);
                utils.closeDialog();
            });
        }
    },
    backToRootVC() {
        if (!isBackRegister) {
            let type = 3026;
            let action = "";
            let reflectClazz = "backToRootVC";
            let isSuccess = UmsApi.base.registerApi(type, action, reflectClazz, "backCallback");
            if (isSuccess) {
                isBackRegister = true;
            }
        }
        if (isBackRegister) {
            let param = {};
            UmsApi.custom["backCallback"](param, function (data) {
            });
        }
    },
    AJAX(param, successCallback, errorCallback) {
        UmsApi.base.call(uri, param, function (data) {
            try {
                if (data == null || data == undefined) {
                    UmsApi.notification.error("Data Error!");
                }
                data = data["response"];
                data = JSON.parse(data);
                //UmsApi.notification.tip(JSON.stringify(data));
                if (data["responseCode"] == '000000') {
                    successCallback && successCallback(data);
                } else {
                    errorCallback && errorCallback(data);
                    utils.closeDialog();
                    UmsApi.notification.tip('网络错误，请稍后再试');
                }
            } catch (e) {
                //TODO handle the exception
            }
        }, function (data) {
            utils.closeDialog();
            UmsApi.notification.tip(data.errInfo);
        });
    }
};

export default base;
