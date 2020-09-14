<template>
    <div class="swiper-container">

        <!-- 轮播图 -->
        <div class="swiper-wrapper">
            <div class="swiper-slide">
                <div class="router"><homeone-vue @changeWallpaper="changeWallpaper($event)"></homeone-vue></div>
                <div class="img-box"><img :src="bgObj.path1" class="image"></div>
            </div>
            <div class="swiper-slide">
                <div class="router"><hometwo-vue @changeWallpaper="changeWallpaper($event)"></hometwo-vue></div>
                <div class="img-box"><img :src="bgObj.path2" class="image"></div>
            </div>
            <div class="swiper-slide">
                <div class="router"><homethree-vue @changeWallpaper="changeWallpaper($event)"></homethree-vue></div>
                <div class="img-box"><img :src="bgObj.path3" class="image"></div>
            </div>
        </div>

        <!-- 左按钮 -->
        <div class="button-prev button">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 350 160 90">
                <g id="arrow-svg-home">
                    <g id="circ" class="cls-1">
                        <circle cx="42" cy="42" r="40" class="cls-4"></circle>
                    </g>
                    <g id="arrow">
                        <path id="arrow-trg" d="M.983,6.929,4.447,3.464.983,0,0,.983,2.482,3.464,0,5.946Z"></path>
                    </g>
                    <path id="line" d="M120,0H0" class="cls-3" ></path>
                </g>
            </svg>
        </div>

        <!--右按钮-->
        <div class="button-next button">
            <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 350 160 90">
                <g id="arrow-svg-home">
                    <g id="circ" class="cls-1">
                        <circle  cx="42" cy="42" r="40" class="cls-4"></circle>
                    </g>
                    <g id="arrow">
                        <path id="arrow-trg" d="M.983,6.929,4.447,3.464.983,0,0,.983,2.482,3.464,0,5.946Z" class="cls-2"></path>
                    </g>
                    <path id="line" d="M120,0H0" class="cls-3" ></path>
                </g>
            </svg>
        </div>

    </div>
</template>

<script>
//引入子组件
import homeoneVue from './Home1.vue'
import hometwoVue from './Home2.vue'
import homethreeVue from './Home3.vue'

export default {
    name:'home',
    data(){
        return {
            bgColor: ["rgb(43,43,41)", "rgb(215,215,215)", "rgb(165,149,54)"],//背景色
            lock:false,//解除禁止点击按钮
            wpList:[],//壁纸数据
            bgObj:{//默认壁纸数据
                path1:'',
                path2:'',
                path3:''
            }
        }
    },
    created() {
      this.getWallpaper()//调用获取默认壁纸数据的接口  
    },
    mounted() {
        var that = this //获取VueComponent对象
        var mySwiper = new Swiper('.swiper-container', {
            speed: 1200, //切换显示的速度
            allowTouchMove: false, //禁止触摸滑动
            parallax: true, //文字位移视差
            on: {//事件
                //动画开始
                transitionStart: function () {
                    that.lock = true//禁止点击按钮
                    var prevIndex = this.previousIndex//当前页的index
                    var nextIndex = this.activeIndex//下一页的index
                    var derection = nextIndex-prevIndex
                    var prevImg = this.slides.eq(prevIndex).find(".image") //当前img this指向mySwiper
                    var nextImg = this.slides.eq(nextIndex).find(".image") //下一页img
                    var prevImgBox = this.slides.eq(prevIndex).find(".img-box") //当前imgbox 
                    var prevRouter = this.slides.eq(prevIndex).find(".router") //当前router 

                    // this.$el.css("background-color",that.bgColor[nextIndex]);//背景颜色动画
                    prevImg.css({"transition":"1s","transform":"scale(1.2,1.2)"})//当前页img缩放1.2倍
                    prevImgBox.css({"transform":"scale(0.6,0.6)"})//当前页imgBox盒子缩放0.6倍
                    prevRouter.css({"transform":"scale(0.6,0.6)"})//当前页router盒子缩放0.6倍
                    prevImg.transitionEnd(function(){ //下一个页面出现(即当前页面动画过度结束)前触发的函数
                        prevImg.css({"transition":"1.2s","transform":`translateX(${50*derection}%)`})//当前img移动造成位移视差
                        nextImg.css({"transition":"1.2s","transform":"translateX(0) scale(1.2,1.2)"}) //下一页img缩放1.2倍
                    })
                }, 
                //动画结束
                transitionEnd: function () {
                    var index = this.activeIndex//动画结束，所有的元素恢复        
                    this.slides.eq(index).find(".image").css({"transition":"1s","transform":"scale(1,1)"})
                    this.slides.eq(index).find(".img-box").css({"transform":"scale(1,1)"})
                    this.slides.eq(index).find(".router").css({"transform":"scale(1,1)"})
                    this.slides.eq(index).find(".image").transitionEnd(function() { that.lock = false })
                    if (index == 0 ) { //第一个和最后一个，禁止按钮
                        this.$el.find(".button-prev").addClass('disabled')
                    }else{
                        this.$el.find(".button-prev").removeClass('disabled')
                    }
                    if(index == this.slides.length - 1){
                        this.$el.find(".button-next").addClass('disabled')
                    }else{
                        this.$el.find(".button-next").removeClass('disabled')
                    }
                },
                //界面初始化时触发transitionEnd事件
                init: function () {
                    this.emit('transitionEnd') 
                },
            }
        })
        //右按钮 
        mySwiper.$el.find(".button-next").on("click", ()=> {
               if(!that.lock){
                    mySwiper.slideNext()
               }
        })
        //左按钮
        mySwiper.$el.find(".button-prev").on("click", ()=> {
                if(!that.lock){
                    mySwiper.slidePrev()
               }    
        })
    },
    methods: {
         //获取默认壁纸数据
        async getWallpaper(){
          const {data:res} = await this.$http.get('wallpaperdata')
          if(res.code != 200) return this.$message({message: `${res.tips}`,type: 'error',duration:1000})
          this.wpList = res.data.filter(item => item.id < 4)
          this.bgObj.path1 = this.wpList[0].newpath
          this.bgObj.path2 = this.wpList[1].newpath
          this.bgObj.path3 = this.wpList[2].newpath
        },
        //修改当前壁纸路径
        changeWallpaper(data){
            if(data.id == 0){
                this.bgObj.path1 = data.path
            }else if(data.id == 1){
                this.bgObj.path2 = data.path
            }else{
                this.bgObj.path3 = data.path
            }
        }
    },
    //注册私有组件
    components:{
        homeoneVue,
        hometwoVue,
        homethreeVue
    }
}
</script>

<style lang="less" scoped>
html, body {
    position: relative;
    height: 100%;
}
body {
	background: #eee;
	color: #000;
	margin: 0;
    padding: 0;
    .swiper-container {
        width: 100%;
        height: 100%;
        background-color: rgb(215,215,215);
        transition: background-color 1s 1.2s;//过度时间1s 过度元素背景色 1.2s后开始过度
    }
}
.swiper-wrapper {
    transition: all 1.2s ease 1s;
    .swiper-slide {
        display: flex;
        justify-content: center;
        align-items: center;
        .router{
            width: 100%;
            height: 100%;
            z-index: 9;
            transform: scale(0.6, 0.6);
            transition:transform 1s ease;
        }
        .img-box {
            width: 100%;
            height: 100%;
            position: absolute;
            overflow: hidden;
            transform: scale(0.6, 0.6);
            transition:transform 1s ease;
            background-attachment: fixed;
            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                transform: scale(1.2, 1.2);
                transition: transform ease;
            }
        }
    }
}
.button-prev, .button-next {
	transition: 0.5s;
	outline: none; 
	position: absolute;
	width: 120px;
	z-index: 20;
	top: 65vh;
	transform: translateY(-34px);
    cursor: pointer;
}
.button-prev {
	left: 4vw;
}
.button-next {
	right: 4vw;
}
svg {
    transition: 0.5s;
    #arrow-svg-home {
        transform: translateY(353px);
    }
    .cls-1 {
        transition: 0.5s;
        opacity: 0.4;
        transform-origin: -20px 40px;
        opacity: 1;
        .cls-4 {
            transition: 0.5s;
            stroke-width: 2px;
            stroke: #fff;
            fill: none;
            stroke-dasharray: 1;
            stroke-dashoffset: 1;
            opacity: 0.4;
            transform-origin: 0px 0px 0px;
        }
    }
    #line {
        transition: 0.5s;
        stroke: #fff;
        transform: translate(50px, 42px);
    }
    #arrow-trg {
        transition: 0.5s;
        fill: #fff;
        transform: rotateY(180deg) translate(-53px, 39px);
    }

}
.button-next #arrow-svg-home {
	transform: translateY(353px) rotateY(180deg);
	transform-origin: 80px 0px 0px;
}
.disabled {
	opacity: 0.1;
	cursor: default;
}
.button-prev:not(.disabled):hover svg {
	transform: translateX(-25px);
}
.button-next:not(.disabled):hover svg {
	transform: translateX(25px);
}
.button:not(.disabled):hover .cls-1 {
	transform: scale(1.1);
}
.button:not(.disabled):hover .cls-4 {
	stroke-dasharray: 2px;
	stroke-dashoffset: 2px;
	opacity: 1;
}
.button:not(.disabled):hover #arrow-trg {
	transform: rotateY(180deg) translate(-37px, 39px);
}
.button:not(.disabled):hover #line {
	transform: translate(35px, 42px) scaleX(0.33);
}
</style>