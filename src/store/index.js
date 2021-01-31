import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
// 引入menu模块
import menu from './modules/menu'
// 引入role模块
import role from './modules/role'
// 引入manager模块
import manager from './modules/manager'
// 引入cate模块
import cate from './modules/sort'
// 引入specs模块
import specs from './modules/specs'
//引入 goods 模块
import goods from './modules/goods'
//引入 banner 模块
import banner from './modules/banner'
//引入 seck 模块
import seck from './modules/seck'
import member from './modules/member'
export default new Vuex.Store({
    state: {
        loginInfo: sessionStorage.getItem('loginInfo') ? JSON.parse(sessionStorage.getItem('loginInfo')) : null  //个人信息
    },
    getters: {
        getUserInfo(state) {
            return state.loginInfo
        }
    },
    mutations: {
        CHANGE_USER(state, payload) {
            state.loginInfo = payload
            if (payload) {
                //设置本地存储
                sessionStorage.setItem('loginInfo', JSON.stringify(payload))
            } else {
                sessionStorage.removeItem('loginInfo')
            }
        }
    },
    //actionsstate
    actions: {
        changeUserInfoAction(contxt, payload) {
            contxt.commit('CHANGE_USER', payload)
        }
    },
    modules: {
        // menu:menu
        menu,
        role,
        manager,
        cate,
        specs,
        goods,
        banner,
        seck,
        member
    }
})

