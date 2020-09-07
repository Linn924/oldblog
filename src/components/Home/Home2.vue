<template>
  <div class="hometwo" @click="shakeIndex = 0">

    <!-- 头部区域 -->
    <header>
      <!-- 导航区域 -->
      <ul>
        <li>Simon's Polaris</li>
        <li @click="showWallpaper = true" class="fa fa-star"></li>
      </ul>
    </header>

    <!-- 主体区域 -->
    <main>

      <!-- 搜索框区域 -->
      <div class="search">
        <div class="time">{{ time }}</div>
        <input type="text" :class="enlargeSearch ? 'enlarge' : 'narrow' " id="input" 
        @blur="blurInput" ref="focus" v-model="valueSearch" @keyup="search"/>
        <ul class="searchData">
          <li v-for="item in searchData" :key="item.id" v-show="item.id < 7" @click="clickLi(item.path)">
            {{item.title}}
          </li>
        </ul>
        <div :class="enlargeSearch ? 'Maoboli enlarge' : 'Maoboli narrow' " 
              @mouseenter="enlargeSearch = true" @mouseout="outSearch" 
              @click="clickSearch" v-show="showMbl">
            <div class="maoboli" 
                :style="{'background':switchBgImg ? `url(${newpath}) center` : `url(${oldpath}) center`}">
            </div>
            <span :class="enlargeSearch ? 'enlarge' : 'narrow' ">search</span>
        </div>
      </div>

      <!-- 宫格区域 -->
      <div class="block">
        <ul>
          <li v-for="item in blockList" :key="item.id">
            <div :class="item.id === shakeIndex ? 'Icon shake' : 'Icon' ">
                <a :href="item.href" target="_blank">
                  <div :class="item.id === twinkleIndex ? 'circle twinkle' : 'circle' "></div>
                  <img :src="item.newpath" alt="" @mouseenter="twinkleIndex = item.id" @mouseout="twinkleIndex = 0" 
                  @contextmenu.prevent="shakeIndex = item.id"/>
                </a>
                <div class="editBlock" v-show="item.id === shakeIndex">
                  <span class="el-icon-edit-outline" @click="editBlock(item)"></span>
                  <span class="el-icon-circle-close" @click="deleteBlock(item.id)"></span>
                </div>
            </div>
            <span>{{item.content}}</span>
          </li>
        </ul>
      </div>

    </main>

    <!-- 底部个人说明 -->
    <footer>
        <main>
            <span>© 2020 - 2021 LinnCode 版权所有</span>
            <span> 苏ICP备20023864号</span>
        </main>
    </footer>

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
              <img v-lazy="item.path" @click="clickWpImg(item)" @contextmenu.prevent="deleteImgIndex = item.id"/>
              <div class="smallmengban" v-show="selectImgIndex === item.id">√</div>
              <div class="smallmengban" v-show="deleteImgIndex === item.id" @click="deleteWpImg(item)">X</div>
            </div>
          </div>
        </div>
        <div class="wallpaperBox">
          <span>上传壁纸</span>
          <div class="uploadBox">
            <input type="file" accept="image/*" @change="uploadFile" ref="uploadWp" v-show="false"/>
            <a href="javascript:;" class="upload" @click="uploadWp">+</a>
          </div>
        </div>
      </div>
    </el-dialog>

    <!-- 编辑抽屉 -->
    <el-drawer
      title="编辑" :visible.sync="showDrawer" direction="rtl" 
      :modal="false" @close="showBMb = false" size="400px">
      <el-input v-model="drawerData.href" clearable></el-input>
      <el-input v-model="drawerData.name" clearable></el-input>
      <div class="img">
        <img :src="drawerData.src" alt="">
        <div class="uploadText">
            <input type="file" accept="image/*" @change="uploadFile" v-show="false" ref="uploadBImg"/>
            <a href="javascript:;" class="upload" @click="uploadBImg" v-show="false">修改图片</a>
        </div>
      </div>
      <el-button type="success" @click="finishEB">完成</el-button>
    </el-drawer>

    <!-- 蒙板区域 -->
    <transition>
      <div class="mengban" v-show="showBMb" @click="clickBMb"></div>
    </transition>
    
  </div>
</template>

<script>
 export default {
    data(){
        return {
            time:'',//实时时间
            showMbl:true,//控制搜索框毛玻璃的显示与隐藏
            enlargeSearch:false,//控制整个search的放大和缩小
            newpath:'',//修改后的毛玻璃背景图地址
            oldpath:'',//默认的毛玻璃背景图地址
            flagCMbl:false,//是否点击了毛玻璃
            showBMb:false,//控制全屏蒙板的显示与隐藏
            valueSearch:'',//搜索框的value数据
            twinkleIndex:0,//需要闪烁动画的block里面的图片下标
            shakeIndex:0,//需要抖动动画的block里面的图片下标
            showWpDA:false,//控制壁纸盒子出现和消失时的动画
            selectImgIndex:-1,//需要选中的壁纸下标
            deleteImgIndex:0,//需要删除的壁纸下标
            flagCWp:false,//壁纸盒子没有被点击
            switchBgImg:false,//控制毛玻璃背景的切换
            showWallpaper:false,//控制壁纸盒子的显示与隐藏
            wallpaperList:[],//home壁纸数据
            blockList:[],//block的数据
            showDrawer: false,//控制抽屉的显示与隐藏
            drawerData:{//抽屉中的数据
              id:'',
              href:'',
              name:'',
              src:''
            },
            modifyDrawer:0,//是否修改了drawerData
            jsonpCBData:[],//搜索框关键词联想数据
            searchData:[],//搜索框关键词联想最终的数据(包含所有链接地址)
            searchDataId:0,
            changeWpForm:{
              id:1,
              path:''
            }  
        }
    },
    watch:{
      //只要当drawerData中的值改变就会触发这个函数且,newValue,oldValue两个参数值相同
      drawerData:{
        handler(newValue,oldValue){
          this.modifyDrawer++
        },
        deep:true
      },
    },
    created() {
      this.updateTime()//调用更新时间方法
      this.getBlockData()//调用获取block数据的接口
      this.getWallpaperData()//调用获取壁纸数据的接口
    },
    mounted() {
      //jsonp跨域时的回调
      window.jsonpCB = (data) => {
            this.emptyData()
            this.jsonpCBData = data.s
            this.jsonpCBData.forEach( item =>{
              var obj = {}
              obj.path = 'https://www.baidu.com/s?wd=' + item
              obj.title = item
              obj.id = this.searchDataId
              this.searchDataId++
              this.searchData.push(obj)
            })
      }
    },
    methods: {
        //获取实时时间
        getTime(){
            var date = new Date()
            var h = date.getHours()<10 ? '0' + date.getHours() : date.getHours()
            var m = date.getMinutes()<10 ? '0' + date.getMinutes() : date.getMinutes()
            return h + ':' + m
        },
        //实时更新时间
        updateTime(){
            var that = this//setInterval中的this指向window 所以要修改
            setInterval(()=>{
                that.time = that.getTime()
            },1000)
        },
        //获取block的数据
        async getBlockData(){
          const {data:res} = await this.$http.get('blockdata')
          if(res.code != 200) return this.$message({message: `${res.tips}`,type: 'error',duration:1000})
          this.blockList = res.data
        },
        //获取wallpaper数据
        async getWallpaperData(){
          const {data:res} = await this.$http.get('wallpaperdata')
          if(res.code != 200) return this.$message({message: `${res.tips}`,type: 'error',duration:1000})
          this.wallpaperList = res.data
          this.oldpath = this.wallpaperList[1].newpath//默认毛玻璃背景图
          this.wallpaperList.some(item => {
            if(item.path == this.wallpaperList[1].newpath){
              this.selectImgIndex = item.id
              return true
            }
          })
        },
        //鼠标移出search
        outSearch(){
          if(!this.flagCMbl){
            this.enlargeSearch = false
          }
        },
        //鼠标点击search
        clickSearch(){
          this.flagCMbl = true
          this.showMbl = false
          this.showBMb = true
          this.filterBlock = true
          this.$nextTick( () =>{
              this.$refs.focus.focus()
          })
        },
        //搜索框搜索
        search(e){
          if(e.keyCode == 13){
              window.open("https://www.baidu.com/s?wd="+this.valueSearch)
              this.valueSearch = ""
          }
          this.$jsonp('https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su',{
                wd: this.valueSearch,
                cb: "jsonpCB"
          }).then(res =>{})
          if(this.valueSearch == "") {this.emptyData()}
        },
        //点击li标签跳转
        clickLi(path){
          window.open(path)
          this.emptyData()
        },
        //点击大蒙版触发置空加失焦
        clickBMb(){
           this.blurInput()
           this.emptyData()
        },
        //置空jsonp回调的数据
        emptyData(){
           this.jsonpCBData = []
           this.searchData = []
           this.searchDataId = 0
        },
        //input失去焦点
        blurInput(){
           this.flagCMbl = false
           this.outSearch()
           this.valueSearch = ''
           this.showMbl = true
           this.showBMb = false
           this.filterBlock = false
        },
        //点击block编辑
        editBlock(item){
            this.showDrawer = true
            this.showBMb = true
            this.drawerData.id = item.id
            this.drawerData.name = item.content
            this.drawerData.href = item.href
            this.drawerData.src = item.newpath
        },
        //删除指定block
        async deleteBlock(id){
          const {data:res} = await this.$http.post('deleteblock',{id:id})
          if(res.code != 200) return this.$message({message: `${res.tips}`,type: 'error',duration:1000})
          this.$message({message: `${res.tips}`,type: 'success',duration:1000})
          this.getBlockData()
        },
        //完成编辑
        async finishEB(){
          if(this.modifyDrawer >1){
            const {data:res} = await this.$http.post("updateblock",this.drawerData)
            if(res.code != 200) return this.$message({message: `${res.tips}`,type: 'error',duration:1000})
            this.$message({message: `${res.tips}`,type: 'success',duration:1000})
            this.getBlockData()
            this.showDrawer = false
            this.modifyDrawer = 0
          }else{
            this.showDrawer = false
            this.modifyDrawer = 0
          }
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
        //壁纸盒子关闭动画结束时的回调
        async allcloseWD(){
          if(this.flagCWp){
            const {data:res} = await this.$http.post('changewallpaper',this.changeWpForm)
            if(res.code != 200) return this.$message({message: `${res.tips}`,type: 'error',duration:1000})
            this.$message({message: `${res.tips}`,type: 'success',duration:1000})
            this.flagCWp = false
          }else{
            this.deleteImgIndex = 0
          }
        },
        //壁纸盒子里面的img被点击
        clickWpImg(item){
            this.flagCWp = true
            this.selectImgIndex = item.id
            this.changeWpForm.path = item.path
            this.$emit("changeWallpaper",this.changeWpForm)//自定义事件 将值传给父组件
            this.newpath = item.path
            this.switchBgImg = true
        },
        //上传壁纸
        uploadWp(){
          this.$refs.uploadWp.click()
        },
        //上传抽屉里面修改的图片
        uploadBImg(){
          this.$refs.uploadBImg.click()
        },
        //上传图片到服务器
        async uploadFile(e){
            let image = e.target.files[0]; //获取图片文件
            let formData = new FormData();  // 创建form对象
            formData.append('image', image);  // 通过append向form对象添加数据
            const {data:res} = await this.$http.post('uploadImg',formData)
            if(res.code != 200) return this.$message({message: `${res.tips}`,type: 'error',duration:1000})
            this.$message({message: `${res.tips}`,type: 'success',duration:1000})
            this.getWallpaperData()
        },
        //删除上传的壁纸
        async deleteWpImg(item){
          const {data:res} = await this.$http.post('deleteImg',{path:item.path})
          if(res.code != 200) return this.$message({message: `${res.tips}`,type: 'error',duration:1000})
          this.$message({message: `${res.tips}`,type: 'success',duration:1000})
          this.getWallpaperData()
        }
    }
  }
</script>

<style lang="less" scoped>
.hometwo {
  height: 100vh;
  width: 100vw;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  position: relative;
  font-family: "Comic Sans MS", cursive, sans-serif;
}
.hometwo>header {
  height: 6vh;
  ul {
    display: flex;
    list-style: none;
    justify-content: space-around;
    li {
      line-height: 6vh;
      color: #fff;
      cursor: pointer; //鼠标悬停成小手
      text-transform: uppercase; //定义仅有大写字母。
      transition: all 0.5s;
      &:hover {
        color: #238EF7;
      }
    }
  }
}
header li:first-child{
    color: #fff;
    font-size: 0.8vw;
    letter-spacing: 2px;
    cursor:pointer;//鼠标悬停成小手
    transition: all .5s;
    &:hover{
        color: #1E90FF;
    }
}
header li:last-child{
    color: #fff;
    font-size: 16px;
    cursor:pointer;//鼠标悬停成小手
    transition: all .5s;
    &:hover{
        color: #1E90FF;
    }
    
}
.hometwo>main{
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: 100vw;
}
.hometwo .search {
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  position: relative;
  .time {
    color: white;
    font-size: 30px;
  }
  input {
    border: 0;
    border-radius: 18px;
    width: 180px;
    height: 36px;
    outline: none;
    text-align: center;
    position: absolute;
    top: 8vh;
    z-index: 1;
  }
  .searchData{
    position: absolute;
    top: 12vh;
    left: 50%;
    border-radius: 10px;
    margin-left: -180px;
    width: 360px;
    background-color: white;
    z-index: 2;
    li{
      display: block;
      width: 360px;
      box-sizing: border-box;
      height: 50px;
      padding: 10px 0 10px 10px;
      cursor: pointer;
      &:hover{
        background-color: #ccc;
      }
      &:first-child{
        border-radius: 10px 10px 0 0;
      }
      &:nth-child(7){
        border-radius: 0 0 10px 10px;
      }
    }
  }
  .Maoboli{
    height: 36px;
    width: 180px;
    border-radius: 18px;
    position: absolute;
    top: 8vh;
    z-index: 2;
    cursor: text;
    .maoboli {
      height: 100%;
      width: 100%;
      border-radius: 18px;
      filter: blur(5px);
      background-attachment: fixed;
    }
    span {
      display: block;
      width: 180px;
      text-align: center;
      position: absolute;
      top: 50%;
      left: 50%;
      line-height: 36px;
      transform: translate(-50%,-50%);
      color: #1E90FF;
    }
  }
  
}
//放大search的类
.enlarge{
    animation: enlarge .5s forwards;
}
@keyframes enlarge {
    0%{
        width: 180px;
    }
    100%{
        width: 360px;
    }
}
//缩小search的类
.narrow{
    animation: narrow .5s forwards;
}
@keyframes narrow {
    0%{
        width: 360px;
    }
    100%{
        width: 180px;
    }
}
.hometwo .block {
  width: 57.9vw;
  height: 58vh;
  justify-content: center;
  transition: all 1s;
  ul {
    display: flex;
    box-sizing: border-box;
    flex-flow: row wrap;
    li {
      width: 5.2vw;
      height: 6.4vw;
      margin: 0 5.2vw 10.4vh 0;
      display: flex;
      flex-direction: column;
      .Icon{
        width: 5.2vw;
        height: 5.2vw;
        border-radius: 50%;
        margin-bottom: 5px;
        position: relative;
        a {
          display: block;
          width: 5.2vw;
          height: 5.2vw;
          position: relative;
          .circle {
            width: 5.2vw;
            height: 5.2vw;
            border-radius: 50%;
            background-color: rgb(24, 117, 247);
          }
          img {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border-radius: 50%;
          }
        }
        .editBlock {
          position: absolute;
          top: 0;
          left: 0;
          width: 5.2vw;
          height: 5.2vw;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.5);
          cursor: pointer;
          .el-icon-edit-outline {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
            display: block;
            width: 2vw;
            color: white;
            font-size: 1.8vw;
            transition: all 1s;
            &:hover{
              color: #1E90FF;
            }
          }
          .el-icon-circle-close {
            position: absolute;
            top: 0;
            left: 4vw;
            color: white;
            font-size: 1.8vw;
            transition: all 1s;
            &:hover{
              color: #1E90FF;
            }
          }
        } 
      }
      span {
        display: block;
        text-align: center;
        color: #1e90ff;
        font-size: 0.8vw;
      }
    }
  }
}
.block ul li:nth-child(6n) {
  margin-right: 0 !important;
}
//给block定义circle动画的类
.twinkle {
  animation: twinkle 1.5s linear infinite;
}
//定义circle动画
@keyframes twinkle {
  0% {
    filter: blur(1px);
    opacity: 1;
  }
  50% {
    transform: scale(1.2, 1.2);
    filter: blur(2px);
    opacity: 0.3;
  }
  75% {
    transform: scale(1.1, 1.1);
    filter: blur(2px);
    opacity: 0.3;
  }
  100% {
    transform: scale(1.1, 1.1);
    filter: blur(1px);
    opacity: 0.1;
  }
}
//给block中的a定义shake动画的类
.shake {
  animation: shake 0.2s linear infinite;
}
//定义shake动画
@keyframes shake {
  0% {
  }
  50% {
    transform: rotate(-3deg);
  }
  100% {
    transform: rotate(3deg);
  }
}
//定义一个蒙板类
.hometwo .mengban {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
}
.hometwo footer {
    width: 100vw;
    height: 5vh;
    main{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: white;
        letter-spacing: 2px;
        span{
            font-size: 0.6vw;
        }
    }
}
.hometwo .el-dialog .wallpaper {
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
    .el-button{
      width: 80px;
    }
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
      margin: 0 7px 10px 0;
      cursor: pointer;
      position: relative;
      &:nth-child(3n) {
        margin-right: 0;
      }
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
.el-dialog .wallpaper .uploadBox {
    position: relative;
    width: 150px;
    height: 150px;
    border: 1px dashed #ccc;
    border-radius: 10px;
    &:hover{
        border: 1px dashed blue;
    }
    .upload {
        display: block;
        width: 150px;
        line-height: 150px;
        color: #70a1ff;
        text-decoration: none;
        text-align: center;
        border-radius: 10px;
        font-size: 50px;
    }
}
/*壁纸盒子滚动条样式*/
.wallpaper::-webkit-scrollbar {
  width: 4px;
}
.wallpaper::-webkit-scrollbar-thumb {
  background-color: #5a76cd;
}
//抽屉(编辑block)
.hometwo .el-drawer{
  .el-input{
    width: 88%;
    margin: 0 0 20px 20px;
    border-radius: 5px;
  }
  .img{
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    img{
      width: 100px;
      height: 100px;
      border-radius: 50%;
      margin: 0 20px 0 20px;
      border: 1px solid #eee;
    }
    span{
      cursor: pointer;
      color: #1e90ff;
      font-size: 16px;
      &:hover{
        text-decoration: solid;
        color: green;
      }
    }
  }
  .el-button{
    width: 88%;
    margin-left: 20px;
  }
}
.hometwo .el-drawer .uploadText{
  position: relative;
  width: 70px;
  height: 30px;
  .upload {
      display: block;
      width: 70px;
      line-height: 30px;
      color: #70a1ff;
      text-decoration: none;
      text-align: center;
      font-size: 16px;
      &:hover{
        color: #67C23A;
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
</style>
