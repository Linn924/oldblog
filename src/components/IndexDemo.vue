<template>
    <div id="homepage">

        <!-- 背景图 -->
        <img src="https://cdn.jsdelivr.net/gh/MobiusBeta/assets/images/BG_A_Default_1.jpg"
        :style="{transform:flag?'scale(1.1)':'scale(1)'}">

        <!-- 初始界面 -->
       <div class="begin" :style="{'backdropFilter':flag?'blur(10px)':''}">
            <h1 @click="clickTime">{{time}}</h1>
            <div :class="flagTime?'search searchHide':'search searchShow'" 
                @mouseover="enlarge" @mouseout="narrow">
                <input type="text" :class="{enlarge:isEnlarge,narrow:isNarrow}"
                 ref="input" v-model="inputValue" @keyup="search">
                <div 
                    :class="{glass:true,enlarge:isEnlarge,narrow:isNarrow}"
                    @click="clickGlass" v-show="beGlass">
                    <span>Search</span>
                </div>
                <div :class="{icon:true,iconShow:isIconShow,iconHide:isIconHide}" @click="clickIcon($event)">
                    <span v-for="item in iconfontList" :key="item.id" :data-id="item.id"
                        :class="iconIndex == item.id ? 'iconSpan':''">
                        <i :class="item.className"></i>
                    </span>
                </div>
                <nav @click="clickKeyWords($event)">
                   <li v-for="(item,index) in inputSearchList" :key="index" :data-url="item.url">
                       {{item.title}}
                   </li>
                </nav>
            </div>
            <h5><span>@&nbsp;2020&nbsp;Simon</span>&nbsp;|&nbsp;<span>关于</span></h5>
       </div>

        <!-- 点击时间后进入的界面 -->
        <div :class="{function:true,functionShow:isFunctionShow,functionHide:isFunctionHide}" 
            @click="timeBlur">
            <div class="functionBox">

            </div>
        </div>

    </div>
</template>

<script>
export default {
    data(){
        return {
            time:'',//当前时间
            flag:false,//控制遮罩和图片放大
            beGlass:true,//是否展示毛玻璃
            flagGlass:false,//是否点击毛玻璃
            inputValue:'',//关键字
            flagTime:false,//是否点击时间
            isFunctionShow:false,//页面初始化不添加functionShow动画
            isFunctionHide:false,//页面初始化不添加functionHide动画
            isEnlarge:false,//页面初始化不添加enlarge动画
            isNarrow:false,//页面初始化不添加narrow动画
            isIconShow:false,//页面初始化不添加iconBoxShow动画
            isIconHide:false,//页面初始化不添加iconBoxHide动画
            iconfontList:[//浏览器种类
                {id:0,className:'iconfont icon-baidu'},
                {id:1,className:'iconfont icon-guge'},
                {id:2,className:'iconfont icon-biying'},
            ],
            iconIndex:0,//当前默认选择浏览器的下标
            searchEngines:[//搜索引擎
                {id:0,path:'https://www.baidu.com/s?wd='},
                {id:1,path:'http://www.google.com/search?q='},
                {id:2,path:'https://cn.bing.com/search?q='}
            ],
            keyWordsApi:[//不同搜索引擎的关键词联想
                {id:0,path:'http://suggestion.baidu.com/su?cb=jsonpCB&wd='},
                {id:1,path:'http://suggestqueries.google.com/complete/search?client=youtube&jsonp=jsonpCB&q='},
                {id:2,path:`http://api.bing.com/qsonhs.aspx?type=cb&cb=jsonpCB&q=`}
            ],
            inputSearchList:[],//搜索框搜寻的数据
        }
    },
    mounted(){
        //JSONP跨域实现自动补全搜索(关键词联想)
        window.jsonpCB = data => {
            this.inputSearchList = []
            if(data instanceof Array){
                for(let i of data[1]){
                    let obj = {
                        title:i[0],
                        url:this.searchEngines[1].path + i[0]
                    }
                    this.inputSearchList.push(obj)
                }
            }
            if(data instanceof Object){
                if(data.s){
                    for(let i of data.s){
                        let obj = {
                            title:i,
                            url:this.searchEngines[0].path + i
                        }
                        this.inputSearchList.push(obj)
                    }
                }else if(data.AS){
                     for(let i of data.AS.Results[0].Suggests){
                        let obj = {
                            title:i.Txt,
                            url:this.searchEngines[2].path + i.Txt
                        }
                        this.inputSearchList.push(obj)
                    }
                }
            }
        }        
        this.nowTime()//初始化 使得页面渲染完成之前页面中有时间数据展示
        setInterval(this.nowTime,1000)
    },
    watch:{
        //监听点击搜索框 添加点击事件和移出点击事件
        flagGlass(value){
            if(value){
                var timer = setTimeout(()=>{
                    document.addEventListener('click',this.addevent)
                },100)
            }else{
                clearTimeout(timer)
                document.removeEventListener('click',this.addevent)
            }
        }
    },
    methods:{
        //处理时间和日期
        nowTime(){
            var t = new Date()
            var h = t.getHours() > 9 ? t.getHours() : '0' + t.getHours()
            var m = t.getMinutes() > 9 ? t.getMinutes() : '0' + t.getMinutes()
            this.time = h + ':' + m
        },
        //搜索界面添加点击事件
        addevent(e){
            if(e.target.className !='iconSpan' && e.target.nodeName.toLowerCase() != 'input' && e.target.nodeName.toLowerCase() != 'li'){
                this.beGlass = true
                this.flagGlass = false
                this.isEnlarge = false
                this.isNarrow = true
                this.isIconShow = false
                this.isIconHide = true
                this.flag = false
                this.inputValue = ''
                this.inputSearchList = []
            }  
        },
        //鼠标移入搜索框
        enlarge(){
            this.isEnlarge = true
            this.isNarrow = false
        },
        //鼠标移出搜索框
        narrow(){
            if(!this.flagGlass){
                this.isEnlarge = false
                this.isNarrow = true
            }
        },
        //点击遮罩在搜索框的毛玻璃层
        clickGlass(){
            this.beGlass = false
            this.flagGlass = true
            this.flag = true
            this.isIconShow = true
            this.isIconHide = false
            this.blur = true
            this.$nextTick( () =>{
              this.$refs.input.focus()
          })
        },
        //点击时间
        clickTime(){
            setTimeout(() => {
                this.flag = true
                this.flagTime = true
                this.isFunctionShow = true
                this.isFunctionHide = false
            },1)
        },
        //点击时间以外的区域
        timeBlur(){
            if(this.flagTime){
                this.flag = false
                this.flagTime = false
                this.isFunctionShow = false
                this.isFunctionHide = true
            }
        },
        //通过冒泡事件 在父元素上绑定点击事件
        clickIcon(e){
            //通过自定义属性来得到下标
            this.iconIndex = e.target.dataset.id
        },
        search(e){
            if(e.keyCode == 13){
              window.open(this.searchEngines[this.iconIndex].path + this.inputValue)
              this.inputValue = ""
            }
            this.$jsonp(this.keyWordsApi[this.iconIndex].path + this.inputValue)
                .then(res => res)
            if(this.inputValue == "") {this.inputSearchList = []}
        },
        //通过冒泡事件 在父元素上绑定点击事件
        clickKeyWords(e){
            //通过自定义属性来得到要打开的网址
            window.open(e.target.dataset.url)
        }
    }
}
</script>

<style lang="less" scoped>
#homepage{
    width: 100%;
    height: 100vh;
    overflow: hidden;
    box-sizing: border-box;
    position: relative;
    transition:all .15s;
    >img{
        width: 100%;
        height: 100%;
        object-fit: cover;
        position: absolute;
        transition:all .15s;
    }
    .begin{
        height: 100%;
        position: relative; 
        transition:all .15s;
        background-image: radial-gradient(rgba(0,0,0,0) 0%,rgba(0,0,0,0.5) 100%),radial-gradient(rgba(0,0,0,0) 33%,rgba(0,0,0,0.3) 166%);
    }
}
.begin{
    h1{
        position: absolute;
        top: 12vh;
        left: 50%;
        transform: translateX(-50%);
        color: #FAFBFC;
        font-size: 36px;
        font-weight: 100;
        cursor: pointer;
        transition: .15s;
        &:hover{font-size: 50px;}
    }
    .search{
        position: absolute;
        top: 20vh;
        left: 50%;
        transform: translateX(-50%);
        input{
            width: 230px;
            padding: 13px 15px;
            outline: none;
            border: 0;
            border-radius: 20px;
            text-align: center;
            background-color: rgba(255,255,255);
            box-shadow: 0 0 10px rgba(0, 0, 0, .2);
        }
        .glass{
            position: absolute;
            top: 0;
            left: 0;
            width: 230px;
            padding: 11.5px 15px;
            border-radius: 20px;
            backdrop-filter: blur(10px);
            background-color:#A0B6C8;
            box-shadow: 0 0 10px rgba(0, 0, 0, .2);
            color: #FAFBFC;
            font-size: 14px;
            font-weight: 100;
            display: grid;
            place-content: center center;
            span{
                pointer-events: none;
                transition: .15s;
            }
            &:hover{
                cursor: text;
                background-color: rgba(160,182,200, .5);
                span{color: #000;}
            }
        }
        .icon{
            position: absolute;
            top: 5px;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            z-index: -1;    
            span{
                display: inline-block;
                padding: 8px 30px;
                background-color: #B2C7D7;
                border-radius: 20px;
                transition: all .15s;
                cursor: pointer;
                font-size: 12px;
                color: #fff;
                text-align: center;
                &:not(:first-child):not(:last-child){margin: 0 10px;}
                i{pointer-events: none;}
                z-index: 999;
            }
        }
    }
    h5{
        position: absolute;
        bottom: 1vh;
        left: 50%;
        transform: translateX(-50%);
        color: #919399;
        font-size: 12px;
        span{
            cursor: pointer;
            transition: .15s;
            &:hover{color: #ddd;}
        }
    }
    nav{
        position: absolute;
        top: 120px;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        flex-direction: column;
        width: 560px;
        background-color:rgba(255, 255, 255, .2);
        backdrop-filter: blur(30px);
        list-style: none;
        border-radius: 15px;
        box-sizing: border-box;
        transition: all .15s;
        li{
            padding: 5px 20px;
            color: rgba(255, 255, 255, .8);
            font-size: 14px;
            transition: all .15s;
            cursor: pointer;
            &:hover{background-color: rgba(160,182,200, .5);padding: 5px 30px;}
            &:first-child{border-radius: 15px 15px 0 0;}
            &:last-child{border-radius: 0 0 15px 15px;}
        }
    }
}
.function{
    width: 100vw;
    height: 100vh;
    position: relative;
    transform: translateY(-100vh);
    z-index: -1;
    display: grid;
    place-content: center center;
    .functionBox{
        width: 660px;
        height: 600px;
        border: 1px solid red;
    }
}
.search .enlarge{
    animation: enlarge .15s linear forwards;
}
.search .narrow{
    animation: narrow .15s linear forwards;
}
.begin .searchShow{
    animation: searchShow .15s linear forwards;
}
.begin .searchHide{
    animation: searchHide .15s linear forwards;
}
#homepage .functionShow{
    animation: functionShow .15s linear forwards;
}
#homepage .functionHide{
    animation: functionHide .15s linear forwards;
}
#homepage .iconShow{
    animation: iconShow .15s linear forwards;
}
#homepage .iconHide{
    animation: iconHide .15s linear forwards;
}
#homepage .iconSpan{
    background-color: #C4D5E1!important;
}
@keyframes enlarge{
    from{width: 230px;}
    to{width: 530px;}
}
@keyframes narrow{
    from{width: 530px;}
    to{width: 230px;}
}
@keyframes iconShow {
    from{opacity: 0;}
    to{top: 55px;opacity: 1;z-index: 0;}
}
@keyframes iconHide {
    from{top: 55px;opacity: 1;z-index: 0;}
    to{opacity: 0;}
}
@keyframes functionShow {
    from{opacity: 0;z-index: -1;}
    to{opacity: 1;z-index: 0;}
}
@keyframes functionHide {
    from{opacity: 1;z-index: 0;}
    to{opacity: 0;z-index: -1;}
}
@keyframes searchShow {
    from{opacity: 0;z-index: -1;}
    to{opacity: 1;z-index: 0;}
}
@keyframes searchHide {
    from{opacity: 1;z-index: 0;}
    to{opacity: 0;z-index: -1;}
}
</style>