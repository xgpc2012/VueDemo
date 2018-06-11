<template>
    <div class="header box">
        <div class="pad-l093 pad-bt068 w-4" @click="back">
            <div class="icon-left"></div>
        </div>
        <div class="f1">
            {{title}}
        </div>
        <div class="pad-r093 w-4"></div>
    </div>
</template>

<script>
    export default {
        name: "myHeader",
        props:["title"],
        methods: {
            back() {
                console.log("我要后退");
                //返回客户端首页
                this.base.backToRootVC();
            }
        },
        created(){

        }
    }
</script>

<style scoped>
    /*页面header*/
    .header {
        height: 2.75rem;
        line-height: 2.75rem;
        font-size: 1.125rem;
        position: fixed;
        background-color: #2DBCFE;
        color: white;
        text-align: center;
        top: 0;
        left: 0;
        right: 0;
        width: 100%;
        z-index: 1000;
    }

    /*返回按钮*/
    .icon-left {
        background-image: url("../../assets/image/icon-left.png");
        height: 1.375rem;
        width: 1.375rem;
        background-size: 100% 100%;
    }

    /*用于顶部栏左右两侧块*/
    .w-4 {
        width: 4rem;
    }
</style>
