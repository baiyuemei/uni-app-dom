export const  showMsg=(title="请求错误")=>{
	 uni.showToast({
				  	title,
					mask:true,
					icon:"none"
				  }) 
}