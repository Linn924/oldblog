import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    mdname: '',//md文件名称
    value:'',//blog界面搜索框的值
    blogList:'',//博客数据
    total:'',//文章总数
  },
  mutations: {
    setMdname(state, val) {
      state.mdname = val
    },
    setValue(state,val) {
      state.value = val
    },
    setValueAgain(state) {
      state.value = ''
    },
    setBlogData(state,val){
      state.blogList = val.data.reverse()
      state.total = val.total
    }
  },
  actions: {
  },
  modules: {
  }
})
