<template>
    <div id="login">

        <section>

            <!-- 登录盒子 -->
            <div :class="showAnimate ?'loginBox animated bounceInLeft':'loginBox animated bounceOutLeft'">

                <!-- 左侧图片 -->
                <div class="img"></div>

                <!-- 右侧登录表单 -->
                <div :class="changeColor ? 'loginForm textcolor':'loginForm'" @mouseenter="enterLogin" @mouseleave="leaveLogin">
                    <el-form ref="loginFormRef" :model="loginForm" :rules="loginRules">
                        <span>LOGIN</span>
                        <span>Login with your account</span>
                        <el-form-item prop="username">
                            <el-input v-model="loginForm.username" clearable prefix-icon="el-icon-user-solid" placeholder="username" autofocus="true"></el-input>
                        </el-form-item>
                        <el-form-item prop="password">
                            <el-input v-model="loginForm.password" clearable prefix-icon="el-icon-lock" type="password" placeholder="password"></el-input>
                        </el-form-item>
                        <div class="check">
                            <el-checkbox v-model="checked">Remember Me</el-checkbox>
                            <a href="#">Forget password?</a>
                        </div>
                        <el-button @click="login">Login</el-button>
                        <span>if you do not have an account <a href="#" @click.prevent="showAnimate = false" v-show="false">Sign up</a></span>
                    </el-form>
                    <div></div>
                </div>

            </div> 
            
            <!-- 注册盒子 -->
            <div :class="showAnimate ?'registerBox animated bounceOutRight':'registerBox animated bounceInRight'">

                <!-- 左侧注册表单 -->
                <div class="registerForm">
                    <el-form ref="registerFormRef" :model="registerForm" :rules="registerRules">
                        <span>REGISTER</span>
                        <span>Register new account</span>
                        <el-form-item prop="username">
                            <el-input v-model="registerForm.username" clearable prefix-icon="el-icon-user-solid" placeholder="username" autofocus="true"></el-input>
                        </el-form-item>
                        <el-form-item prop="password">
                            <el-input v-model="registerForm.password" clearable prefix-icon="el-icon-lock" type="password" placeholder="password"></el-input>
                        </el-form-item>
                        <el-form-item prop="phone">
                            <el-input v-model="registerForm.phone" clearable prefix-icon="el-icon-mobile-phone" placeholder="phone"></el-input>
                        </el-form-item>
                        <el-form-item prop="email">
                            <el-input v-model="registerForm.email" clearable prefix-icon="fa fa-envelope-o" placeholder="email"></el-input>
                        </el-form-item>
                        <el-button @click="register">Register</el-button>
                        <span>if you have an account <a href="#" @click.prevent="showAnimate = true">Sign in</a></span>
                    </el-form>
                </div>

                <!-- 右侧图片 -->
                <div class="img"></div>

            </div> 
           
        </section>

    </div>
</template>

<script>
export default {
    data(){
        // 验证邮箱的规则
        var checkEmail = (rule, value, cb) => {
            // 验证邮箱的正则表达式
            const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
            if (regEmail.test(value)) {
                // 合法的邮箱   
                return cb()
            }
            cb(new Error('请输入合法的邮箱'))
        }
        // 验证手机号的规则
        var checkMobile = (rule, value, cb) => {
            // 验证手机号的正则表达式
            const regMobile = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
            if (regMobile.test(value)) {
                return cb()
            }
            cb(new Error('请输入合法的手机号'))
        }
        return {
            //登录表单数据
            loginForm:{
                username:'',
                password:''
            },
            //注册表单数据
            registerForm:{
                username:'',
                password:'',
                phone:'',
                email:''
            },
            checked:false,//默认不选中
            //登录表单验证规则
            loginRules:{
                username:[
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
                ],
                password:[
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
                ]
            },
            //注册表单验证规则
            registerRules:{
                username:[
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
                ],
                password:[
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
                ],
                phone: [
                    { required: true, message: '请输入手机号', trigger: 'blur' },
                    { validator: checkMobile, trigger: 'blur' }
                ],
                email: [
                    { required: true, message: '请输入邮箱', trigger: 'blur' },
                    { validator: checkEmail, trigger: 'blur' }
                ]
                
            },
            changeColor:false,//改变字体颜色
            animate:false,//展示哪种动画
            showAnimate:true,//是否展示切换动画
            isIn:true,//打开进去的门
            isOut:false//关上出去的门
        }
    },
    methods: {
        //点击登录按钮
        async login(){
             this.$refs.loginFormRef.validate( async valid => {
                if(!valid) return
                const {data:res} = await this.$http.post("login",this.loginForm)
                if(res.code != 200) return this.$message({message: `${res.tips}`,type: 'error',duration:1000})
                this.$message({message: `${res.tips}`,type: 'success',duration:1000});
                window.sessionStorage.setItem('uname',res.uname)
                window.sessionStorage.setItem('token', res.token)
                this.$router.push('/home')
             })
        },
        //点击注册按钮
        async register(){
             this.$refs.registerFormRef.validate( async valid => {
                if(!valid) return
                const {data:res} = await this.$http.post("register",this.registerForm)
                if(res.code !=200) return this.$message({message: `${res.tips}`,type: 'error',duration:1000})
                this.$message({message: `${res.tips}`,type: 'success',duration:1000})
                this.showAnimate = false
             })
        },
        //鼠标移入登录表单 添加动画类
        enterLogin(e){
            this.changeColor = true
            const width = document.querySelector("section").offsetLeft
            const height = document.querySelector("section").offsetTop
            let div = document.querySelector('.loginForm>div')
            if(this.isIn){
                let inx = e.clientX - e.target.offsetLeft - width
                let iny = e.clientY - height
                div.style.left = inx + 'px'
                div.style.top = iny + 'px'
                div.classList.remove('out')
                div.classList.add('in')
                this.isIn = false
                this.isOut = true
            }
        },
        //鼠标移出登录表单 添加动画类
        leaveLogin(e){
            this.animate = false
            this.changeColor = false
            const width = document.querySelector("section").offsetLeft
            const height = document.querySelector("section").offsetTop
            let div = document.querySelector('.loginForm>div')
            if(this.isOut){
                let inx = e.clientX - e.target.offsetLeft - width
                let iny = e.clientY - height
                div.style.left = inx + 'px'
                div.style.top = iny + 'px'
                div.classList.remove('in')
                div.classList.add('out')
                this.isOut = false
                this.isIn = true
            }
        }
    },
}
</script>

<style lang="less" scoped>
a{
    color: #CBCCE2;
    &:hover{color: #0081ff;}
}
#login{
    height: 100vh;
    width: 100vw;
    min-width: 480px;
    background-color: #ccc;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow-x: hidden;
    >section{
        width: 50vw;
        height: 35vw;
        position: relative;
    }
}
.loginBox{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    box-shadow: 5px 8px 5px #888888;//阴影
    .img{
        width: 22vw;
        height: 100%;
        background: url('https://s1.ax1x.com/2020/04/27/JWtx6x.jpg');
        -webkit-background-size: cover;//图片随屏幕大小同步缩放部分可能会被裁切
        background-position: center 50%;
    }
    .loginForm{
        position: relative;
        overflow: hidden;
        flex: 1;
        background-color: white;
        transition: color .5s;
        .el-form{
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            width: 100%;
            padding: 0 2vw;
            font-size: 0.8vw;
            z-index: 10;
            .el-input{width: 23.4vw!important;}
            .check{
                display: flex;
                flex-flow: row wrap;
                justify-content: space-between;
            }
            .el-button{
                margin: 1vw 0;
                width: 23.4vw;
                text-align: center;
                color: #1E90FF;
                border: 1px solid #1E90FF;
                &:hover{color: #0081ff;border: 1px solid #0081ff;
                }
            }
        }
    }
}
.registerBox{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    border-radius: 5px;
    box-shadow: 5px 8px 5px #888888;//阴影
    .registerForm{
        position: relative;
        overflow: hidden;
        flex: 1;
        background-color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: color .5s;
        .el-form{
            display: flex;
            flex-direction: column;
            width: 100%;
            padding: 0 2vw;
            font-size: 0.8vw;
            z-index: 10;
            .check{
                display: flex;
                flex-flow: row wrap;
                justify-content: space-between;
            }
            .el-button{
                margin: 1vw 0;
                color: #1E90FF;
                border: 1px solid #1E90FF;
                width: 23.4vw;
                &:hover{
                    color: #0081ff;
                    border: 1px solid #0081ff;
                }
            }
            .el-input{
                width: 23.4vw!important;
            }
        }
    }
    .img{
        width: 22vw;
        height: 100%;
        background: url('https://s1.ax1x.com/2020/04/27/JWtzX6.jpg');
        -webkit-background-size: cover;//图片随屏幕大小同步缩放部分可能会被裁切
        background-position: center 50%;
    }
        
}
.el-form span:first-child{
    text-align:center;
    font-weight: bolder;
    text-shadow: 5px 5px 5px rgba(33, 45, 58, 0.3);
}
.el-form span:nth-child(2){
   margin: 1.4vw 0;
   text-shadow: 5px 5px 5px rgba(33, 45, 58, 0.3);
}    
.el-form span:last-child{
   text-align: center;
   text-shadow: 5px 5px 5px rgba(33, 45, 58, 0.3);
}  
.el-form span:last-child a{
   text-decoration: underline!important;
   color: red;
   margin-left: 10px;
   transition: color .5s;
   &:hover{color: #0081ff;}
} 
.textcolor{color: #fff!important;}
//控制动画执行的时间
.animated {animation-duration: 1.2s!important;}
//设置鼠标进入的样式
.in{
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: #70a1ff;
    transform: translate(-50%,-50%);
    animation: in 0.5s ease-out forwards;
}
//设置鼠标离开的样式
.out{
    position: absolute;
    top: 0;
    left: 0;
    width: 1800px;
    height: 1800px;
    border-radius: 50%;
    background: #70a1ff;
    transform: translate(-50%,-50%);
    animation: out 0.5s ease-out forwards;//缓出函数 停留在最后一帧
}
//鼠标进入元素的动画
@keyframes in{
    0%{
        width: 0;
        height: 0;
    }
    100%{
        width: 1800px;
        height: 1800px;
    }
}
//鼠标离开元素的动画
@keyframes out{
    0%{
        width: 1800px;
        height: 1800px;
    }
    100%{
        width: 0;
        height: 0;
    }
}
</style>