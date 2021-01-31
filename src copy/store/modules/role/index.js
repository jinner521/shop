// 引入接口
import {getRoleList}  from '../../../util/axios'
//创建一个模块state
const state = {
    roleList: []
}
//创建一个模块getters
const getters = {
    getRoleList(state){
        return state.roleList
    }
}
//创建个模块mutations
const mutations = {
    REQ_ROLELIST(state,payload){
        state.roleList=payload
    }
}
//创建一个模块actions
const actions = {
    getRoleListAction({commit}){
        getRoleList()
        .then(res=>{
            console.log(res,'角色列表');
            //让角色列表渲染出来
            if(res.data.code===200){
                //触发  提交一个mutation
                commit('REQ_ROLELIST',res.data.list)
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