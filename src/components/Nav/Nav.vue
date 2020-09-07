<template>
    <nav>

        <!-- 回到顶部 必须写在首位-->
        <el-backtop>
            <i class="fa fa-arrow-up" :class="sunny?'backtopOne':'backtopTwo'"></i>
        </el-backtop>

        <!-- 左侧栏 -->
        <aside :class="sunny?'switchColor enterAside':''">
            <div class="logo">
                <img src="https://s1.ax1x.com/2020/05/09/YMs8DP.jpg" @click="$router.go(0)">
                <transition name="logo">
                    <span v-show="!isCollapse">西蒙星</span>
                </transition>
            </div>
            <el-menu :class="sunny?'one switchColor':'one'" :collapse="isCollapse" :unique-opened="true">
                <el-submenu v-for="item in asideData1" :key="item.id" :index="item.id">
                    <template slot="title">
                        <i :class="item.className" :style="{'margin':item.id == 5 || item.id == 6 ? '0 10px 0 5px': ''}"></i>
                        <span slot="title" :style="{'color':sunny?'#fff':'#000'}">{{item.title}}</span>
                    </template>
                    <el-menu-item-group :class="sunny?'switchColor enterAside':''">
                        <span slot="title">{{item.title}}</span>
                        <el-menu-item v-for="i in item.children" :key="i.id" :index="`${item.id}-${i.id}`" @click="location(item.id,i.id,i.flag)" :style="{'color':sunny?'#fff':'#000'}">{{i.title}}</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
            </el-menu>
            <el-menu :class="sunny?'two switchColor':'two'" :collapse="isCollapse">
                <el-menu-item v-for="item in asideData2" :key="item.id" :index="item.id" :style="{'color':sunny?'#fff':'#000'}">
                    <i :class="item.className"></i>
                    <span slot="title">{{item.title}}</span>
                </el-menu-item>
            </el-menu>
        </aside>

        <!-- 右边内容区域 -->

        <main :style="{'padding-left':isCollapse ?'64px':'200px'}">

            <!-- 顶部导航 -->
            <header :class="sunny?'black':'white'">
                <div>
                    <i class="el-icon-s-unfold" @click="showCollapse" v-show="show"></i>
                    <i class="el-icon-s-fold" @click="hideCollapse" v-show="hide"></i>
                    <ul>
                        <li v-for="item in navList" :key="item.id">
                            <router-link :to="item.path" :style="{'color':sunny?'#fff':'#000'}">
                                <i :class="item.className"></i>{{item.title}}
                            </router-link>
                        </li>
                    </ul>
                    <i class="fa fa-search" :style="{right:isCollapse ?'50px':'200px'}"></i>
                </div>
            </header>

            <!-- 中间链接内容-->
            <main>
                <router-view ref="Link" :sunny="sunny"></router-view>
            </main>

        </main>

        <!-- 右下角切换颜色等功能 -->
        <div class="Weather">
            <div class="poisition">
                <div class="weather">
                    <i :class="sunny?'el-icon-heavy-rain backtopOne':'el-icon-heavy-rain backtopTwo'" @mouseenter="showWeatherCard" @mouseleave="hideWeatherCard"></i>
                    <div v-show="showWeather" @mouseenter="showWeatherCard" @mouseleave="hideWeatherCard">
                        <header>
                            <label>{{city}}</label>
                            <span>简约天气</span>
                        </header>
                        <main>
                            <span>{{wendu}}</span>
                            <span>{{type}}</span>
                        </main>
                        <footer>
                            <table>
                                <tr v-for="(item,index) in weatherList" :key="index">
                                    <td align="center">{{item.date}}</td>
                                    <td align="center">{{item.type}}</td>
                                    <td align="center">{{item.wendu}}</td>
                                    <td align="center">{{item.fengxiang}}</td>
                                </tr>
                            </table>
                        </footer>
                    </div>
                </div>
                <div class="toggleMode">
                    <el-tooltip effect="dark" content="日间模式" placement="left">
                        <i :class="sunny?'el-icon-sunny backtopOne':'el-icon-sunny backtopTwo'" v-show="sunny" @click="switchMoon"></i>
                    </el-tooltip>
                    <el-tooltip effect="dark" content="夜间模式" placement="left">
                        <i :class="sunny?' el-icon-moon backtopOne':'el-icon-moon backtopTwo'" v-show="moon" @click="switchSunny"></i>
                    </el-tooltip>
                </div>
            </div>
        </div>

    </nav>
</template>

<script>
export default {
    data(){
        return {
            asideData1:[//左侧导航数据1
                {
                    id:0,
                    className:'el-icon-location',
                    title:'常用站点',
                    children:[
                        {id:0,title:'阅读',flag:false},
                        {id:1,title:'购物',flag:false},
                        {id:2,title:'直播',flag:false},
                        {id:3,title:'国外',flag:false},
                        {id:4,title:'视频',flag:false},
                        {id:5,title:'工具',flag:false}
                    ]
                },
                {
                    id:1,
                    className:'el-icon-video-camera-solid',
                    title:'视频直播',
                    children:[
                        {id:0,title:'免费在线',flag:true},
                        {id:1,title:'高清下载',flag:true},
                        {id:2,title:'追剧',flag:false},
                        {id:3,title:'动漫',flag:false},
                        {id:4,title:'解析',flag:false}
                    ]
                },
                {
                    id:2,
                    className:'el-icon-zoom-in',
                    title:'资源搜索',
                    children:[
                        {id:0,title:'网盘搜索',flag:true},
                        {id:1,title:'BT搜索',flag:true},
                        {id:2,title:'磁力软件',flag:true}
                    ]
                },
                {
                    id:3,
                    className:'el-icon-s-platform',
                    title:'软件游戏',
                    children:[
                        {id:0,title:'精品软件',flag:true},
                        {id:1,title:'安卓',flag:false},
                        {id:2,title:'苹果',flag:false},
                        {id:3,title:'游戏',flag:false},
                        {id:4,title:'浏览器类',flag:true}
                    ]
                },
                {
                    id:4,
                    className:'el-icon-s-order',
                    title:'阅读漫画',
                    children:[
                        {id:0,title:'阅读小说',flag:true},
                        {id:1,title:'免费漫画',flag:true}
                    ]
                },
                {
                    id:5,
                    className:'fa fa-music',
                    title:'音乐动听',
                    children:[
                        {id:0,title:'在线音乐',flag:true},
                        {id:1,title:'无损音乐',flag:true},
                        {id:2,title:'音乐软件',flag:true}
                    ]
                },
                {
                    id:6,
                    className:'fa fa-wrench',
                    title:'实用工具',
                    children:[
                        {id:0,title:'综合工具',flag:true},
                        {id:1,title:'小功能类',flag:true},
                        {id:2,title:'文件处理',flag:true},
                        {id:3,title:'图片处理',flag:true}
                    ]
                },
                {
                    id:7,
                    className:'el-icon-edit',
                    title:'学习教育',
                    children:[
                        {id:0,title:'好好学习',flag:true},
                        {id:1,title:'文档学术',flag:true}
                    ]
                },
                {
                    id:8,
                    className:'el-icon-s-cooperation',
                    title:'办公素材',
                    children:[
                        {id:0,title:'PPT',flag:false},
                        {id:1,title:'图库',flag:false},
                        {id:2,title:'壁纸',flag:false},
                        {id:3,title:'图标',flag:false},
                        {id:4,title:'字体',flag:false},
                        {id:5,title:'配色',flag:false}
                    ]
                },
            ],
            asideData2:[//左侧导航数据2
                {id:0,className:'el-icon-notebook-1',title:'博客文章'},
                {id:1,className:'el-icon-edit-outline',title:'留言板'},
                {id:2,className:'el-icon-user',title:'个人中心'},
                {id:3,className:'el-icon-warning-outline',title:'关于本站'}
            ],
            navList:[//顶部导航数据
                {id:0,path:'/nav',className:'fa fa-home',title:'主页'},
                {id:1,path:'/blog',className:'el-icon-notebook-1',title:'博客'},
                {id:2,path:'/message',className:'el-icon-edit-outline',title:'留言板'},
                {id:3,path:'/index',className:'el-icon-user',title:'个人中心'}
            ],
            city:'',//当前城市
            weatherList:[],//最近三天天气数据
            wendu:'',//当天平均温度
            type:'',//当天天气状态
            isCollapse: true,//默认折叠
            hide:false,//控制折叠
            show:true,//控制展开
            sunny:false,//控制切换到日间模式
            moon:true,//控制切换到夜间模式
            showWeather:false
        }
    },
    created() {
        this.getLoactionCity()//初始化前获取当前地址
    },
    methods: {
        //展开折叠
        showCollapse(){
            this.isCollapse = false
            this.show = false
            this.hide = true
        },
        //关闭折叠
        hideCollapse(){
            this.isCollapse = true
            this.show = true
            this.hide = false
        },
        //锚点跳转
        location(fatherIndex,sonIndex,sonFlag){
            var ul = document.querySelectorAll('.item>div ul')[fatherIndex]
            var lis = ul.children
            window.scroll({top: ul.offsetTop - 138,behavior: 'smooth'})
            //调用子组件方法
            this.$refs.Link.clickNav(fatherIndex,sonIndex,sonFlag)
        },
        //切换到日间模式
        switchSunny(){
            this.moon = false
            this.sunny = true
        },
        //切换到夜间模式
        switchMoon(){
            this.moon = true
            this.sunny = false
        },
        //获取当前地址,使用jsonp解决跨域问题 (get请求)
        async getLoactionCity(){
            const data = await this.$jsonp('https://restapi.amap.com/v3/ip?key=b30eb9c64b4094a062fa5cce3b26496e')
            this.city = data.city
            this.getWeather(data.city)
        },
        //根据城市获取城市天气
        async getWeather(location){
            const {data:res} = await this.$http.get(`http://wthrcdn.etouch.cn/weather_mini?city=${location}`)
            if(res.status !== 1000) return this.$message.error('获取天气数据失败')
            const value = res.data.forecast.slice(0,3)
            this.handleWeatherData(value)
        },
        //处理天气数据
        handleWeatherData(value){
            value.map( (item,index) => {
                if(index == 0){item.date = '今天';}
                else if(index == 1){item.date = '明天';}
                else{item.date = '后天';}
                item.wendu = item.low.split(' ')[1] + '/' + item.high.split(' ')[1]
            })
            this.weatherList = value
            this.wendu = ((Number(value[0].high.slice(3,5)) + Number(value[0].low.slice(3,5))) / 2) + '℃'
            this.type = value[0].type
        },
        //展示天气盒子
        showWeatherCard(){
            this.showWeather = true
        },
        //隐藏天气盒子
        hideWeatherCard(){
            this.showWeather = false
        }
    }
}
</script>

<style lang="less" scoped>
.backtopOne{
    background-color: #363738!important;
    color: #AAA!important;
}
.backtopTwo{
    background-color: #ddd!important;
    color: #777!important;
}
.el-backtop{
    color: #777;
    font-size: 14px;
    bottom: 146px!important;
    width: 40px;
    height: 40px;
    i{padding: 14px 15px;border-radius: 50%;}
}
nav{
    display: flex;
    position: relative;
    >aside{
        .logo{
            margin: 10px auto;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            img{width: 50px;height: 50px;border-radius: 50%;}
            span{margin-left: 10px;color: #1E90FF;}
        }
        height: 100vh; 
        background-color: #f9f9f9;
        position: fixed;
        .one:not(.el-menu--collapse) {
            width: 200px;
            border: 0;
            max-height: 750px;
            overflow-y: auto;
            overflow-x: hidden;
            &::-webkit-scrollbar {width: 6px;}
            &::-webkit-scrollbar-thumb {background-color: #BDBDBD;border-radius: 3px;}
        }
        .one,.two{border: 0;background-color: #f9f9f9;}
        .two{margin-top: auto;}
        .el-menu-item{&:hover{color: #1E90FF;}}
        display: flex;
        flex-direction: column;
    }
    >main{
        width: 100vw;
        transition: all .5s;
        box-sizing: border-box;
    }
}
.switchColor{
    background-color: #2C2E2F!important;
}
nav>main{
    header{
        width: 100%;
        height: 7.5vh;
        position: fixed;
        display: flex;
        align-items: center;
        z-index: 999;
        div{
            display: flex;
            align-items: center;
            position: relative;
            width: 100%;
            >i{
                font-size: 24px;
                color: #888888;
                transition: color .5s;
                &:hover{color: #1E90FF!important;}
                margin: 0 20px 0 20px;
                cursor: pointer;
            }
            ul{
                display: flex;
                list-style: none;
                li{
                    margin-right: 20px;
                    a{
                        color: #000;
                        transition: color .5s;
                        cursor: pointer;
                        &:hover{color: #1E90FF!important;}
                        font-size: 14px;
                        >i{margin-right: 2px;}
                    }
                    
                }
            }
            >i:last-child{
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                transition: all .4s;
                font-size: 22px;
            }
        }
        
    }
}
//伪元素背景为黑色
.black::before{
    content: '';
    filter: blur(px);
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: -1;
    background-color: rgba(25,26,33, .8);
    background-attachment: fixed;
    margin: -3px;
    margin-left: 0;
}
//伪元素背景为白色
.white::before{
    content: '';
    filter: blur(px);
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: -1;
    background-color: rgba(253,253,253, .8);
    background-attachment: fixed;
    margin: -3px;
    margin-left: 0;
}
.logo-enter,.logo-leave-to{
    opacity: 0;
}
.logo-enter-active{
    transition: all 1s;
}
.logo-leave-active{
    transition: all 0.2s;
}
@media screen and (max-width: 760px) {
    nav>aside{
        display: none;
        z-index: -1;
    }
    nav>main{
        padding-left: 0!important;
        header div i:last-child{right: 0!important;}
    }
}
.Weather{
    position: absolute;
    top: 0;
    right: 80px;
    padding-top: 85vh;
    box-sizing: border-box;
    height: 100vh;
    .poisition{
        position: fixed;
        display: flex;
        flex-direction: column;
        i{padding: 12px 12px;background-color: #eee;border-radius: 50%;cursor: pointer;transition: color .5s;}
        .toggleMode{
            i:first-child:hover{color: #fff!important;}
            i:last-child:hover{color: #000!important;}
        }
        .weather{
            position: relative;
            >div{
                position: absolute;
                top: 50px;
                left: 0;
                transform: translate(-100%,-100%);
                width: 270px;
                height: 270px;
                border-radius: 5px;
                padding: 10px 10px;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                background: url(https://s1.ax1x.com/2020/05/19/Y5Q0OJ.jpg) no-repeat;
                background-position: center bottom;
                header{
                    display: flex;
                    justify-content: space-between;
                    color: #fff;
                    font-size: 14px;
                }
                main{
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    color: #fff;
                    padding-bottom:10px ;
                    span:first-child{font-size: 50px;}
                    span:last-child{font-size: 14px;background-color: #1e90ff;border-radius: 5px;padding: 2px 5px;}
                    border-bottom: 1px solid #fff;
                }
                footer{
                    color: #fff;
                    td{width: 25%;}
                }
            }
            i{margin: 10px 0;}
        }
    }
}
.enterAside{
    div.el-submenu__title:hover{
        span{color: #1e90ff!important;}
    }
    li.el-menu-item:hover{
        background-color: #1B1D1F!important;
        color: #1e90ff!important;
    } 
} 
</style>