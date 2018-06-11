import { Indicator } from 'mint-ui';

const utils = {
    showDialog() {
        Indicator.open({
            spinnerType: 'fading-circle'
        });
        setTimeout(function () {
            Indicator.close();
        },30000)
    },
    closeDialog(){
        Indicator.close();
    }
};

export default utils;
