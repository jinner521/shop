// 引入接口文件
import { getBannerList } from '../../../util/axios'
//创建一个模块state
const state = {
    bannerList: []
}
//创建一个模块getters
const getters = {
    getBannerList(state) {
        return state.bannerList
    }

}
//创建个模块mutations
const mutations = {
    // 获取商品分类列表
    REQ_BANNERLIST(state, paylod) {
        state.bannerList = paylod
    }
}
//创建一个模块actions
const actions = {
    // 封装一个获取商品分类列表的行动
    getBannerListAction({commit}) {
        getBannerList()//接口
            .then(res => {
                if (res.data.code === 200) {
                    // 提交一个mutations
                    commit('REQ_BANNERLIST', res.data.list)
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