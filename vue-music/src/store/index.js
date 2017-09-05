import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import * as state from './state'
import * as mutations from './mutations'
// 修改state时会打logger
import createLogger from 'vuex/dist/logger'

// 注册插件
Vue.use(Vuex)

// 开发环境时开启debug
const debug = process.env.NODE_ENV !== 'production'

// 单个实例
export default new Vuex.Store({
	actions,
	getters,
	state,
	mutations,
	strict: debug,
	plugins: debug ? [createLogger()] : []
})