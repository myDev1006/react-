import ajax from "./ajax"

// function reqpost(username,password){
//     axios.post("/",{
//         method:"POST",
//         data:{
//             username,
//             password
//         }
//     });
// }
//请求登录
const BASE ="";
export let reqLogin = (username,password)=> ajax.post(BASE+"/login",{username,password});





