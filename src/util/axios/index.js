import http from './axios'

// 后台管理接口集合
// 调用接口

// 启动服务器 api
/* =====菜单列表===== */
// 封装菜单列表接口  getMenuList接口名称
export function getMenuList(){
    return http.get('/api/menulist?istree=true')
}

// 封装添加菜单接口 data={pid：1...}   addMenu接口名称
export function addMenu(data){
    return http.post('/api/menuadd',data)
}

// 封装菜单删除接口  
export function deleteMenu(data){
    return http.post('/api/menudelete',data)
}

// 封装菜单获取一条数据的接口
export function menuInfo(params){
    return http.get('/api/menuinfo',{params})
}
// 封装菜单列表编辑接口
export function editMenu(data){
    return http.post('/api/menuedit',data)
}




/* =====角色列表===== */
// 封装角色列表接口  getRoleList接口名称
export function getRoleList(){
    return http.get('/api/rolelist')
}
// 封装添加角色接口 data={pid：1...}   addRole接口名称
export function addRole(data){
    return http.post('/api/roleadd',data)
}

// 封装角色删除接口  
export function deleteRole(data){
    return http.post('/api/roledelete',data)
}
// 封装角色获取一条数据的接口
export function RoleInfo(params){
    return http.get('/api/roleinfo',{params})
}
// 封装角色列表编辑接口
export function editRole(data){
    return http.post('/api/roleedit',data)
}

/* ============管理员列表=========== */
// 封装管理员列表接口  getManagerList接口名称 必须要传递分页参数
export function getManagerList(params){
    return http.get('/api/userlist',{params})
 }      
// 封装添加管理员接口 data={pid：1...}   addRole接口名称
export function addManager(data){
    return http.post('/api/useradd',data)
}
// 封装管理员删除接口  
export function deleteManager(data){
    return http.post('/api/userdelete',data)
}
// 封装管理员获取一条数据的接口
export function managerInfo(params){
    return http.get('/api/userinfo',{params})
}
// 封装管理员列表编辑接口
export function editManager(data){
    return http.post('/api/useredit',data)
}
// 封装管理员总条数接口
export function getManagerCount(){
    return http.get('/api/usercount')
}
// 用户登录接口
export function userLogin(data){
    return http.post('/api/userlogin',data)
}


/* =====商品分类列表===== */
//封装分类添加接口
export function getCateAdd(data){
    let file = new FormData();
    //FormData 数据的添加只能用append ,获取值也只能用get方式获取
    //循环添加 对象 转化成了 FormData这种格式
    for (let i in data) {
    file.append(i, data[i]);
    }
    return http.post('/api/cateadd',file)
}
//封装分类列表接口
export function getCateList(){
    return http.get('/api/catelist',{
        params:{
            istree:true
        }
    })
}
//封装分类获取（一条）接口
export function getCateInfo(params){
    return http.get('/api/cateinfo',{
        params
    })
}
//封装分类修改接口
export function getCateEdit(data){
    return http.post('/api/cateedit',data)
}
//封装分类删除接口
export function getCateDelete(data){
    return http.post('/api/catedelete',data)
}




/* =====商品规格管理接口==== */
//封装规格添加接口
export function getSpecsAdd(data){
    return http.post('/api/specsadd',data)
}
//商品规格列表
export function getSpecsList(params){
    return http.get('/api/specslist',{
        params
    })
}
//商品规格获取（一条）
export function getSpecsInfo(params){
    return http.get('/api/specsinfo',{
        params
    })
}
//商品规格修改
export function getSpecsEdit(data){
    return http.post('/api/specsedit',data)
}
//商品规格删除
export function getSpecsDelete(data){
    return http.post('/api/specsdelete',data)
}
//商品规格总数（用于计算分页)
export function getSpecsCount(){
    return http.get('/api/specscount')
}


/* =====商品管理接口==== */
//封装添加接口
export function getGoodsAdd(data){
    let file = new FormData();
    //FormData 数据的添加只能用append ,获取值也只能用get方式获取
    //循环添加 对象 转化成了 FormData这种格式
    for (let i in data) {
    file.append(i, data[i]);
    }
    return http.post('/api/goodsadd',file)
}
//商品列表
export function getGoodsList(params){
    return http.get('/api/goodslist',{
        params
    })
}
//商品获取（一条）
export function getGoodsInfo(params){
    return http.get('/api/goodsinfo',{
        params
    })
}
//商品修改
export function getGoodsEdit(data){
    let file = new FormData();
    //FormData 数据的添加只能用append ,获取值也只能用get方式获取
    //循环添加 对象 转化成了 FormData这种格式
    for (let i in data) {
    file.append(i, data[i]);
    }
    return http.post('/api/goodsedit',file)
}
//商品删除
export function getGoodsDelete(data){
    return http.post('/api/goodsdelete',data)
}
//商品总数（用于计算分页)
export function getGoodsCount(){
    return http.get('/api/goodscount')
}



/* ========轮播图管理=========== */
// 轮播图添加
export function getBannerAdd(data){
    let file = new FormData();
    //FormData 数据的添加只能用append ,获取值也只能用get方式获取
    //循环添加 对象 转化成了 FormData这种格式
    for (let i in data) {
    file.append(i, data[i]);
    }
    return http.post('/api/banneradd',file)
}
// 轮播图列表
export function getBannerList() {
    return http.get('/api/bannerlist')
  }
// 轮播图获取（一条）
export function getBannerInfo(params){
    return http.get('/api/bannerinfo',{params})
}
// 轮播图修改
export function getBannerEdit(data){
    return http.post('/api/banneredit',data)
}
// 轮播图删除
export function getBannerDelete(data){
    return http.post('/api/bannerdelete',data)
}


/* ===========秒杀活动列表============== */

//封装秒杀活动添加接口
export function getSeckAdd(data) {
    return http.post('/api/seckadd', data)
 }
 //封装秒杀活动列表接口
 export function getSeckList() {
    return http.get('/api/secklist')
 }
 //封装秒杀活动获取（一条）接口
 export function getSeckInfo(params) {
    return http.get('/api/seckinfo', {
       params
    })
 }
 //封装秒杀活动修改接口
 export function getSeckEdit(data) {
    return http.post('/api/seckedit', data)
 }
 //封装秒杀活动删除接口
 export function getSeckDelete(data) {
    return http.post('/api/seckdelete', data)
 }

/* =============会员管理=========== */
 //封装会员管理列表接口
export function getMemberList(){
    return http.get('/api/memberlist')
}
//封装会员管理获取（一条）接口
export function getMemberInfo(params){
    return http.get('/api/memberinfo',{
        params
    })
}
//封装会员管理修改接口
export function getMemberEdit(data){
    return http.post('/api/memberedit',data)
}

 