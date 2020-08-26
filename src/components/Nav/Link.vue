<template>
    <div class="link" :style="{'background-color':sunny?'#1B1D1F':'#f9f9f9'}">

        <!-- 搜索框部分 -->
        <header>

            <!-- 搜索框上面的ul -->
            <ul id="ulOne">
                <li v-for="item in ulOne" :key="item.id" :class="item.id == 0 ? 'currentLi':''" @click="switchUl(item.id)">{{item.title}}</li>
            </ul>
            <!-- 搜索框上面的ul end-->

            <!-- 可移动的线 -->
            <div class="line"></div>
            <!-- 可移动的线 end-->

            <!-- 搜索框 -->
            <div class="search">
                <input type="text" :placeholder="value" ref="search" v-model="searchValue" @keyup="search">
                <button @click="searchAgain"><i class="el-icon-search"></i></button>
            </div>
            <!-- 搜索框 end-->

            <!-- 搜索框下面的ul -->
            <ul id="ulTwo" v-for="(item,index) in ulTwo" :key="index" v-show="index == currentIndex">
                <li v-for="i in item.children" :key="i.id" :class="i.id == 0 ? 'currentLi':''" @click="switchLi(i.id,i.path)">{{i.title}}</li>
            </ul>
            <!-- 搜索框下面的ul end-->

        </header>
        <!-- 搜索框部分 end-->

        <!-- 内容区域 -->
        <main>
            
            <!-- 主要内容 -->
            <section>
                <div class="item" v-for="item in NAVData" :key="item.id">
                    
                    <!-- 提示文字 -->
                    <label :style="{'color':sunny?'#888':'#000'}"><i class="el-icon-price-tag"></i><span>{{item.title}}</span></label>
                    <!-- 提示文字 end-->

                    <!-- 小导航 -->
                    <div>
                        <ul :style="{'background-color':sunny?'#181A1C':'#E0E0E0'}">
                            <li class="back" :style="{'width':item.navList[0].flag ? '56px' : '28px'}"></li>
                            <li v-for="itm in item.navList" :key="itm.id" :class="itm.id == 0 ?'currentLi':''" @click="clickNav(item.id,itm.id,itm.flag)" @mouseenter="enterNav(item.id,itm.id,itm.flag)" @mouseleave="leaveNav(item.id)">{{itm.navName}}</li>
                        </ul>
                        <!-- <span>more+</span> -->
                    </div>
                    <!-- 小导航 end-->

                    <!-- 数据 -->
                    <ul v-for="it in item.navData" :key="it.id" v-show="it.id === indexArr[item.id].index">
                        <li v-for="i in it.children" :key="i.id" :style="{'background-color':sunny?'#2C2E2F':'#fff'}" @mouseenter="liUp(item.id,it.id,i.id)" @mouseleave="liDown(item.id,it.id,i.id)">
                            <a :href="i.path" target="_blank">
                                <img src="https://s1.ax1x.com/2020/05/09/YMs8DP.jpg" alt="">
                                <div>
                                    <strong :style="{'color':sunny?'#fff':'#000'}">{{i.title}}</strong>
                                    <span>{{i.content}}</span>
                                </div>
                            </a>
                        </li>
                    </ul>
                    <!-- 数据 end-->

                </div>
            </section>
            <!-- 主要内容 end-->

            <!-- 底部备案 -->
            <footer :style="{'color':sunny?'#fff':'#000'}">Copyright © 2020 西蒙导航 苏ICP备20023864号   Design by 西蒙</footer>
            <!-- 底部备案 end-->

        </main>
         <!-- 内容区域 -->

         
    </div>
</template>

<script>
export default {
    props:['sunny'],
    data(){
        return {
            ulOne:[
                {id:0,title:'搜索'},
                {id:1,title:'网盘'},
                {id:2,title:'软件'},
                {id:3,title:'书籍'},
                {id:4,title:'菜谱'},
            ],
            ulTwo:[
                {
                    children:[
                        {id:0,title:'百度',path:'https://www.baidu.com/s?wd='},
                        {id:1,title:'Google',path:'http://www.google.com/search?q='},
                        {id:2,title:'秘迹',path:'https://www.mijisou.com/?q='},
                        {id:3,title:'多吉',path:'https://www.dogedoge.com/results?q='},
                        {id:4,title:'Magi',path:'https://magi.com/search?q='},
                        {id:5,title:'Bing',path:'https://cn.bing.com/search?q='}
                    ]    
                },
                {
                    children:[
                        {id:0,title:'云盘精灵',path:'https://www.yunpanjingling.com/search/'},
                        {id:1,title:'大力盘',path:'https://www.dalipan.com/search?keyword='},
                        {id:2,title:'如风搜',path:'http://www.rufengso.net/s/name/'},
                        {id:3,title:'小可搜搜',path:'https://www.xiaokesoso.com/s/search?q='},
                        {id:4,title:'小昭来了',path:'https://www.xiaozhaolaila.com/s/search?q='},
                        {id:5,title:'史莱姆',path:'http://www.slimego.cn/search.html?q='}
                    ]    
                },
                {
                    children:[
                        {id:0,title:'胡萝卜周',path:'http://www.carrotchou.blog/?s='},
                        {id:1,title:'ZD423',path:'https://www.zdfans.com/search.asp?keyword='},
                        {id:2,title:'机锋论坛',path:'http://bbs.gfan.com/search?q='},
                        {id:3,title:'果壳剥壳',path:'https://www.ghpym.com/?s='}
                    ]    
                },
                {
                    children:[
                        {id:0,title:'i-BOOK',path:'https://book.tstrs.me/find?q='},
                        {id:1,title:'熊猫搜书',path:'https://ebook.huzerui.com/#/result?keyword='},
                        {id:2,title:'LoreFree',path:'https://ebook2.lorefree.com/site/index?s='},
                        {id:3,title:'SoBook',path:'https://sobooks.cc/search/'}
                    ]    
                },
                {
                    children:[
                        {id:0,title:'下厨房',path:'http://www.xiachufang.com/search/?keyword='},
                        {id:1,title:'香哈菜谱',path:'https://www.xiangha.com/so/?q=caipu&s='}
                    ]    
                },
                
            ],
            currentIndex:0,//点击UIOne中的li，它的下标赋值给此变量
            value:'百度',//初始搜索框中的内容
            searchValue:'',//输入的内容
            searchPath:'https://www.baidu.com/s?wd=',//初始搜索框的地址值
            flag:false,//未点击有蓝色背景的导航
            blueBgIndexArr:[],//默认所有蓝色背景均在下标为1的li下面
            blueBgPositionArr:[],//默认所有蓝色背景距左的初始距离都为零
            indexArr:[],//点击小导航将其导航li的下表传给对应的对象中的index
            NAVData:[],//所有内容数据
        }
    },
    created() {
        this.getNavData()//页面渲染之前
    },
    mounted() {
        this.searchFocus()//页面渲染完成，搜索框聚焦
    },
    methods: {
        //获取NavData数据
        async getNavData(){
            const {data:res} = await this.$http.get('getnavdata')
            if(res.data.code != 200) return this.$message.error('获取数据失败')
            this.NAVData = res.data.data.data
            this.pushData(this.NAVData.length)
        },
        //根据NAVData数组的长度给定义的数组添加初始数据
        pushData(number){
            for(let i = 0;i<number;i++){
                this.blueBgIndexArr.push(1)
                this.blueBgPositionArr.push(3)
                this.indexArr.push({index:0})
            }
        },
        //聚焦搜索框
        searchFocus(){
            this.$refs.search.focus()
        },
        //点击切换ulTwo的值
        switchUl(index){
            var lis = document.querySelectorAll('#ulOne>li')
            var uls = document.querySelectorAll('#ulTwo')
            var line = document.querySelector('.line')
            this.removeClass(lis,index)
            line.style.marginLeft = -273 + 136*index + 'px'
            this.currentIndex = index
            this.value = uls[index].children[0].innerHTML
            this.ulTwo.some( (item,i) => {
                if(i == index){
                    this.switchLi(0,item.children[0].path)//重置回最初始的状态
                    return true
                }
            })
            this.searchFocus() 
        },
        //点击切换ulTwo的li
        switchLi(index,path){
            var lis = document.querySelectorAll('#ulTwo')[this.currentIndex].children
            this.removeClass(lis,index)
            this.value = lis[index].innerHTML
            this.searchPath = path
            this.searchFocus()
        },
        //回车搜索
        search(e){
            if(e.keyCode == 13){
                if((this.searchValue.trim()) == '') return this.$message({type:'error',duration:1000,message:'请输入内容'})
                window.open(this.searchPath+this.searchValue)
                this.searchValue = ''
            }
        },
        //点击图标搜索
        searchAgain(){
            if((this.searchValue.trim()) == '') return this.$message({type:'error',duration:1000,message:'请输入内容'})
                window.open(this.searchPath+this.searchValue)
                this.searchValue = ''
        },
        //鼠标移入导航的li
        enterNav(fatherIndex,sonIndex,sonFlag){
            var lis = document.querySelectorAll('.item>div ul')[fatherIndex].children
            this.flag = false
            lis[0].style.left = lis[sonIndex+1].offsetLeft + 'px'
            lis[0].style.width =  (sonFlag ? '56' : '28') + 'px'
            this.removeClass(lis,sonIndex+1)
        },
        //鼠标移出导航的li
        leaveNav(fatherIndex){
            if(!this.flag){
                var lis = document.querySelectorAll('.item>div ul')[fatherIndex].children
                lis[0].style.left = this.blueBgPositionArr[fatherIndex] + 'px'
                lis[0].style.width =  (this.NAVData[fatherIndex].navList[this.blueBgIndexArr[fatherIndex]-1].flag ? '56' : '28') + 'px'
                this.removeClass(lis,this.blueBgIndexArr[fatherIndex])
            }
        },
        //鼠标点击导航的li
        clickNav(fatherIndex,sonIndex,sonFlag){
            var lis = document.querySelectorAll('.item>div ul')[fatherIndex].children
            this.flag = true
            this.blueBgPositionArr[fatherIndex] = lis[sonIndex+1].offsetLeft
            lis[0].style.left = lis[sonIndex+1].offsetLeft + 'px'
            lis[0].style.width =  (sonFlag ? '56' : '28') + 'px'
            this.removeClass(lis,sonIndex+1)
            this.blueBgIndexArr[fatherIndex] = sonIndex+1
            this.indexArr[fatherIndex].index = sonIndex
        },
        //排他思想
        removeClass(dom,i){
            dom.forEach( item => item.classList.remove('currentLi'))
            dom[i].className = 'currentLi'
        },
        //鼠标移入内容区域上移
        liUp(fatherIndex,sonIndex,grandsonIndex){
            var li = document.querySelectorAll('.item')[fatherIndex].querySelectorAll('ul')[sonIndex+1].children[grandsonIndex]
            li.classList.remove('down')
            li.classList.add('up')
        },
        //鼠标移出内容区域下降
        liDown(fatherIndex,sonIndex,grandsonIndex){
            var li = document.querySelectorAll('.item')[fatherIndex].querySelectorAll('ul')[sonIndex+1].children[grandsonIndex]
            li.classList.remove('up')
            li.classList.add('down')
        }
    }
}
</script>

<style lang="less" scoped>
.link{
    width: 100%;
    min-height: 100vh;
    background-color: #F9F9F9;
    transition: color .5s;
    >header{
        height: 450px;
        background-color: rgb(7,7,27);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    >main{
        >section{
            width: 95%;
            margin: 25px auto;
        }
        >footer{
            width: 95%;
            margin: 0 auto;
            font-size: 12px;
        }
    }
}
.link>header{
    ul{
        list-style: none;
        display: flex;
        li{
            margin-right: 40px;
            color: #84848E;
            font-size: 14px;
            cursor: pointer;
            transition: color .4s;
            &:hover{color: #fff;}
            &:last-child{margin-right: 0;}
        }
    }
    .line{
        width: 32px;
        height: 4px;
        transition: all .4s;
        margin-left: -273px;
        border-radius: 2px;
        background-color: #fff;
    }
    .search{
        display: flex;
        justify-content: center;
        margin: 20px 0;
        position: relative;
        input{
            width: 800px;
            height: 50px;
            border: 0;
            border-radius: 25px;
            background-color: #000;
            color: #fff;
            padding-left: 20px;
            margin: 0 auto;
            &:focus{outline: none;}
            &::placeholder{font-size: 16px;}
        }
        button{
            position: absolute;
            top: 50%;
            right: 20px;
            transform: translateY(-50%);
            background-color: #000;
            border: 0;
            cursor: pointer;
            i{color: #fff;font-size: 20px;}
            &:focus{outline: none;}
        }
    }
    
}
.currentLi{color: #fff!important;}
section{
    .item{
        margin-top: 20px;
        display: flex;
        flex-direction: column;
        >label{
            display: flex;
            align-items: center;
            font-size: 18px;
            i{transform: rotate(90deg);margin-right: 10px;font-size: 24px;}
            font-weight: bold;
        }
        >div{
            margin: 14px 0 22px 0;
            display: flex;
            justify-content: space-between;
            ul{
                list-style: none;
                display: flex;
                height: 30px;
                padding: 0 3px;
                box-sizing: border-box;
                background-color: #E0E0E0;
                border-radius: 15px;
                cursor: pointer;
                position: relative;
                li{
                    line-height: 30px;
                    font-size: 14px;
                    color: #888;
                    padding: 0 10px;
                    z-index: 2;
                    transition: all .4s;
                }
                .back{
                    position: absolute;
                    top: 50%;
                    left: 3px;
                    height: 24px;
                    transform: translateY(-50%);
                    border-radius: 12px;
                    background-color: #1E90FF;
                    z-index: 1;
                    transition: all .2s;
                }
            }
            span{&:hover{color: #1e90ff;}cursor: pointer;font-size: 14px;}
        }
        >ul{
            display: flex;
            flex-flow: row wrap;
            list-style: none;
            li{
                height: 70px;
                background-color: #fff;
                padding: 15px 15px;
                box-sizing: border-box;
                a{display: flex;align-items: center;justify-content: center;}
                img{width: 40px;height: 40px;border-radius: 50%;margin-right: 10px;}
                div{
                    width: 80%;
                    display: flex;
                    flex-direction: column;
                    font-size: 12px;
                    strong{margin-bottom: 5px;color:#000;transition: color .5s;}
                    span{
                        color: #6C757D;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }
                }
                transition: all .5s;
                &:hover{strong{color: #1E90FF!important;}}
            }
        }
    }
}
.up{animation: up .5s forwards;} 
.down{animation: down .5s forwards;} 
@keyframes up {
  0%{
      transform: translateY(0);
    //   box-shadow: 2px 2px 2px #e2dede,-2px -2px 2px #e2dede;
  }
  100%{
      transform: translateY(-10px);
    //   box-shadow: 6px 8px 12px #e2dede,-6px 8px 12px #e2dede;
  }                  
}
@keyframes down {
  0%{
      transform: translateY(-10px);
    //   box-shadow: 2px 2px 2px #e2dede,-2px -2px 2px #e2dede;
  }
  100%{
      transform: translateY(0);
    //   box-shadow: 6px 8px 12px #e2dede,-6px 8px 12px #e2dede;
  }                  
}
@media screen and (min-width: 1680px) and (max-width: 1920px) {
    section .item>ul li{
        margin: 0 1.59% 30px 0;
        width: 15.34%;
        &:nth-child(6n){margin-right: 0;}
    }
}
@media screen and (min-width: 1200px) and (max-width: 1680px) {
    section .item>ul li{
        margin: 0 2% 30px 0;
        width: 18.4%;
        &:nth-child(5n){margin-right: 0;}
    }
}
@media screen and (min-width: 960px) and (max-width: 1200px) {
    section .item>ul li{
        margin: 0 2% 30px 0;
        width: 23.5%;
        &:nth-child(4n){margin-right: 0;}
    }
}
@media screen and (min-width: 760px) and (max-width: 960px) {
    section .item>ul li{
        margin: 0 2% 30px 0;
        width: 32%;
        &:nth-child(3n){margin-right: 0;}
    }
    .search input{
        width: 600px!important;
    }
}
@media screen and (max-width: 760px) {
    section .item>ul li{
        margin: 0 2% 30px 0;
        width: 48%;
        &:nth-child(2n){margin-right: 0;}
    }
    .search input{
        width: 500px!important;
    }
}
</style>