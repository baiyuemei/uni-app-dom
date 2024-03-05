import	 Fly   from "flyio/dist/npm/wx"

//初始化
const fly=new Fly()


//设置超时
fly.config.timeout=60000;
//设置请求基地址
fly.config.baseURL="https://www.uinav.com/api/public/v1"

 
//添加请求拦截器
fly.interceptors.request.use((request)=>{
    //给所有请求添加自定义header
    uni.showLoading({
    	title:"请求加载中。。。",
		mask:true
    })
  	//终止请求
  	//var err=new Error("xxx")
  	//err.request=request
  	//return Promise.reject(new Error(""))
  
    //可以显式返回request, 也可以不返回，没有返回值时拦截器中默认返回request
    return request;
})
 
//添加响应拦截器，响应拦截器会在then/catch处理之前执行
fly.interceptors.response.use(
    (response) => {
		uni.hideLoading({
			
		})
        //只将请求结果的data字段返回
        return response.data
    },
    (err) => {
        //发生网络错误后会走到这里
        //return Promise.resolve("ssss")
		uni.hideLoading({
			
		})
    }
)




//导出
export default fly