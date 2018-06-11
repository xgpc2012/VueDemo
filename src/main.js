// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import utils from './common/utils'
import api from './common/api'
import base from './common/base'
import global from './common/global'
import filters from './common/filters'

import Mint from 'mint-ui';
import 'mint-ui/lib/style.css'
import '../static/css/common.css' /*引入公共样式*/


//加载插件
Vue.use(Mint);
//挂载全局函数
Vue.prototype.utils = utils;
Vue.prototype.api = api;
Vue.prototype.base = base;
Vue.prototype.global = global;

//注册全局过滤器
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
});

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: {App}
});
