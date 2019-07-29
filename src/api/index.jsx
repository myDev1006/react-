import ajax from "./ajax"
import jsonp from "jsonp"
import { message } from "antd";
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

//请求天气接口
export function reqWeather(city){
return new Promise((resolve,reject)=>{
    let url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
    jsonp(url,{},(err,data)=>{
        if(!err){
            let {weather,dayPictureUrl} = data.results[0].weather_data[0];
            resolve({weather,dayPictureUrl});
        }else{
            message.error("天气信息获取失败");
        }
    });
});
}

//请求品类列表信息
export let reqCategorys = ()=>ajax(BASE+"/manage/category/list");

//添加分类信息
export let addCategorys = (categoryName)=>ajax.post(BASE+"manage/category/add",{categoryName});

//更新分类信息
export let updataCategorys = (categoryId,categoryName)=>ajax.post(BASE+"manage/category/update",{categoryId,categoryName});

//获取商品分类信息
export let reqProduct = (pageNum,pageSize)=>ajax(BASE+"/manage/product/list",{params:{pageNum,pageSize}});
// pageNum,几页
// pageSize每页条数


//根据商品id获取商品
export const req_product = (productId) => ajax(BASE + '/manage/product/info', {
    params: { 
      productId
    }
  })
//商品上下架
export let reqUpdataState = (productId,status) =>ajax.post(BASE+"/manage/product/updateStatus",{
    productId,
    status
});

//根据名称和id进行搜索
export let reqSeacthProduch = ({pageNum,pageSize,searchName,searchType})=>ajax(BASE+"/manage/product/search",{
   params:{
    pageNum,
    pageSize,
    [searchType]:searchName
   }
})


//根据分类id获取分类
export let reqCategory = (categoryId)=>ajax(BASE+"/manage/category/info",{
    params:{categoryId}
})

//添加修改商品
export let reqAddUpdataProduct = (product)=>ajax.post(BASE+"/manage/product/"+(product._id?"update":"add"),product)

//上传图片接口

//删除图片接口
export let reqdeleteImg = (name)=>ajax.post(BASE+"/manage/img/delete",{name})

//添加用户
export let reqAddOrUpdateUser = (user)=>ajax.post(BASE+`/manage/user/${user._id?"update":"add"}`,user)
//删除用户
export let reqdelUser =(userId)=>ajax.post(BASE+"/manage/user/delete",{userId})

//获取用户列表
export let reqUesrList = ()=>ajax(BASE+"/manage/user/list")
//获取角色列表

export let reqRole = ()=>ajax(BASE+"/manage/role/list")
//添加角色
export let reqAddRole = (roleName)=>ajax.post(BASE+"/manage/role/add",{roleName})
//更新角色
export let reqUpdateRole = (role)=>ajax.post(BASE+"/manage/role/update",role)