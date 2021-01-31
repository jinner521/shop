//引入接口模块
import { getGoodsList,getGoodsCount } from '../../../util/axios'
// 创建一个模块state
const state = {
  goodsList: [],
  size: 2,//条数每一页两个数据
  page: 1,//页码 默认第一页
  countNum: 0
}

// 创建一个模块getters
const getters = {
    // 管理员列表
    getGoodsList(state) {
      return state.goodsList
  },
  // 条数 当前页面渲染个数
  getGoodsSize(state){
      return state.size
  },
   // 总条数 countNum
   getCountNum(state){
      return state.countNum
  },
}
// 创建一个模块mutations

const mutations = {
  REQ_GOODSLIST(state,payload){
    state.goodsList=payload
},
REQ_COUNT(state,payload){
    state.countNum=payload
},
// 修改页码
CHANGE_PAGE(state,payload){
    state.page = payload
}
}

// 创建一个模块actions

const actions = {
  //封装一个获取管理员列表的行动
  getGoodsListAction(payload) {
    console.log(payload, '上下文对象');
    getGoodsList({
      size: payload.state.size,
      page: payload.state.page
    })
      .then(res => {
        if (res.data.code === 200) {
          let list = res.data.list ? res.data.list : []
          //提交一个mutation去修改state中的mangerList
          payload.commit('REQ_GOODSLIST', list)
          //如果你的返回数据是一个[]数组并且它不是第一页，那么我们就
          // 应该给page-1并且重新调取列表
          if (payload.state.page != 1 && list.length == 0) {
            // 先修改page
            payload.dispatch('changePageAction', payload.state.page - 1)
            return
          }
        }
      })
  },
  //封装一个获取总条数的行动
  getCountAction(payload) {
    getGoodsCount()
      .then(res => {
        console.log(res, '总条数');
        if (res.data.code === 200) {
          payload.commit('REQ_COUNT', res.data.list[0].total)
        }
      })
  },
  //封装一个修改page行动
  changePageAction(context, payload) {
    //触发mutaitons去修改state中的page
    //context 上下文对象，含有 commit方法
    //payload 触发该行动传递的参数
    context.commit('CHANGE_PAGE', payload)
    // console.log(context,'contextcontextcontext');
    // console.log(payload,'payloadpayloadpayloadpayload');
    //当页码切换之后，重新调取接口并传入新的参数
    context.dispatch('getGoodsListAction')
  },
}


//导出模块

export default {
  state,
  mutations,
  getters,
  actions,
  namespaced: true //避免名字重复，用命名空间
}
