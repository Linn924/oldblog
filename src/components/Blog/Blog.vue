<template>
    <div class="blog">

        <!-- 回到顶部-->
        <el-backtop><i class="fa fa-arrow-up"></i></el-backtop>

        <!-- 头部导航 -->
        <header>
            <main>
                <a href="javascript:void(0);">
                    <img src="https://s1.ax1x.com/2020/09/04/wkxl9K.jpg" alt="">
                    <span>Smion</span>
                </a>
                <ul>
                    <li><router-link to="/content"><i class="fa fa-home" @click="reload"></i>主页</router-link></li>
                    <li><router-link to="/demo"><i class="el-icon-collection-tag"></i>Demo</router-link></li>
                    <li><router-link to="/nav"><i class="el-icon-link"></i>简约导航</router-link></li>
                    <li><router-link to="/index"><i class="el-icon-user"></i>个人中心</router-link></li>
                </ul>
                <el-input size="small" placeholder="搜索" suffix-icon="el-icon-search" v-model="value" @keyup.enter.native="enter" clearable></el-input>
            </main>
        </header>

        <!-- 内容区域 -->
        <main>
            <section>

                    <!-- 左侧边栏 -->
                    <aside class="aside-left">

                        <!-- 个人简介 -->
                        <div class="me">
                            <header>
                                <img src="https://s1.ax1x.com/2020/09/04/wkxl9K.jpg" alt="">
                                <div>
                                    <span>爱开发</span>
                                    <span>爱学习</span>
                                </div>
                            </header>
                            <main>
                                <span>Simon</span>
                                <span>Learner &amp; Developer</span>
                                <span class="el-icon-location-outline">江苏 · 南京</span>
                            </main>
                            <footer>
                                <header>
                                    <div>
                                        <span>{{total}}</span>
                                        <span>文章</span>                                  
                                    </div>
                                    <div>
                                        <span>{{sortCount}}</span>
                                        <span>分类</span>
                                    </div>
                                </header>
                                <footer>
                                    <a href="https://github.com/Linn924">
                                        <el-tooltip content="GitHub" placement="right">
                                            <img src="https://infinityicon.infinitynewtab.com/user-share-icon/a23b4cf17327527ae66aad5d13f059da.png" alt="">
                                        </el-tooltip>
                                    </a>
                                    <a href="https://mp.csdn.net/console/article">
                                        <el-tooltip content="CSDN" placement="left">
                                            <img src="https://s1.ax1x.com/2020/05/01/JXhclt.png" alt="">
                                        </el-tooltip>
                                    </a>
                                </footer>
                            </footer>
                        </div>

                    </aside>

                    <!-- 博客文章 -->
                    <router-view ref="article"></router-view>

                    <!--右侧边栏 -->
                    <aside class="aside-right">
                        
                         <!-- 分类区域 -->
                        <div class="sort">
                            <span><i class="el-icon-menu"></i>分类</span>
                            <div class="line"></div>
                            <main>
                                <button v-for="item in sortList" :key="item.id">{{item.sort_name}}</button>
                            </main>
                        </div>

                        <!-- 最近文章区域 -->
                        <article>
                            <span><i class="el-icon-document"></i>最近文章</span>
                            <div class="line"></div>
                            <nav>
                                <ul>
                                    <li v-for="(item,index) in blogList" :key="item.id" v-show="index < 5">
                                        <label @click="changePath(item)">
                                            <span>{{item.title}}</span>
                                            <span>{{item.date}}</span>
                                        </label>
                                    </li>
                                </ul>
                            </nav>
                        </article>

                    </aside>  

            </section>
        </main>
        
        <!-- 底部区域 -->
        <footer>         
            <main>
                <p>© 2020 - 2021 LinnCode 版权所有</p>
                <p>苏ICP备20023864号</p>
            </main>
        </footer>
        
    </div>
</template>

<script>
export default {
    data(){
        return {
            sortCount:0,//分类总数
            sortList:[],//分类数据
            blogList:[],//博客数据
            total:0,//文章总数
            value:'',
            queryList:{//获取博客数据传值列表
                pagenum:1,
                pagesize:1000
            }
        }
    },
    created() {
        this.getSTData()//调用获取分类与标签数据
        this.getBlogData()//调用获取博客数据
    },
    watch: {
        $route(to,from){//监听路由变化
            this.showAside(to.path)
        }
    },
    mounted() {
        // this.scroll()//页面滚动两侧边栏固定
        var path = window.location.href.split("#")[1]
        this.showAside(path)//刷新页面是否隐藏左右两侧边栏
    },
    methods: {
        //获取博客数据
        async getBlogData(){
            const {data:res} = await this.$http.get("blogdata",{params:this.queryList})
            if(res.code != 200) return this.$message({message: `${res.tips}`,type: 'error',duration:1000})
            this.blogList = res.data.reverse()
            this.total = res.total
        },
        //搜索框按回车搜索文章
        enter(){
            this.$store.commit("setValue",this.value)
            this.$refs.article.getBlogData()
            this.value = ''
        },
        //获取分类与标签数据函数
        async getSTData(){
            const {data:res} = await this.$http.get("blogdatadetail")
            if(res.code != 200) return this.$message({message: `${res.tips}`,type: 'error',duration:1000})
            this.sortList = res.data.data1
            this.sortCount = this.sortList.length
        },
        //监听要查看的博客地址
        changePath(item){
            this.$store.commit('setMdname',item.mdname)
            this.$router.push({path:`/template?${item.mdname}`})
        },
        //是否显示左右侧边栏
        showAside(path){
            var asideLeft = document.querySelector('.aside-left')
            var asideRight = document.querySelector('.aside-right')
            if(path === '/album' || path === '/demo'){
                asideLeft.style.display = 'none' 
                asideRight.style.display = 'none'
            }else{
                asideLeft.style.display = 'block' 
                asideRight.style.display = 'block'
            }
        },
        //调用子组件方法
        reload(){
            this.$refs.article.getDataAgain()
        }
    }
}
</script>

<style lang="less" scoped>
@import '../../assets/css/blog.css';
.blog{
    width: 100vw;
    min-height: 100vh;
    background: url(https://s1.ax1x.com/2020/05/28/te3Z79.jpg) no-repeat;
    background-attachment:fixed;
    background-size: cover;
    >header{
        min-height: 60px;
        background-color: rgba(23,23,23, .6);
    }
    >main{
        padding: 2vh 0;
        section{
            width: 80vw;
            box-sizing: border-box;
            margin: 0 auto;
            display: grid;
            grid-template-columns: 2fr 6fr 2fr;
            grid-template-rows: auto auto auto;
            gap: 20px;
        }
    }
    >footer{
        box-sizing: border-box;
        padding-top: 2vh;
        background-color: rgba(23,23,23, .6);
    }
    .el-backtop{
        bottom: 20px!important;
        background-color: rgba(255, 255, 255, 0.5);
        border-radius: 5px;
        color: white;
    }
}
.blog>header{
    main{
        width: 80vw;
        display: grid;
        grid-template-columns:140px auto 180px;
        grid-template-rows: 1fr;
        margin: 0 auto;
            >a{
                display: flex;
                align-items: center;
                margin-right: 2vw;
                &:hover span{color: #1E90FF;}
                img{
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    margin-right: 20px;
                }
                span{
                    color: white;
                    font-size: 20px;
                    transition: color .5s; 
                }
            }
            ul{
                display: flex;
                list-style: none;
                line-height: 60px;
                li{
                    margin-right: 20px;
                    a{
                        color: #fff;
                        transition: color .5s;
                        &:hover{color: #1E90FF!important;}
                        font-size: 15px;
                        >i{margin-right: 2px;}
                    }
                    
                }
            }
    }
}
.blog>header .el-input{
    width: 180px!important;
    place-self: center center;
}
.blog>main{
        aside:first-child{
            width: 100%;
            .me{
                min-height: 330px;
                padding: 20px 0 0 0;
                background-color: rgba(255, 255, 255, 0.4);
                border-radius: 8px;
                box-shadow: 0 2px 10px 0 rgba(0,0,0,0.12);
                >header{
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100px;
                    img{
                        width: 100px;
                        height: 100px;
                        margin-right: 40px;
                        border-radius: 5px;
                    }
                    div{
                        display: flex;
                        justify-content: center;
                        flex-direction: column;
                        color: #fff;
                        font-size: 14px;
                        span:nth-child(2){margin: 10px 0;}
                    }
                }
                main{
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    margin: 20px 0;
                    span{margin-bottom: 8px;color: #000;}
                }
                >footer{
                    header{
                        display: flex;
                        border-top: 1px solid #ECEFF2;
                        border-bottom: 1px solid #ECEFF2;
                        div{
                            width: 50%;
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                            justify-content: center;
                            padding: 8px 0;
                            &:first-child{border-right: 1px solid #ECEFF2;}
                        }
                    }
                    footer{
                        display: flex;
                        justify-content: space-around;
                        margin-top: 10px;
                        img{width: 30px;height: 30px;border-radius: 50%;}
                    }
                }
            }
        }
        aside:last-child{
            width: 100%;
            .sort{
                min-height: 160px;
                background-color: rgba(255, 255, 255, 0.4);
                border-radius: 8px;
                box-shadow: 0 2px 10px 0 rgba(0,0,0,0.12);
                box-sizing: border-box;
                padding: 10px 10px;
                transition: all .5s;
                span>i{margin-right: 5px;}
                .line{border: 1px solid #70A1FF;margin: 10px 0;}
                main{
                    display: grid;
                    grid-template-columns: repeat(3,1fr);
                    gap: 10px;
                    min-height: 90px;
                    button{
                        border-radius: 3px;
                        border: 1px solid #e74c3c;
                        background-color: rgba(231,76,60,.125);
                        color: #e74c3c;
                        font-size: 16px;
                        cursor: pointer;
                        &:nth-child(2n+1){
                             border: 1px solid #f1c40f;
                             background-color: rgba(241,196,15,.125);
                             color: #f1c40f;
                        }
                        &:nth-child(3n){
                             border: 1px solid #2ecc71;
                             background-color: rgba(46,204,113,.125);
                             color: #2ecc71;
                        }
                    }

                }
            }
            article{
                background-color: rgba(255, 255, 255, 0.5);
                border-radius: 8px;
                box-shadow: 0 2px 10px 0 rgba(0,0,0,0.12);
                box-sizing: border-box;
                padding: 10px 10px;
                margin: 10px 0;
                transition: all .5s;
                span>i{margin-right: 5px;}
                .line{border: 1px solid #70A1FF;margin-top: 10px;}
                nav{
                    li{
                        list-style: none;
                        line-height: 30px;
                        border-bottom: 1px solid #ccc;
                        font-size: 14px;
                        &:last-child{border: 0;}
                        label{
                            display: flex;
                            flex-flow: row wrap;
                            justify-content: space-between;
                            transition: color .5s;
                            cursor: pointer;
                            &:hover{color: #c23616;}
                        }
                    }
                }  
            }
        }  
}
.blog>footer{
    display: flex;
    justify-content: center;
    main{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center; 
        p{
            margin-bottom: 5px;
            font-size: 14px;
            color: white;
        }  
    }
}
</style>