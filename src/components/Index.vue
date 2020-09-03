<template>
  <div id="index">
        <img src="../assets/image/index.jpeg" alt="" :class="imgAnimate ? 'imgAnimateLast' : 'imgAnimateFirst'">

        <!-- 内容模块 -->
        <section :class="sectionAnimate ? 'sectionAnimateLast' : 'sectionAnimateFirst'">

            <!-- 首页模块 -->
            <div class="bg" @click="bg_click">
                <h1>{{time}}</h1>
                <p>{{date}}</p>
                <h5>Design By Simon</h5>
                <i class="fa fa-angle-down fa-3x" aria-hidden="true"></i>
                <i class="fa fa-angle-down fa-3x" aria-hidden="true"></i>
                <h6>点击屏幕以进入</h6>
            </div>

            <div class="up" @click="up_click">
                <i class="fa fa-angle-up fa-3x" aria-hidden="true"></i>
                <i class="fa fa-angle-up fa-3x" aria-hidden="true"></i>
            </div>

            <!-- 功能模块 -->
            <div class="container">
                <div class="con">
                    <div class="box">
                        <div class="content">
                            <router-link to="/blog">
                                <img src="../assets/image/blog.png" alt="">
                            </router-link>
                        </div>
                        <p>个人博客</p>
                    </div>
                    <div class="box">
                        <div class="content">
                            <router-link to="/link">
                                <img src="../assets/image/nav.png" alt="">
                            </router-link>
                        </div>
                        <p>简约导航</p>
                    </div>
                    <div class="box">
                        <div class="content">
                            <router-link to="/home">
                                <img src="../assets/image/home.png" alt="">
                            </router-link>
                        </div>
                        <p>个人中心</p>
                    </div>
                    <div class="box">
                        <div class="content">
                            <router-link to="/life">
                                <img src="../assets/image/life.png" alt="">
                            </router-link>
                        </div>
                        <p>生活乐趣</p>
                    </div>
                    <div class="box">
                        <div class="content">
                            <router-link to="/link">
                                <img src="../assets/image/setting.png" alt="">
                            </router-link>
                        </div>
                        <p>设置中心</p>
                    </div>
                    <div class="box">
                        <div class="content">
                            <router-link to="/link">
                                <img src="../assets/image/message.png" alt="">
                            </router-link>
                        </div>
                        <p>留言板</p>
                    </div>
                    <div class="box">
                        <div class="content">
                            <router-link to="/link">
                                <img src="../assets/image/effect.png" alt="">
                            </router-link>
                        </div>
                        <p>效果样板</p>
                    </div>
                    <div class="box">
                        <div class="content">
                            <router-link to="/link">
                                <img src="../assets/image/complete.png" alt="">
                            </router-link>
                        </div>
                        <p>完整样本</p>
                    </div>
                </div>
            </div>

        </section>
    </div>
</template>

<script>
export default {
  name: 'Index',
  data(){
    return {
      flag:true,//是否可以点击？可以
      sectionAnimate:true,//控制section使用某种动画
      imgAnimate:true,//控制imgAnimate使用某种动画
      time:'',//当前时间
      date:'',//当前日期
    }
  },
  created(){
    //初始化 使得页面渲染完成之前页面中有数据展示
    this.now_time()
    setInterval(this.now_time,1000)
  },
  methods:{
    //处理时间和日期
    now_time(){
        var t = new Date()
        var h = t.getHours() > 9 ? t.getHours() : '0' + t.getHours()
        var m = t.getMinutes() > 9 ? t.getMinutes() : '0' + t.getMinutes()
        var s = t.getSeconds() > 9 ? t.getSeconds() : '0' + t.getSeconds()
        var Y = t.getFullYear()
        var M = t.getMonth() + 1
        var D = t.getDate()
        this.time = h + ':' + m + ':' + s
        this.date = Y + '年' + M + '月' + D + '日'
    },
    //点击屏幕进入下半部分
    bg_click(){
        if(this.flag){
            this.sectionAnimate = false
            this.imgAnimate = false
            this.flag = false
        }
    },
    //点击向上的箭头
    up_click(){
        if(!this.flag){
            this.sectionAnimate = true
            this.imgAnimate = true
            this.flag = true
        }
    }
  }
}
</script>

<style lang="less" scoped>
    #index{
        width: 100%;
        height: 100vh;
        position: relative;
        overflow: hidden;
        >section{
            width: 100%;
            position: relative;
            transition: all .5s;
        }
        >img{
            width: 100vw;
            height: 100vh;
            position: absolute;
            transform: scale(1.6);
            animation: img 1s ease-out forwards;
            transition: all .5s;
        }
    }
    .bg{
        position: relative;
        width: 100%;
        height: 100vh;
        cursor: pointer;
        /* 文本无法被选中 */
        -webkit-user-select: none;
        >h1{
            position: absolute;
            top: 60%;
            left: 50%;
            transform: translateX(-50%);
            letter-spacing: 5px;
            color: #fff;
            font-size: 100px;
            font-weight: 400;
            z-index: 1;
            opacity: 0;
            animation: bg_h1 .5s ease-out forwards;
        }
        >p{
            position: absolute;
            top: 70%;
            left: 50%;
            transform: translateX(-50%);
            letter-spacing: 5px;
            color: #fff;
            font-size: 20px;
            font-weight: 300;
            z-index: 1;
            opacity: 0;
            animation: bg_p .5s ease-out forwards .3s;
        }
        >h5{
            position: absolute;
            top: 1%;
            left: 50%;
            transform: translateX(-50%);
            letter-spacing: 5px;
            color: #fff;
            font-size: 10px;
            font-weight: 100;
            z-index: 1;
            opacity: 0;
            animation: bg_h5 .3s ease-out forwards .6s;
        }
        >h6{
            position: absolute;
            top: 80%;
            left: 50%;
            transform: translateX(-50%);
            letter-spacing: 5px;
            color: #fff;
            font-size: 10px;
            font-weight: 100;
            z-index: 1;
            opacity: 0;
            animation: bg_h6 .3s ease-out forwards .6s;
        }
    }
    .bg i:nth-child(4){
        z-index: 1;
        color: #fff;
        position: absolute;
        bottom: 2vh;
        left: 50%;
        transform: translateX(-50%);
        animation: bg_i 1s infinite;
    }
    .bg i:nth-child(5){
        z-index: 1;
        color: #fff;
        position: absolute;
        bottom: 0vh;
        left: 50%;
        transform: translateX(-50%);
        animation: bg_i 1s .5s infinite;
    }
    /* 设置动画 */
    @keyframes bg_h1 {
        form{
            top:70%;
            opacity: 0;
        }
        to{
            top:30%;
            opacity: 1;
        }
    }
    @keyframes bg_p {
        form{
            top:80%;
            opacity: 0;
        }
        to{
            top:50%;
            opacity: 1;
        }
    }
    @keyframes bg_h5 {
        form{
            opacity: 0;
        }
        to{
            opacity: 1;
        }
    }
    @keyframes bg_h6 {
        form{
            top: 100%;
            opacity: 0;
        }
        to{
            top: 80%;
            opacity: 1;
        }
    }
    @keyframes img {
        form{
            transform: scale(1.6);
        }
        to{
            transform: scale(1);
        }
    }
    @keyframes bg_i {
        0%{
            opacity: 1;
        }
        50%{
            opacity: 0;
        }
        100%{
            opacity: 1;
        }
    }
    /* 下半部分 */
    .up{cursor: pointer;}
    .up i:first-child{
        z-index: 1;
        color: #fff;
        position: absolute;
        top: 100vh;
        left: 50%;
        transform: translateX(-50%);
        animation: bg_i 1s infinite;
    }
    .up i:last-child{
        z-index: 1;
        color: #fff;
        position: absolute;
        top: 102vh;
        left: 50%;
        transform: translateX(-50%);
        animation: bg_i 1s .5s infinite;
    }
    .container{
        position: relative;
        width: 100%;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-flow: row wrap;
        color: #fff;
        .con{
            background-color: rgba(255,255,255,0.1);
            border-radius: 20px;
            /* 毛玻璃背景效果 */
            backdrop-filter: blur(15px);
            /* 网格布局 */
            display: grid;
            /* 设置四列两行 */
            grid-template-columns: 1fr 1fr 1fr 1fr;
            grid-template-rows: 1fr 1fr;
            grid-row: gap 20px;
            grid-column-gap: 20px;
            padding: 20px; 
        }
        .box{
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
            padding: 10px;
            border: 1px solid rgba(255,255,255,0);
            transform: border .5s;
            cursor: pointer;
        }
        .content{
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 100%;
        }
    }
    .container .box:hover{
        border: 1px solid rgba(255,255,255,1);
        transform: border .5s;
    }
    .container a img{
        width: 100px;
    }
    #index .sectionAnimateFirst{
        top: -100vh;
    }
    #index .imgAnimateFirst{
        width: 120%;
        height: 120%;
        left: -10%;
    }
    #index .sectionAnimateLast{
        top: 0;
    }
    #index .imgAnimateLast{
        width: 100%;
        height: 100%;
        left: 0;
    }
</style>
