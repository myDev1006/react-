 /* 
 这个模块是将post请求的参数从对象转化为encoded查询字符串
 返回相应数据的data
 */

import axios from "axios"
import qs from "qs"
import { message } from "antd";
axios.interceptors.request.use((config)=>{
let {method,data} = config;
if(method.toLowerCase() == "post" && typeof data =="object"){
    config.data = qs.stringify(data);
}
    return config;
});

axios.interceptors.response.use((response)=>{
    return response.data;
},(err)=>{
    message.error("错误消息"+err.message);
    return new Promise(()=>{});
});
export default axios;




