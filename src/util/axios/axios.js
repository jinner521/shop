import axios from 'axios'
//引入路由配置项
import router from '../../router'

let http  = axios.create({
    baseURL:'/api'//你的代理服务器地址
})

//axios拦截器
//请求拦截
http.interceptors.request.use(req=>{
    //从存储中取出来token
    let token = sessionStorage.getItem('loginInfo') ? JSON.parse(sessionStorage.getItem('loginInfo')).token :''
    // 需求：在请求头中添加token令牌
    req.headers.authorization =token
    //设置请求拦截之后，要返回值这个配置
    return req
})


//响应拦截 一般用于全局拦截错误
http.interceptors.response.use(res=>{
    if(res.data.code===500){
        alert(res.data.msg)
        // console.log(router,'路由配置项');
        router.push('/login')
    }else if(res.data.code ===403){
        //token验证过期，重新登录
        alert(res.data.msg)
        router.push('/login')
    }else{
        //针对于返回内容进行二次拆分
        //return res.data
        return res
    }
})

export default http


/* 
token概念是如何产生的？
每一个接口（必须要登录之后的要操作状态）在调取的过程中，我们要验证它的用户名和密码。每验证一次，我们要与服务器进行交互，然后要频繁查询数据库
在后端就产生了token的概念（它就是一个令牌）。当你第一次登录的时候，登录成功之后后端，返回给我们一个token（字符串）。每一次再调取其他接口的时候，只需要验证这个token即可
token它是有时效的。大概时效时长在10分-40分（后端去设定的）。前端要配合token失效做强制跳转到登录
前端操作token，会把token携带在请求头中

token的好处：减少服务器的压力，减少频繁操作数据库，使服务器更加健壮
*/