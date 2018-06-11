import globals from "./global";

const filters = {
    getTitle(msgSubTypeId) {
        return globals.msgTypeObj[msgSubTypeId];
    },
    transformTime(time) {
        return new Date(time).format("yyyy.MM.dd hh:mm:ss");
    },
    getPlainText(content) {
        return content.replace(/<\/?.*?>/g, '');
    }
};

export default filters;
