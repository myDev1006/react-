//保存登陆信息，初始值是local中的值
import stronageUtil from "./storageUtil"
let user = stronageUtil.getuser()
export default{
    user,
    product:{}//当前查看的商品对象
}
