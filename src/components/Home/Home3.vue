<template>
    <div id="homethree">

        <!-- 头部区域 -->
        <header>
            <!-- 导航区域 -->
            <nav>
                <li>Simon's Polaris</li>
                <li @click="showWpBox" class="fa fa-power-off"></li>
            </nav>
        </header>

        <!-- 中间区域内容 -->
        <main>

            <!-- 个人待办事项 -->
            <div class="todoList">
                <header>
                    <input type="text" placeholder="Add a task" @keyup.enter="getValue" v-model="valueInput">
                </header>
                <div class="line"></div>
                <main>
                    <h3><label>Not Completed</label> <span id="todocount">{{undo}}</span></h3>
                    <ol>
                        <li class='currentli' v-for="(item,index) in todoList" :key="index" v-show="item.done == false" style="background-color: rgba(255,255,255,.5);">
                            <input type='checkbox' class='currentinput' :checked="item.done" @click="clickCheckbox($event,index)">
                            <p class='currentp' style="color: black;">{{item.title}}</p>
                        </li>
                    </ol>
                    <h3><label>Completed</label> <span id="donecount">{{done}}</span></h3>
                    <ul>
                        <li class='currentli' v-for="(item,index) in todoList" :key="index" v-show="item.done == true" style="background-color: rgba(0,0,0,.5);">
                            <input type='checkbox' class='currentinput' :checked="item.done" @click="clickCheckbox($event,index)">
                            <p class='currentp' style="color: white;">{{item.title}}</p>
                            <a href='javascript:;' class='currenta' @click="deletedata(index)"></a>
                        </li>
                    </ul>
                </main>
            </div>
            
        </main>

        <!-- 底部个人说明 -->
        <footer>
            <section>
                <span>© 2020 - 2021 LinnCode 版权所有</span>
                <span> 苏ICP备20023864号</span>
            </section>
        </footer>
        
         <!-- 壁纸盒子 -->
        <el-dialog
            :class="showWpDA ? 'animated bounceInLeft' : 'animated bounceOutRight' "
            :visible.sync="showWallpaper" width="600px" :modal="false"
            @open="openWD" @close="closeWD" @closed="allcloseWD" top="200px" title="壁纸切换">
            <div class="wallpaper">
                <div class="wallpaperBox" v-for="item in wallpaperList" :key="item.id">
                    <img v-lazy="item.path" @click="clickWpImg(item)" />
                    <div class="select" v-show="selectImgIndex === item.id">√</div>
                </div>
            </div>
        </el-dialog>

        <!-- 蒙板区域 -->
        <transition>
            <div class="mengban" v-show="showBMb"></div>
        </transition>

    </div>
</template>

<script>
export default {
    data(){
        return {
            valueInput:'',//输入框输入的内容
            todoList:[],//todoList数据
            done:0,//已做
            undo:0,//未做
            showWpDA:false,//控制壁纸盒子出现和消失时的动画
            showWallpaper:false,//控制壁纸盒子的显示与隐藏
            wallpaperList:[],//home壁纸数据
            selectImgIndex:-1,//需要选中的壁纸下标
            flagCWp:false,//壁纸盒子没有被点击
            showBMb:false,//是否展示蒙版
            changeWpForm:{//切换壁纸
                id:2,
                path:''
            }
        }
    },
    created() {
        this.getTodoData()//调用浏览器存储的数据
    },
    methods: {
        //获取输入框的value值
        getValue(){
            if(this.valueInput === ''){
                 this.$message({ message: '请输入内容',type: 'warning'})
            }else{
                //把todoList数组进行更新数据 把最新的数据追加给todoList数组
                this.todoList.push({title:this.valueInput,done:false})
                // 把这个数组存储到本地
                this.setTodoData(this.todoList)
                this.valueInput = ''
                this.getTodoData()
                this.getLength(this.todoList)
            }
        },
        //存储数据到本地
        setTodoData(data){
            localStorage.setItem("todolist",JSON.stringify(data))
        },
        //获取本地数据
        getTodoData(){
            if(localStorage.getItem("todolist") === null){
                this.todoList = []
            }else{
                this.todoList = JSON.parse(localStorage.getItem("todolist"))
            }
            this.getLength(this.todoList)
        },
        //获取数据数量
        getLength(data){
            this.undo = 0
            this.done = 0
            data.forEach(item => {
                if(!item.done){
                    this.undo++
                }else{
                    this.done++
                }
            })
        },
        //点击CheckBox
        clickCheckbox(e,id){
            this.todoList[id].done = e.target.checked
            this.setTodoData(this.todoList)
            this.getLength(this.todoList)
        },
        //删除事项
        deletedata(id){
            this.todoList.splice(id,1)
            this.setTodoData(this.todoList)
            this.getLength(this.todoList)
        },
        showWpBox(){
            this.showWallpaper = true
            this.getWallpaperData()
        },
        //获取wallpaper数据
        async getWallpaperData(){
          const {data:res} = await this.$http.get('wallpaperdata')
          if(res.code != 200) return this.$message({message: `${res.tips}`,type: 'error',duration:1000})
          this.wallpaperList = res.data
          this.wallpaperList.some(item => {
            if(item.path == this.wallpaperList[2].newpath){
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
#homethree{
    position: relative;
    height: 100vh;
    display: flex;
    flex-direction: column;
    >header{height: 8vh;}
    >main{
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    >footer{
        width: 100vw;
        height: 5vh;
    }
}
#homethree>header {
  nav{
    display: flex;
    list-style: none;
    justify-content: space-around;
    li {
      line-height: 8vh;
      color: #fff;
      cursor: pointer;
      text-transform: uppercase;
      transition: all 0.5s;
      &:first-child{
        color: #fff;
        font-size: 0.8vw;
        letter-spacing: 2px;
        cursor:pointer;//鼠标悬停成小手
        transition: all .5s;
        &:hover{color: #1E90FF;}
      }
      &:last-child{
        color: #fff;
        font-size: 16px;
        cursor:pointer;//鼠标悬停成小手
        transition: all .5s;
        &:hover{color: #1E90FF;} 
      }
      &:hover {color: #1E90FF;}
    }
  }
}
#homethree>main{
    .todoList{
        width: 30vw;
        margin-top: 20px;
        header{
            display: flex;
            align-items: center;
            justify-content: space-between;
            input{
                width: 20vw;
                border: none;
                background: none;
                outline: none;
                font-size: 1vw;
            }
        }
        .line{
            border: 1px solid rgba(255,255,255,.4);
            margin: 1vh 0 1vh 0;
        }
        main{
            h3{
                color: #000;
                font-size: 1vw;
                position: relative;
                margin-bottom: 2vh;
                display: flex;
                justify-content: space-between;
                span{
                    font-size: 1vw;
                    color: #767676;
                }
            }
        }
    }
}
#homethree>footer {
    section{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: white;
        letter-spacing: 2px;
        span{font-size: 0.6vw;}
    }
}
#homethree .mengban {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
}
#homethree .el-dialog .wallpaper {
    display: grid;
    grid-template-columns: repeat(3,1fr);
    grid-template-rows: repeat(2,1fr);
    gap: 8px;
    height: 350px;
    overflow-y: hidden;
    &:hover {overflow-y: auto;}
    .wallpaperBox{
        position: relative;
        img{
            width: 100%;
            height: 106px;
        }
        .select{
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 106px;
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