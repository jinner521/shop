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
export default new Vuex.Store({
    modules:{
        // menu:menu
        menu ,
        role,
        manager,
        cate,
        specs,
        goods,
        banner,
        seck
    }
})

