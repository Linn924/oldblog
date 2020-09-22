<template>
  <div id="index">

    <!-- 页面加载进度条 -->
    <div class="loading">
        <div class="progress">
            <span></span>
            <b>0%</b>
        </div>
    </div>

    <!-- 背景图 -->
    <img :src="bgPath" :class="imgAnimate ? 'imgAnimateLast' : 'imgAnimateFirst'">

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
                <div class="box" v-for="item in containerList" :key="item.id">
                    <div class="content">
                        <router-link :to="item.path">
                            <img :src="item.src" alt="">
                        </router-link>
                    </div>
                    <p>{{item.title}}</p>
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
                <div class="Box">
                    <span>默认壁纸</span>
                    <div class="imgBox" @scroll="scroll">
                        <div class="img" v-for="item in imgList" :key="item.id">
                            <img src="../assets/image/blog.png" 
                            :data-src="item.defaultpath" alt="" @click="clickImg(item)">
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
      containerList:[//功能数据
          {id:0,path:'/blog',src:require('../assets/image/blog.png'),title:'个人博客'},
          {id:1,path:'/link',src:require('../assets/image/nav.png'),title:'简约导航'},
          {id:2,path:'/home',src:require('../assets/image/home.png'),title:'个人中心'},
          {id:3,path:'/life',src:require('../assets/image/life.png'),title:'生活乐趣'},
          {id:4,path:'/link',src:require('../assets/image/complete.png'),title:'完整样本'},
          {id:5,path:'/link',src:require('../assets/image/effect.png'),title:'效果样板'},
          {id:6,path:'/link',src:require('../assets/image/message.png'),title:'留言板'}
      ],
      imgList:[],//图片数据
      selectImgIndex:-1,////选中的壁纸的下标
      bgPath:'',//背景图片地址
    }
  },
  created(){
    this.nowTime()//初始化 使得页面渲染完成之前页面中有时间数据展示
    setInterval(this.nowTime,1000)
    this.getIndexBgData()//调用获取背景图片数据
  },
  mounted(){
    this.loading()//页面加载出现百分比进度条
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
            this.clickSetting = false
        } 
    },
    //设置中心按钮
    setting(){
        document.querySelector('section').style.top = '-200vh'
        //初始化懒加载
        this.start(0)
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
        document.querySelector('section').style.top = '-100vh'
    },
    //点击图片 切换背景
    async clickImg(data){
        this.selectImgIndex = data.id
        this.bgPath = data.defaultpath
        const {data:res} = await this.$http.post('updateIndexBg',{newpath:data.defaultpath})
        if(res.code != 200) return this.$message({message:`${res.tips}`,type:'error',duration:1000})
        this.$message({message:`${res.tips}`,type:'success',duration:1000})
    },
    //页面加载百分比
    loading(){
        var sum = 0
        var imgList = document.querySelectorAll('img')
        imgList.forEach( (item,index) => {
            var proImg = new Image()
            proImg.onload = () => {
                proImg.onload = null
                sum++
                var progress = parseInt(sum / imgList.length * 100)
                document.querySelector('.loading b').innerHTML = progress + '%'
                if(sum >= index){document.querySelector('.loading').classList.add('fadeOut')}
            }
            proImg.src = imgList[index].src
        })
    },
    //imgBox滚动时触发
    scroll(e){
        //e.target.scrollTop 获取滚动的高度
        this.start(e.target.scrollTop)
    },
    //图片是否懒加载
    start(scrollTop){
        //已加载的图片过滤
        var imgList = document.querySelectorAll('.img img:not([data-isLoaded])')
        imgList.forEach( item => {
            if(this.isShow(item,scrollTop)){
                this.lazy(item)
            }
        })
    },
    //图片懒加载
    lazy(img){
        img.setAttribute('src',img.getAttribute('data-src'))//把data-src的值 赋值给src
        img.setAttribute('data-isLoaded', true) //已加载过的图片做标记
        img.classList.add('fadeIn') //给图片加动画
    },
    //判断图片是否在视窗内
    isShow(img,scrollTop){
        return img.parentNode.offsetTop - 41 <= 250 + scrollTop
    }
  }
}
</script>

<style lang="less" scoped>

// 基础样式
#index{
    width: 100%;
    height: 100vh;
    position: relative;
    overflow: hidden;
    >section{
        width: 100%;
        position: relative;
        transition: top .5s;
    }
    >img{
        width: 100vw;
        height: 100vh;
        position: absolute;
        transform: scale(1.6);
        animation: img 1s ease-out forwards;
        transition: all .5s;
        object-fit: cover;
    }
    .loading{
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        background: #0B183A;
    }
}

// 加载元素
.loading{
    .progress{
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        margin: auto;
        width: 100px;
        height: 100px;
        text-align: center;
        line-height: 100px;
        font-size: 24px;
        span{
            display: block;
            position: absolute;
            left: 10px;
            top: 10px;
            width: 80px;
            height: 80px;
            border-radius: 50%;
            box-shadow: 0 3px 0 #666;
            animation: loading 1s infinite linear;
        }
        b{color: #fff;}
    }
}

// 首页时间等元素
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

// 上下页箭头元素
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

// 功能元素
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
        backdrop-filter: blur(15px);
        display: grid;
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
        &:hover{
            border: 1px solid rgba(255,255,255,1);
            transform: border .5s;
        }
    }
    .content{
        width: 100%;
        height: 100%;
    }
    img{width: 100px;}
}

// 动态添加修改类
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
#index .fadeOut{
    animation: fadeOut 1s linear forwards;
}
#index .fadeIn{
    animation:fadeIn 2s linear forwards;
}

// 设置中心样式
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
    .Box{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
    }

}
.setting .Box{
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

// 壁纸盒子滚动条样式
.imgBox::-webkit-scrollbar {
  width: 4px;
}
.imgBox::-webkit-scrollbar-thumb {
  background-color: #131E3A;
  border-radius: 2px;
}

// 动画
@keyframes loading {
    0% {transform: rotate(0deg);}
    100% {transform: rotate(360deg);}
}
@keyframes fadeOut {
    0%{opacity: 1;}
    100%{opacity: 0;}
}
@keyframes fadeIn {
    0%{opacity: 0}
    100%{opacity: 1}
}
@keyframes bg_h1 {
    form{top:70%;opacity: 0;}
    to{top:30%;opacity: 1;}
}
@keyframes bg_p {
    form{top:80%;opacity: 0;}
    to{top:50%;opacity: 1;}
}
@keyframes bg_h5 {
    form{opacity: 0;}
    to{opacity: 1;}
}
@keyframes bg_h6 {
    form{top: 100%;opacity: 0;}
    to{top: 80%;opacity: 1;}
}
@keyframes img {
    form{transform: scale(1.6);}
    to{transform: scale(1);}
}
@keyframes bg_i {
    0%{opacity: 1;}
    50%{opacity: 0;}
    100%{opacity: 1;}
}
</style>
