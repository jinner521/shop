// 引入接口文件
import { getMenuList } from '../../../util/axios'
//创建一个模块state
const state = {
    menuList: []
}
//创建一个模块getters
const getters = {
    getMenuList(state) {
        return state.menuList
    }

}
//创建个模块mutations
const mutations = {
    // 获取菜单列表
    REQ_MENULIST(state, paylod) {
        state.menuList = paylod
    }
}
//创建一个模块actions
const actions = {
    // 封装一个获取菜单列表的行动
    getMenuListAction({commit}) {
        getMenuList()//接口
            .then(res => {
                if (res.data.code === 200) {
                    // 提交一个mutations
                    commit('REQ_MENULIST', res.data.list)
                }
                console.log(res, '菜单列表');
            })
    }
}
export default {
    state,
    getters,
    mutations,
    actions,
    namespaced: true,
}