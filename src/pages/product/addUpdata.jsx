import React,{Component} from 'react';
import {Card,Icon,Form,Input,Select,Button,message} from "antd"
import {reqCategorys, reqAddUpdataProduct} from "../../api/index"
import momoryUtil from "../../utils/momory"
import PicturesWall from "./pictureWall"
import RechTextEdior from "./rechTextEdior"
let Item = Form.Item;
let Option = Select.Option;
 class addUpdata extends Component{
     state  ={
         categorys:[]
     }
     constructor(props){
        super(props)
        this.imgRef = React.createRef()
        this.enitorRef = React.createRef()
     }
     //请求更新和添加
     reqAddUpdata = async()=>{
        let result = await reqCategorys();
        if(result.status == 0){
            let categorys = result.data;
            this.setState({categorys})//请求到商品列表更新到状态中
        }
     }
     //提交的请求
     clickSubmit =(e)=>{
         //先取消提交按钮的默认行为
        e.preventDefault();
        //提交时候进行统一表单验证
        this.props.form.validateFields(async (err,data)=>{
            if(!err){
                //获取data中的值
                let {name,desc,price,categoryId} = data;
                //从子组件中获取上传好的图片的名字数组
                let imgs = this.imgRef.current.getImgs()
                let detail = this.enitorRef.current.getdetail()
                let product  = {name,desc,price,categoryId,imgs,detail}
                if(this.isupdate){
                  product._id = this.product._id
                }

                //发请求
                let result = await reqAddUpdataProduct(product)
                if(result.status == 0){
                  message.success(`${this.isupdate?"修改":"添加"}商品成功`)
                  this.props.history.replace("/product")
                }else{
                  message.error(`${this.isupdate?"修改":"添加"}商品失败`)
                }
            }
        })

     }
     //自定义价格的验证规则
     validatePrice =(rule,value,callback)=>{
          if(value<0){
            callback("价格不能小于0")
          }else{
            callback()
          }
     }
componentWillMount(){
    this. product = momoryUtil.product;//从内存中读取保存的商品对象
    console.log(this.product)
    this.isupdate = !!this.product._id;//标识变量,是否为更新状态
    console.log(this.isupdate)
    // if(this.product._id){
    //     falg = true;
    // }else{
    //     falg = false;
    // }
}

     componentDidMount(){
         this.reqAddUpdata();
     }
render(){
    let {getFieldDecorator}  = this.props.form;
    let {categorys}  = this.state;//状态中读取商品信息
    let {product,isupdate} = this;
    let title= (
       <span>
            <Icon className = "icon" type = "arrow-left" onClick = {()=>{this.props.history.goBack()}}></Icon>
           {isupdate?"修改商品":"添加商品"}
       </span>
        
    )
    let formLayout = {
        labelCol: { span: 2 },
        wrapperCol: { span: 8 }
      }
return(
    

    <Card title={title}>
        <Form {...formLayout} onSubmit={this.clickSubmit}>
          <Item label = "商品名称">
            {getFieldDecorator("name",{
                initialValue:product.name,
                rules:[{
                    required:true,message:"必须输入商品名称"
                }]
            })(<Input placeholder = "商品名称"/>)}
          </Item>
          <Item label="商品描述">
            {getFieldDecorator('desc', {
              initialValue: product.desc,
              rules: [
                { required: true, message: '必须输入商品描述!' }
              ],
            })(<Input placeholder="商品描述"/>)}
          </Item>
          <Item label="商品价格">
            {getFieldDecorator('price', {
              initialValue: product.price,
              rules: [
                { required: true, message: '必须输入价格!' },
                { validator: this.validatePrice }
              ],
            })(<Input type="number" placeholder="商品价格" addonAfter="人名币"/>)}
          </Item>
          <Item label="商品分类">
            {getFieldDecorator('categoryId', {
              initialValue: product.categoryId || '',//没值的话默认为空串，未选择
              rules: [
                { required: true, message: '必须输入商品分类!' }
              ],
            })(
              <Select>
                <Option value=''>未选择</Option>
                {
               categorys.map((item)=>{return <Option value = {item._id} key = {item._id}>{item.name}</Option>})
                }
              </Select>
            )}
          </Item>
          <Item label="商品图片">
            <PicturesWall ref = {this.imgRef} imgs = {product.imgs}/>
          </Item>
          <Item label="商品详情"  wrapperCol = {{span:20}}>
            <RechTextEdior ref = {this.enitorRef} detail = {product.detail}/>{/*将父组件的详情信息传给子组件*/}
          </Item>
          <Item>
            <Button type="primary" htmlType="submit">提交</Button>
          </Item>
       </Form>
      </Card>
);
}
}
export default Form.create()(addUpdata)