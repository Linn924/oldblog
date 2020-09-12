<template>
  <div id="index">
    <img :src="bgPath" alt="" :class="imgAnimate ? 'imgAnimateLast' : 'imgAnimateFirst'">

    <!-- 内容模块 -->
    <section :class="sectionAnimate ? 'sectionAnimateLast' : 'sectionAnimateFirst'">

        <!-- 首页模块 -->
        <div class="bg" @click="clickBg">
            <h1>{{time}}</h1>
            <p>{{date}}</p>
            <h5>Design By Simon</h5>
            <i class="fa fa-angle-down fa-3x" aria-hidden="true"></i>
            <i class="fa fa-angle-down fa-3x" aria-hidden="true"></i>
            <h6>点击屏幕以进入</h6>
        </div>

        <!-- 功能模块中向上的按钮 -->
        <div class="up" @click="clickUp">
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
                            <img src="../assets/image/complete.png" alt="">
                        </router-link>
                    </div>
                    <p>完整样本</p>
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
                            <img src="../assets/image/message.png" alt="">
                        </router-link>
                    </div>
                    <p>留言板</p>
                </div>
                <div class="box" @click="setting">
                    <div class="content">
                        <router-link to="">
                            <img src="../assets/image/setting.png" alt="">
                        </router-link>
                    </div>
                    <p>设置中心</p>
                </div>
            </div>
        </div>

        <!-- 设置中向上的按钮 -->
        <div class="upAgain" @click="clickUpAgain">
            <i class="fa fa-angle-up fa-3x" aria-hidden="true"></i>
            <i class="fa fa-angle-up fa-3x" aria-hidden="true"></i>
        </div>

        <!-- 设置中心 -->
        <div class="setting">
            <div class="bgBox">
                <div class="box">
                    <span>默认壁纸</span>
                    <div class="imgBox">
                        <div class="img" v-for="item in imgList" :key="item.id">
                            <img v-lazy="item.defaultpath" alt="" @click="clickImg(item)">
                            <div class="select" v-show="selectImgIndex === item.id">√</div>
                        </div>
                    </div>
                    
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
      imgList:[],//图片数据
      selectImgIndex:-1,////选中的壁纸的下标
      bgPath:'',//背景图片地址
    }
  },
  created(){
    //初始化 使得页面渲染完成之前页面中有数据展示
    this.nowTime()
    setInterval(this.nowTime,1000)
    this.getIndexBgData()
  },
  methods:{
    //处理时间和日期
    nowTime(){
        var t = new Date()
        var h = t.getHours() > 9 ? t.getHours() : '0' + t.getHours()
        var m = t.getMinutes() > 9 ? t.getMinutes() : '0' + t.getMinutes()
        var Y = t.getFullYear()
        var M = t.getMonth() + 1
        var D = t.getDate()
        this.time = h + ':' + m
        this.date = Y + '年' + M + '月' + D + '日'
    },
    //点击屏幕进入功能模块
    clickBg(){
        if(this.flag){
            this.sectionAnimate = false
            this.imgAnimate = false
            this.flag = false
        }
    },
    //点击功能模块的向上箭头
    clickUp(){
        if(!this.flag){
            this.sectionAnimate = true
            this.imgAnimate = true
            this.flag = true
        } 
    },
    //设置中心按钮
    setting(){
        var section = document.querySelector('section')
        section.style.top = '-200vh'
    },
    // 获取背景图片数据
    async getIndexBgData(){
        const {data:res} = await this.$http.get('getIndexImg')
        if(res.code != 200) return this.$message({message:`${res.tips}`,type:'error',duration:1000})
        this.imgList = res.data
        this.imgList.some(item => {
        if(item.defaultpath == this.imgList[0].newpath){
                this.selectImgIndex = item.id
                return true
            }
        })
        this.bgPath = this.imgList[0].newpath
    },
    //点击设置中心的向上的箭头
    clickUpAgain(){
        var section = document.querySelector('section')
        section.style.top = '-100vh'
    },
    //点击图片 切换背景
    async clickImg(data){
        this.selectImgIndex = data.id
        this.bgPath = data.defaultpath
        const {data:res} = await this.$http.post('updateIndexBg',{newpath:data.defaultpath})
        if(res.code != 200) return this.$message({message:`${res.tips}`,type:'error',duration:1000})
        this.$message({message:`${res.tips}`,type:'success',duration:1000})
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
    >i{
        z-index: 1;
        color: #fff;
        position: absolute;
        bottom: 2vh;
        left: 50%;
        transform: translateX(-50%);
        &:nth-child(4){animation: bg_i 1s infinite;}
        &:nth-child(5){bottom: 0vh;animation: bg_i 1s .5s infinite;}
    }
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
.up{
    cursor: pointer;
    >i{
        z-index: 1;
        color: #fff;
        position: absolute;
        top: 100vh;
        left: 50%;
        transform: translateX(-50%);
        &:first-child{animation: bg_i 1s infinite;}
        &:last-child{top: 102vh;animation: bg_i 1s .5s infinite;}
    }
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
        gap: 20px;
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
    top: 0!important;
}
#index .imgAnimateLast{
    width: 100%;
    height: 100%;
    left: 0;
}
.upAgain{
    cursor: pointer;
    >i{
        z-index: 1;
        color: #fff;
        position: absolute;
        top: 200vh;
        left: 50%;
        transform: translateX(-50%);
        &:first-child{animation: bg_i 1s infinite;}
        &:last-child{top: 202vh;animation: bg_i 1s .5s infinite;}
    }
}
.setting{
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: row wrap;
    color: #fff;
    .bgBox{
        background-color: rgba(255,255,255,0.1);
        border-radius: 5px;
        backdrop-filter: blur(15px);
        padding: 10px 0;
        // display: grid;
        // grid-template-columns: 1fr;
        // grid-template-rows: 1fr;
    }
    .box{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
    }

}
.setting .box{
    >span{margin: 0 0 10px 10px;}
    .imgBox{
        height: 240px;
        overflow-y: hidden;
        display: grid;
        grid-template-columns: repeat(2,1fr);
        grid-template-rows: repeat(2,1fr);
        padding: 0 10px;
        gap: 10px;
        &:hover {overflow-y: auto;}
        .img{
            cursor: pointer;
            position: relative;
            box-sizing: border-box;
            img{
                width: 200px;
                // height: auto;
                height: 112.5px;
                border-radius: 3px;
            }
            .select {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 112.5px;
                border-radius: 3px;
                background: rgba(0, 0, 0, 0.5);
                font-size: 40px;
                display: flex;
                justify-content: center;
                align-items: center;
                color: white;
            }
        }
    }
}
/*壁纸盒子滚动条样式*/
.imgBox::-webkit-scrollbar {
  width: 4px;
}
.imgBox::-webkit-scrollbar-thumb {
  background-color: #131E3A;
  border-radius: 2px;
}
</style>
