<template>
  <div class="life">

    <!-- 回到顶部 必须写在首位-->
    <el-backtop><i class="fa fa-arrow-up"></i></el-backtop>

    <!-- 轮播图 -->
    <el-carousel :interval="5000" height="40vw" arrow="never">
      <el-carousel-item v-for="item in img" :key="item.id">
        <img :src="item.src" alt="">
        <div class="menban"></div>
      </el-carousel-item>
    </el-carousel>

    <!-- 导航栏 -->
    <nav class="box">

      <header>
        <label>Simon's Polaris</label>
        <ul>
          <li v-for="item in routes" :key="item.id"><router-link :to="item.path" :class="item.id == 1 ? 'currentLi' : ''">{{item.content}}</router-link></li>
        </ul>
        <div class="icon">
          <a href="https://gitee.com/linncode">
              <el-tooltip content="码云" placement="top">
                  <img src="https://s1.ax1x.com/2020/05/01/JXhsfA.png" alt="">
              </el-tooltip>
          </a>
          <a href="https://i.csdn.net/#/uc/profile">
              <el-tooltip content="CSDN" placement="top">
                  <img src="https://s1.ax1x.com/2020/05/01/JXhclt.png" alt="">
              </el-tooltip>
          </a>
        </div>
      </header>

      <main>
        <span>Now I try so hard to walk on with a smile in the future</span>
        <el-button>read more</el-button>
      </main>

      <footer>
        <ul>
          <li>10 blog</li>
          <li>9 sort</li>
        </ul>
      </footer>
    </nav>

    <!-- 九宫格功能模块 -->
    <div class="gather">  
        <label><span>Functional</span> Module</label>
        <div class="block">
            <div class="item" v-for="item in blockData" :key="item.id" @click="showBlockDialog(item.src)">
              <img :src="item.src">
              <div>
                <p>{{item.span1}}</p>
                <p>{{item.span2}}</p>
              </div>
            </div>
        </div>
    </div>

    <!-- 九宫格对话框展示 -->
    <el-dialog :visible.sync="blockDialog" width="35%" class="blockDialog">
        <img :src="blockDialogData.imgPath">
        <span>测试</span>
        <el-button type="primary">Get into</el-button>
    </el-dialog>

    <!-- 文章区域 -->
    <article>
      <label for="">Recent <span>content</span></label>
      <main>
        <div v-for="item in articleData" :key="item.id">
          <img :src="item.path" alt="">
          <span>{{item.title}}</span>
          <span>{{item.content}}</span>
          <el-button type="primary">Read More</el-button>
        </div>
      </main>
    </article>

    <!-- 底部 -->
    <footer>
      <main>
        <div class="partOne">
          <img src="https://s1.ax1x.com/2020/05/09/YMs8DP.jpg" alt="">
          <dl>
            <dd>Address</dd>
            <dd>静谧小居一栋一号</dd>
            <dd>City, 南京</dd>
          </dl>
          <dl>
            <dd>Contacts</dd>
            <dd>Email: 3215181648@qq.com</dd>
            <dd>Phone: 15651787202</dd>
          </dl>
          <dl>
            <dd>Website builder</dd>
            <dd><a href="javascript:void(0)">Simon's Polaris</a></dd>
          </dl>
        </div>
        <div class="partTwo">
          <span>© 2020 - 2021 LinnCode 版权所有</span>
          <span> 苏ICP备20023864号</span>
        </div>
      </main>
    </footer>

  </div>
</template>

<script>
export default {
  data() {
    return {
      //导航数据
      routes:[
        {id:0,path:'/home',content:'Home'},
        {id:1,path:'/life',content:'Life'},
        {id:2,path:'/nav',content:'Nav'},
        {id:3,path:'/blog',content:'Blog'}
      ],
      //轮播图
      img: [
        { id: 0, src: 'https://s1.ax1x.com/2020/05/28/te3Z79.jpg'},
        { id: 1, src: 'https://s1.ax1x.com/2020/05/28/te3f3V.jpg'},
        { id: 2, src: 'https://s1.ax1x.com/2020/05/28/telcrQ.jpg'}
      ],
      //控制九宫格的显示与隐藏
      blockDialog:false,
      //九宫格的数据
      blockData:[
        {id:0,src:'https://s1.ax1x.com/2020/05/28/te3Z79.jpg',span1:'程序天地',span2:'实践最为重要'},
        {id:1,src:'https://s1.ax1x.com/2020/05/28/telcrQ.jpg',span1:'test',span2:'点击进入'},
        {id:2,src:'https://s1.ax1x.com/2020/05/28/teleu4.jpg',span1:'test',span2:'点击进入'},
        {id:3,src:'https://s1.ax1x.com/2020/05/28/te3f3V.jpg',span1:'test',span2:'点击进入'},
        {id:4,src:'https://s1.ax1x.com/2020/05/28/te3hcT.jpg',span1:'test',span2:'点击进入'},
        {id:5,src:'https://s1.ax1x.com/2020/05/28/te34jU.jpg',span1:'test',span2:'点击进入'},
        {id:6,src:'https://s1.ax1x.com/2020/05/28/te3IuF.jpg',span1:'test',span2:'点击进入'},
        {id:7,src:'https://s1.ax1x.com/2020/05/28/te3oB4.jpg',span1:'test',span2:'点击进入'},
        {id:8,src:'https://s1.ax1x.com/2020/05/28/te3THJ.jpg',span1:'test',span2:'点击进入'}
      ],
      //九宫格对话框展示的数据
      blockDialogData:{
        imgPath:''
      },
      //文章数据
      articleData:[
        {id:0,path:'https://s1.ax1x.com/2020/05/28/te3Z79.jpg',title:'No Coding',content:'an easy website builder - just drop site elements to your page, add content and style it to look the way you like.'},
        {id:1,path:'https://s1.ax1x.com/2020/05/28/telcrQ.jpg',title:'No Coding',content:'an easy website builder - just drop site elements to your page, add content and style it to look the way you like.'},
        {id:2,path:'https://s1.ax1x.com/2020/05/28/teleu4.jpg',title:'No Coding',content:'an easy website builder - just drop site elements to your page, add content and style it to look the way you like.'},
        {id:3,path:'https://s1.ax1x.com/2020/05/28/te3f3V.jpg',title:'No Coding',content:'an easy website builder - just drop site elements to your page, add content and style it to look the way you like.'},
        {id:4,path:'https://s1.ax1x.com/2020/05/28/te3hcT.jpg',title:'No Coding',content:'an easy website builder - just drop site elements to your page, add content and style it to look the way you like.'},
        {id:5,path:'https://s1.ax1x.com/2020/05/28/te34jU.jpg',title:'No Coding',content:'an easy website builder - just drop site elements to your page, add content and style it to look the way you like.'},
      ]
    }
  },
  methods: {
    //九宫格点击展示对话框
    showBlockDialog(path){
      this.blockDialog = true
      this.blockDialogData.imgPath = path
    }
  },
}
</script>

<style lang="less" scoped>
.life{background-color: #eee;font-family: "Comic Sans MS", cursive, sans-serif;}
.box{width: 62.5vw;margin: 0 auto;}
.el-backtop{
    bottom: 20px!important;
    background-color: rgba(64,158,255, 0.5);
    border-radius: 5px;
    color: #fff;
}
.life>.el-carousel{
  position: relative;
  img{height: auto;width: 100%;}
  .menban{
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.4);
    width: 100%;
    height: 100%;
  }
}
nav{
  height: 36vw;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 999;
  display: flex;
  flex-direction: column;
  header{
    border-bottom: 1px solid #eeeeee;
    height: 6vh;
    display: flex;
    justify-content: space-between;
    label{
      line-height: 6vh;
      font-size: 1vw;
      letter-spacing: 2px;
      text-transform: uppercase;
      color: white;
    }
    ul{
      list-style: none;
      display: flex;
      li{
        a{
          color: white;
          text-decoration: none;
          font-size: 14px;
          text-transform: uppercase;
          padding: 0 1vw;
          letter-spacing: 1px;
          transition: color .5s;
          &:hover{color: #70a1ff;}
        }
      }
    }
    .icon{
      display: flex;
      justify-content: center;
      align-items: center;
      a{
        margin: 0 10px;
        img{width: 20px;height: 20px;}
      }
      
    }
  }
  main{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 1;
    span{
      color: white;
      font-size: 1.5vw;
      text-align: center;
      letter-spacing: 1px;
      text-transform: uppercase;
    }
    .el-button{
      margin-top: 2vw;
      background-color: #70a1ff;
      border: 0;
      color: white;
    }
  }
  footer{
    height: 5vh;
    ul{
      display: flex;
      align-items: center;
      justify-content: space-around;
      list-style: none;
      li{
        line-height: 5vh;
        color: #fff;
        margin: 0 10px;
        font-size: 24px;
      }
    }
  }
}
.currentLi{color:#70a1ff;}
.gather{
  width: 1172px;
  margin: 4vh auto;
  label{
    font-size: 30px;
    span{color: #70a1ff;}
    font-weight: bolder;
    letter-spacing: 2px;
  }
  .block{
    display: flex;
    flex-flow: row wrap;
    .item{
      width: 384px;
      margin: 0 10px 10px 0;
      height: 270px;
      display: flex;
      flex-direction: column;
      cursor: pointer;
      transition: all .5s;
      &:hover{box-shadow:0px 0px 5px 5px rgba(4,112,200,.25);}
      img{width: 100%;height: auto;}
      div{
        flex: 1;
        padding: 0 10px;
        background-color: #fff;
        p{
          font-size: 14px;
          margin-top: 4px;
          transition: all .5s;
        }
        transition: all .5s;
        &:hover{
          background-color: #000;
          p{color: #fff;}
        }
      }
    }
  }
}
.blockDialog{
    height: 900px;
    img{width: 100%;height: 400px;}
    span{display: block;font-size: 14px;margin: 20px 0 10px 0;}
    .el-button{width: 200px; display: block;}
}
.life>article{
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
  label{
    margin-bottom: 10px;
    font-size: 30px;
    span{color: #70a1ff;}
    font-weight: bolder;
    letter-spacing: 2px;
  }
  >main{
    display: flex;
    flex-flow: row wrap;
    div{
      width: 280px;
      min-height: 430px;
      display: flex;
      flex-direction: column;
      background-color: white;
      box-sizing: border-box;
      margin: 0 30px 10px 0;
      transition: all .5s;
      border-radius: 5px;
      &:hover{box-shadow:5px 8px 5px rgba(0,0,0,.5);}
      &:last-child{margin-right: 0!important;}
      img{width: 100%;height: 190px;}
      span{
        margin: 0 30px 0 30px;
        color: #868686;
        letter-spacing: 1px;
        &:nth-child(2){ color: #232323;margin: 25px 30px 20px 30px;}
      }
      .el-button{margin-top: 20px;}
    }
  }
  
}
.life>footer{
  background-color: #2E2E2E;
  padding-top: 40px;
  main{
    width: 59.375vw;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    .partOne{
      border-bottom: 1px solid #383838;
      display: flex;
      flex-flow: row wrap;
      justify-content: center;
      align-items: center;
      padding-bottom: 20px;
      img{
        height: 100px;
        width: 100px;
        border-radius: 50%;
        border: 1px solid #383838;
      }
      dl{
        display: flex;
        flex-direction: column;
        color: white;
        margin-left: 100px;
        dd:nth-child(2){margin: 20px 0 10px 0;}
        a{
          color: #70a1ff;
          margin-top: 10px;
          &:hover{color: #3498db;}
        }
      }
    }
    .partTwo{
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: white;
      padding-top: 20px;
    }
  }
}
@media screen and (min-width:1220px) {
  .gather .block .item{
    &:nth-child(3n){
      margin-right: 0;
    }
  }
}
@media screen and (max-width:1220px) {
  .gather{
    width: 778px;
  }
  .gather .block .item{
    &:nth-child(2n){
      margin-right: 0;
    }
  }
}
@media screen and (max-width:800px) {
  .gather{
    width: 384px;
  }
  .gather .block .item{
    &:nth-child(n){
      margin-right: 0;
    }
  }
}
@media screen and (min-width:1540px) and (max-width:1850px){
  .life>article>main{
    width: 1520px;
    div:nth-child(5){
      margin-right: 0;
    }
  }
}
@media screen and (min-width:1230px) and (max-width:1540px){
  .life>article>main{
    width: 1210px;
    div:nth-child(4){
      margin-right: 0;
    }
  }
}
@media screen and (min-width:920px) and (max-width:1230px){
  .life>article>main{
    width: 900px;
    div:nth-child(3n){
      margin-right: 0;
    }
  }
}
@media screen and (min-width:610px) and (max-width:920px){
  .life>article>main{
    width: 590px;
    div:nth-child(2n){
      margin-right: 0;
    }
  }
}
@media screen and (max-width:610px){
  .life>article>main{
    width: 280px;
    div:nth-child(n){
      margin-right: 0;
    }
  }
}
@media screen and (max-width:910px) {
  .life nav .icon{
    display: none;
  }
  .life nav>footer li{
    font-size: 16px;
  }
}
@media screen and (max-width:690px) {
  .life nav label{
    display: none;
  }
}
</style>
