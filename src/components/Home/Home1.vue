<template>
        <div class="homeone">

            <!-- 头部区域 -->
            <header>
                <!-- 导航区域 -->
                <ul>
                    <li>Simon's Polaris</li>
                    <li v-for="item in navList" :key="item.id" class="hide">
                        <router-link :to="item.path" :class="item.id === 0 ? 'currentLi' : ''">{{item.content}}</router-link>
                    </li>
                    <li @click="showWpBox" class="fa fa-star"></li>
                    <li class="hide">{{uname}}&nbsp;<span @click="logout">{{status}}</span></li>
                </ul>
            </header>
            <!-- 头部区域 end-->

            <!-- 中间区域 -->
            <main>
                
                <!-- 中间文字区域 -->
                <article>
                    <span>CREATIVE FROM BEGINNING</span>
                    <p>{{famous.content}}---{{famous.author}}</p>
                    <span>By Simon's Polaris</span>
                </article>
                <!-- 中间文字区域 end-->

                <!-- 底部路由链接 -->
                <footer>
                    <router-link :to="path" class="togather">
                        <span>EXPLORE</span>
                        <div class="triangle"></div>
                    </router-link>
                </footer>
                <!-- 底部路由链接 end-->

            </main>
            <!-- 中间区域 end-->

            <!-- 底部个人说明 -->
            <footer>
                <main>
                    <span>© 2020 - 2021 LinnCode 版权所有</span>
                    <span> 苏ICP备20023864号</span>
                </main>              
            </footer>
            <!-- 底部个人说明 end-->
            
            <!-- 壁纸盒子 -->
            <el-dialog
                :class="showWpDA ? 'animated bounceInLeft' : 'animated bounceOutRight' "
                :visible.sync="showWallpaper" width="600px" :modal="false"
                @open="openWD" @close="closeWD" @closed="allcloseWD" top="200px" title="壁纸切换">
                <div class="wallpaper">
                    <div class="wallpaperBox">
                        <span>默认壁纸</span>
                        <div class="default">
                            <div class="defaultImg" v-for="item in wallpaperList" :key="item.id" v-show="item.id<3">
                                <img v-lazy="item.path" @click="clickWpImg(item)" />
                                <div class="smallmengban" v-show="selectImgIndex === item.id">√</div>
                            </div>
                        </div>
                    </div>
                    <div class="wallpaperBox">
                        <span>兴趣壁纸</span>
                        <div class="default">
                            <div class="defaultImg" v-for="item in wallpaperList" :key="item.id" v-show="item.id>2">
                                <img v-lazy="item.path" @click="clickWpImg(item)"/>
                                <div class="smallmengban" v-show="selectImgIndex === item.id">√</div>
                            </div>
                        </div>
                    </div>
                </div>
            </el-dialog>
            <!-- 壁纸盒子 end-->

             <!-- 蒙板区域 -->
            <transition>
                <div class="mengban" v-show="showBMb"></div>
            </transition>
            <!-- 蒙板区域 end-->

        </div>
</template>

<script>
export default {
    inject:['reload'],//注入reload(重载)方法
    data(){
        return {
            navList:[//导航数据
                {id:0,path:'/home',content:'Home'},
                {id:1,path:'/life',content:'Life'},
                {id:2,path:'/nav',content:'Nav'},
                {id:3,path:'/blog',content:'Blog'},
            ],
            famous:{//名人名言数据
                content:'',
                author:''
            },
            uname:'', //用户登录名称         
            status:'',//登录状态           
            path:'/login',//底部路由链接
            showWpDA:false,//控制壁纸盒子出现和消失时的动画
            showWallpaper:false,//控制壁纸盒子的显示与隐藏
            wallpaperList:[],//home壁纸数据
            selectImgIndex:-1,//需要选中的壁纸下标
            flagCWp:false,//壁纸盒子没有被点击
            showBMb:false,//是否展示蒙版
            changeWpForm:{//切换壁纸
                id:0,
                path:''
            }
        }
    },
    created() {
        this.getText()//调用名人名言接口
        this.getUname()//获取浏览器中存储的登录名称
    },
    methods: {
        //调用名人名言接口
        async getText(){
            var data = await this.$http.get('https://v1.alapi.cn/api/mingyan')
            if(data.status !== 200) return this.$message({message: '获取内容失败',type: 'error',duration:1000})
            var res = data.data.data
            this.famous.content = res.content
            this.famous.author = res.author
        },
        //获取登录名称
        getUname(){
            this.uname = sessionStorage.getItem('uname') == null ? '未登录' : `${sessionStorage.getItem('uname')}`
            this.status = sessionStorage.getItem('uname') == null ? '' : '登出'
            this.path = '/life'
        },
        //登出
        logout(){
            window.sessionStorage.clear()
            this.reload()//委婉刷新页面
            this.$message({message: '登出成功',type: 'success',duration:1000});
        },
        //是否展示壁纸盒子
        showWpBox(){
            this.showWallpaper = true
            this.getWallpaperData()
        },
        //获取壁纸数据
        async getWallpaperData(){
          const {data:res} = await this.$http.get('wallpaperdata')
          if(res.code != 200) return this.$message({message: `${res.tips}`,type: 'error',duration:1000})
          this.wallpaperList = res.data
          this.wallpaperList.some(item => {
            if(item.path == this.wallpaperList[0].newpath){
              this.selectImgIndex = item.id
              return true
            }
          })
        },
        //打开壁纸盒子时添加动画类
        openWD(){
            this.showWpDA = true
            this.showBMb = true
        },
        //关闭壁纸盒子时移除动画类
        closeWD(){
            this.showWpDA = false
            this.showBMb = false
        },
        //壁纸盒子里面的img被点击
        clickWpImg(item){
            this.flagCWp = true
            this.selectImgIndex = item.id
            this.changeWpForm.path = item.path
            this.$emit("changeWallpaper",this.changeWpForm)//自定义事件 将值传给父组件
        },
        //壁纸盒子关闭动画结束时的回调
        async allcloseWD(){
          if(this.flagCWp){
            const {data:res} = await this.$http.post('changewallpaper',this.changeWpForm)
            if(res.code != 200) return this.$message({message: `${res.tips}`,type: 'error',duration:1000})
            this.$message({message: `${res.tips}`,type: 'success',duration:1000})
            this.flagCWp = false
          }
        }
    }
}
</script>

<style lang="less" scoped>
.homeone{
    height: 100vh;
    width: 100vw;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    position: relative;
    font-family: "Comic Sans MS", cursive, sans-serif;
    >header{
        height: 8vh;
    }
}
header ul{
        display: flex;
        list-style: none;
        justify-content: space-around;
        li{
            line-height: 8vh;
            a{
               color: white;
               font-size: 0.8vw;
               letter-spacing: 1.5px;//字间距
               text-transform: uppercase;//定义仅有大写字母。
               border: 1px solid rgba(255, 255, 255, 0.23);
               padding: 0.4vw 0.8vw;//把a标签撑开
               background: rgba(255, 253, 253, 0.13);
               transition: all .5s;
               border-radius: 2px;
               &:hover{
                color: #1E90FF;
               }
            }
        }
}
.currentLi{
    color: #1E90FF!important;
}
header li:first-child{
    color: #fff;
    font-size: 0.8vw;
    letter-spacing: 2px;
    cursor:pointer;//鼠标悬停成小手
    text-transform: uppercase;//定义仅有大写字母。
    transition: all .5s;
    &:hover{
        color: #1E90FF;
    }
}
header li:nth-child(6){
    color: #fff;
    font-size: 16px;
    cursor:pointer;//鼠标悬停成小手
    transition: all .5s;
    &:hover{
        color: #1E90FF;
    }
}
header li:last-child{
    color: white;
    font-size: 0.8vw;
    letter-spacing: 2px;
    span{
        color: #1E90FF;
        cursor: pointer;
        &:hover{
            color: #70a1ff;
        }
    }
}
.homeone>main{
    flex: 1;
    display: flex;
    align-items: center;
    flex-direction: column;
    position: relative;
    article{
        height: 80%;
        width: 80vw;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        span{
            border-top: 0.1047vw solid white;
            border-bottom: 0.1047vw solid white;
            font-size: 0.7vw;
            text-transform: uppercase;
            color: white;
            padding: 2vh 0;
        }
        p{
            font-size: 1.5vw;
            color: #1E90FF;
            text-align: center;
        }
    }
    footer{
        flex: 1;
        position: relative;
        animation: shake 1s infinite;
        .togather{
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 8vw;
            span{
                color: #1E90FF;  
                font-size: 1vw;
                border-top: 2px solid #1E90FF;
                padding-top: 0.5vh; 
            }
            .triangle{
                width: 0.8vw;
                height: 0.8vw;
                border-top: 2px solid #1E90FF;
                border-right: 2px solid #1E90FF;
                transform:rotate(135deg);//元素旋转
            }
        }
    }
}
.homeone>main article :nth-child(1){
    border-bottom: 0;
}
.homeone>main article :nth-child(3){
    border-top: 0;
}
.homeone>footer {
    width: 100vw;
    height: 5vh;
    box-sizing: border-box;
    >main{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: white;
        letter-spacing: 2px;
        >span{
            font-size: 0.6vw!important;
        }
    }
}
@media screen and (max-width: 700px){
    .homeone header .hide{
        display: none;
    }
    
}
//定义抖动动画
@keyframes shake{
  0%,
  100%,
  20%,
  50%,
  80% {
  transition-timing-function: cubic-bezier(0.215,.61,.355,1); /*贝塞尔曲线 ： X1 Y1 X2 Y2*/
  transform: translate3d(0,0,0);
  }
  40%,
  43%{
  transition-timing-function: cubic-bezier(0.755,0.50,0.855,0.060);
  transform: translate3d(0,-30px,0);
  }
  70%{
  transition-timing-function: cubic-bezier(0.755,0.050,0.855,0.060);
  transform: translate3d(0,-15px,0);
  }
  90%{
  transform: translate3d(0,-4px,0);
  }
}
.homeone .mengban {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
}
.homeone .el-dialog .wallpaper {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 310px;
  overflow-y: hidden;
  &:hover {
    overflow-y: auto;
  }
  .wallpaperBox {
    display: flex;
    flex-direction: column;
    width: 100%;
    box-sizing: border-box;
  }
  span {
    padding-bottom: 10px;
    color: #1e90ff;
    font-size: 14px;
  }
  .default {
    width: 100%;
    display: flex;
    flex-flow: row wrap;
    box-sizing: border-box;
    .defaultImg {
      width: 180px;
      height: 120px;
      margin: 0 5px 10px 0;
      cursor: pointer;
      position: relative;
      img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
      .smallmengban {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        text-align: center;
        line-height: 120px;
        font-size: 40px;
        color: white;
      }
    }
  }
}
// v-enter 进入之前 v-leave-to 动画离开之后 此时,元素动画已经结束
.v-enter,.v-leave-to{
    opacity: 0;
}
//v-enter-active 入场动画的时间段 v-leave-active 离场动画的时间段
.v-enter-active,.v-leave-active{
    transition: all 1s;
}
/*壁纸盒子滚动条样式*/
.wallpaper::-webkit-scrollbar {
  width: 4px;
}
.wallpaper::-webkit-scrollbar-thumb {
  background-color: #5a76cd;
}
</style>