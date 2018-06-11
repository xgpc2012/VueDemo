<template>
    <div id="app">
        <myHeader :title="title"></myHeader>

        <tab :line-width=2 active-color='#2DBBFD'>
            <tab-item selected @on-item-click="onItemClick">账务消息</tab-item>
            <tab-item @on-item-click="onItemClick">系统消息</tab-item>
            <tab-item @on-item-click="onItemClick">活动消息</tab-item>
        </tab>

        <div class="main-content2">

            <div class="page-loadmore-wrapper bor-box" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
                <mt-loadmore :top-method="loadTop" @top-status-change="handleTopChange" ref="loadmore">
                    <div class="page-loadmore-list" :style="{ minHeight: wrapperHeight + 'px' }">
                        <div class="msg-item">
                            <div class="box bg-w pad-bt075 b-b b-e0 bor-box" v-for="(item,i) in msgInfoList">
                                <div class="">
                                    <div :class='["message","mar-r0625","message"+typeMap.indexOf(msgTypeId)]'>
                                        <div class="red-dot"></div>
                                    </div>
                                </div>
                                <div class="f1">
                                    <div class="box">
                                        <p class="msg-text f1">
                                            {{item.msgSubTypeId | getTitle}}
                                        </p>
                                        <p class="fz075 t-a7 mar-t0125">
                                            {{item.msgApplyCreateTime | transformTime}}
                                        </p>
                                    </div>
                                    <p class="msg-content mar-t0375 t-s2">
                                        {{item.msgApplyContent | getPlainText}}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div slot="top" class="mint-loadmore-top">
                        <span v-show="topStatus !== 'loading'" :class="{ 'is-rotate': topStatus === 'drop' }">下拉刷新</span>
                        <span v-show="topStatus === 'loading'">
                            <mt-spinner type="fading-circle"></mt-spinner>
                        </span>
                    </div>
                </mt-loadmore>

            </div>
        </div>
    </div>
</template>

<script>
    import Storage from './localstorage'

    import myHeader from './components/public/myHeader'
    import {Tab, TabItem} from 'vux'

    export default {
        name: 'app',//name属性作为组件名称，全局 ID 自动作为组件的 name
        data() {
            return {
                title: "消息中心",
                msgTypeId: "02",
                typeMap: ["02", "01", "03"],
                msgInfoList: [
                    // {"msgSubTypeId":"0102"}
                ],
                allLoaded: false,//是否已加载完毕
                wrapperHeight: 0,
                topStatus: "",
                page: 1
            }
        },
        components: {
            //在#app元素内，注册组件
            myHeader, Tab, TabItem
        },
        methods: {
            initList(){
                this.msgInfoList.length = 0;
                this.page = 1;
            },
            handleTopChange(status) {
                this.topStatus = status;
            },
            loadTop() {
                this.initList();
                console.log("下拉刷新");
                //this.msgInfoList.unshift(0);
                this.getMsgList();
            },
            loadBottom() {
                this.page++;
                console.log("上拉加载");
            },
            onItemClick(index) {
                this.utils.showDialog();
                this.initList();
                this.msgTypeId = this.typeMap[index];
                this.getMsgList();
            },
            getMsgList() {
                this.api.getMsgList({
                    "msgTypeId": this.msgTypeId,
                    "page": this.page
                }, (data) => {
                    //UmsApi.notification.tip(JSON.stringify(data));
                    this.msgInfoList = data["msgInfoList"];
                    setTimeout(() => {
                        this.$refs.loadmore.onTopLoaded();
                    }, 500);
                })
            }
        },
        watch: {
            items: {
                handler: function (items) {
                    Storage.save(items);//监控li变化，将新增的值存入 sessionStorage 里
                },										//sessionStorage 里的数据将在页面关闭后删除
                deep: true							//深度监视，只要 items 有一点改变就会触发回调函数handler
            }
        },
        created() {
            this.utils.showDialog();
            //this.getMsgList();
            //console.log(JSON.stringify(this.userInfo));
            window.addEventListener("deviceready", () => {
                this.base.getUserInfo(() => {
                    //alert(JSON.stringify(data));
                    this.getMsgList();
                })
            });
        },
        mounted() {
            this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
            //console.log(this.wrapperHeight);
        }
    }
</script>

<style scoped>
    @import "assets/css/shim.css";

    .msg-text {
        font-size: .875rem;
    }

    .message {
        width: 2.5rem;
        height: 2.5rem;
        background-size: 100% 100%;
        position: relative;
    }

    .message0 {
        background-image: url("./assets/image/message1.png");
    }

    .message1 {
        background-image: url("./assets/image/message2.png");
    }

    .message2 {
        background-image: url("./assets/image/message3.png");
    }

    .msg-item {
        padding-left: .9375rem;
        padding-right: .9375rem;
        background-color: white;
    }

    .msg-content {
        height: 1.875rem;
        font-size: .75rem;
        line-height: .9375rem;
        color: #7C8893;
    }

</style>
