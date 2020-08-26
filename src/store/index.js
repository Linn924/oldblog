import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    mdname: '',//md文件名称
    value:''//blog界面搜索框关键词
  },
  mutations: {
    //为store中的mdname赋值
    setMdname(state, val) {
      state.mdname = val
    },
    setValue(state,val) {
      state.value = val
    },
    setValueAgain(state) {
      state.value = ''
    }
  },
  actions: {
  },
  modules: {
  }
})
