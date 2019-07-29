import React, { Component } from 'react'
import {Card,Table,Button,Icon, Modal, message} from "antd"
import Linkbutton from "../../components/link-button/linkButton"
import UpdataAddForm from "./updataadd-form"

//引入请求接口
import {reqCategorys,updataCategorys,addCategorys} from "../../api/index"

export default class Category extends Component {
 state = {
   showStatus:0,//0不显示，1添加 2修改
   loading:false,
   categorys:[]//所有分类的数组
 }
 //初始化的数据
initCategory =()=>{
  this.columns = [//表格的属性
    {
      title: '分类的名称',
      dataIndex: 'name'
    },
    {
      title: '操作',
      render:(category)=><Linkbutton onClick = {()=>{
        this.category = category;//保存当前分类信息数据
        console.log(category)
        this.setState({showStatus:2});
      }}>
        修改分类
      </Linkbutton>
    },
  ];
}

//获取ajax请求的分类信息
getCategory = async()=>{
  this.setState({loading:true});//请求前的加载图
  //发请求
  let result = await reqCategorys();
  this.setState({loading:false});
  if(result.status == 0){
    //如果请求成功更新分类信息
    let categorys = result.data;
    this.setState({categorys});
  }else {
    message.error("获取分类信息失败");
  }
}
 //点击确定按钮更新数据
 handleOK =()=>{
   
   //验证表单
   let {validateFields} = this.form
   //form表单的方法，验证数据合法
   validateFields(async(err,value)=>{
     if(!err){
      //  console.log(value)
      let {categoryName} = value//获取表单输入值
      let {showStatus} = this.state
      let result;//异步请求结果，对象
      if(showStatus == 1){
        //添加的请求
         result = await addCategorys(categoryName)
      }else{
        //修改的请求
        let categoryId = this.category._id;//
         result = await updataCategorys(categoryId,categoryName)
      }
      this.form.resetFields();
      this.setState({showStatus:0});//点击ok无论有无数据弹出框都应消失
      let currentvalue = showStatus ==1?"添加":"修改"
      if(result.status == 0){
        this.getCategory();//请求状态成功后更新分页信息
        message.success(currentvalue+"信息成功");
      }else{
        message.error(currentvalue+"信息失败");
      }
     }
   })

   }
//点击cancel按钮执行退出
handleCancel = ()=>{
  this.form.resetFields();//重置分页数据
  this.setState({showStatus:0});
}
//将要挂载时更新初始化信息
componentWillMount(){
  this.initCategory();
}
 //挂载成功后更新分页信息
 componentDidMount(){
   this.getCategory();
 }
  render() {
    let {showStatus,loading,categorys} = this.state;
  //获取分类信息数据，有可能为空
    let category = this.category || {};
    let extra = (
      <Button type="primary" onClick={() => {
        this.category = null 
        this.setState({ showStatus: 1 })
        }}>
        <Icon type="plus"/>
        添加
      </Button>
    )
    return (
     
       <Card  extra={extra}>
       <Table
       rowKey = "_id"//表格行 key 的取值，可以是字符串或一个函数
    columns={this.columns}
    dataSource={categorys}
    bordered = {true}
    loading = {loading}
    pagination = {{defaultPageSize: 6, showQuickJumper: true}}
  
   
  />
  <Modal
  title ={showStatus == 1?"添加数据":"修改数据"}
  visible ={showStatus !== 0}
  onOk = {this.handleOK}
  onCancel = {this.handleCancel}>
  {/*                         从子组件中获得form对象             将分页数据传给子组件 */}
<UpdataAddForm setForm = {(form)=>this.form = form} categoryName = {category.name}/>
    
  </Modal>
    </Card>
    )
  }
}

