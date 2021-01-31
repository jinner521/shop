// 引入接口
import {getSeckList}  from '../../../util/axios'
//创建一个模块state
const state = {
    seckList: []
}
//创建一个模块getters
const getters = {
    getSeckList(state){
        return state.seckList
    }
}
//创建个模块mutations
const mutations = {
    REQ_SECKLIST(state,payload){
        state.seckList=payload
    }
}
//创建一个模块actions
const actions = {
    getSeckListAction({commit}){
        getSeckList()
        .then(res=>{
            console.log(res,'列表');
            //让角色列表渲染出来
            if(res.data.code===200){
                //触发  提交一个mutation
                commit('REQ_SECKLIST',res.data.list)
            }
        })
        .catch(err=>{
            console.log(err,'错误响应')
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