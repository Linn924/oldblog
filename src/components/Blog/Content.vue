<template>
    <article id="article">
        <!-- 博客区域 -->
        <article v-for="item in blogList" :key="item.id">
            <span @click="changePath(item)">{{item.title}}</span>
            <div>
                <i class="fa fa-calendar"><span>{{item.date}}</span></i>
                <i class="fa fa-folder"><span>{{item.sort_name}}</span></i>
                <i class="fa fa-tag"><span>{{item.technology_name}}</span></i>
            </div>
            <p>{{item.introduce}}</p>
        </article>
        <!-- 博客区域 end-->

        <!-- 分页区域 -->
        <footer>
            <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                :current-page="queryList.pagenum" :page-sizes="[3, 5, 8]" :page-size="queryList.pagesize"
                layout="sizes, prev, pager, next, jumper" :total="total" id="pageOne">
            </el-pagination>

            <el-pagination background @current-change="handleCurrentChange"
                :current-page="queryList.pagenum" :page-size="queryList.pagesize"
                layout="pager" :total="total" id="pageTwo">
            </el-pagination>
        </footer>
        <!-- 分页区域 end-->
        
    </article>
</template>

<script>
export default {
    data(){
        return {
            blogList:[],//博客数据   
            queryList:{
                key:'',
                pagenum:1,
                pagesize:5
            }, 
            total:0
        }
    },
    created() {
        this.getBlogData()//获取博客数据
    },
    methods: {
        //获取博客数据
        async getBlogData(){
            this.queryList.key = this.$store.state.value 
            const {data:res} = await this.$http.get("blogdata",{params:this.queryList})
            if(res.code != 200) return this.$message.error(`${res.tips}`)
            this.blogList = res.data
            this.total = res.total
            this.queryList.key = ''
            this.$store.commit("setValueAgain")
        },
        //监听每页展示博客数量的变化
        handleSizeChange(newSize) {
            this.queryList.pagesize = newSize
            this.getBlogData()
        },
        //监听去往第几页的变化
        handleCurrentChange(newNum) {
            this.queryList.pagenum = newNum
            this.getBlogData()
        },
        //监听要查看的博客地址
        changePath(item){
            this.$store.commit('setMdname',item.mdname)
            this.$router.push({path:`/template?${item.mdname}`})
        },
        //再次获取数据
        async getDataAgain(){
            const {data:res} = await this.$http.get("blogdata",{params:this.queryList})
            if(res.code != 200) return this.$message.error(`${res.tips}`)
            this.blogList = res.data
            this.total = res.total
        }
    }
}
</script>

<style lang="less" scoped>
article{
    width: 100%;
    article{
        background-color: rgba(255, 255, 255, 0.4);
        border-radius: 8px;
        box-shadow: 0 2px 10px 0 rgba(0,0,0,0.12);
        margin-bottom: 10px;
        padding: 20px 20px;
        box-sizing: border-box;
        color: #000;
        >span{
            font-size: 30px;
            cursor: pointer;
            transition: color .3s;
            &:hover{color: #70A1FF;}
        }
        div{
            margin: 20px 0;
            i{
                margin-right: 10px;
                span{
                    cursor: pointer;
                    margin-left: 10px;
                    transition: color .3s;
                    &:hover{color: #70A1FF;}
                }
            }
        }
    }
    footer{
        display: flex;
        justify-content: center;
    }
}
</style>