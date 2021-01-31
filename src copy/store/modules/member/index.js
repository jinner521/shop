// 引入接口
import { getMemberList} from '../../../util/axios'
//创建一个模块state
const state = {
    memberList: [],
}

//创建一个模块getters
const getters = {
    // 管理员列表
    getMemberList(state) {
        return state.memberList
    },
}
//创建个模块mutations
const mutations = {
    REQ_MEMBERLIST(state,payload){
        state.memberList=payload
    },
}
//创建一个模块actions
const actions = {
      //封装一个获取管理员列表的行动
      getMemberListAction(payload){
        console.log(payload,'上下文对象');
        getMemberList()
        .then(res=>{
            if(res.data.code===200){
                let list=res.data.list ? res.data.list:[]
                //提交一个mutation去修改state中的mangerList
                payload.commit('REQ_MEMBERLIST',list)
                }
        })
    },
}
export default {
    state,
    getters,
    mutations,
    actions,
    namespaced: true,
}