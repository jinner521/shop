// 引入接口文件
import { getCateList } from '../../../util/axios'
//创建一个模块state
const state = {
    cateList: []
}
//创建一个模块getters
const getters = {
    getCateList(state) {
        return state.cateList
    }

}
//创建个模块mutations
const mutations = {
    // 获取商品分类列表
    REQ_CATELIST(state, paylod) {
        state.cateList = paylod
    }
}
//创建一个模块actions
const actions = {
    // 封装一个获取商品分类列表的行动
    getCateListAction({commit}) {
        getCateList()//接口
            .then(res => {
                if (res.data.code === 200) {
                    // 提交一个mutations
                    commit('REQ_CATELIST', res.data.list)
                }
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