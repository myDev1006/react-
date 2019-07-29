import React, { Component } from 'react'
import {Card,Table,Button,Modal, message} from "antd"
import {reqAddOrUpdateUser,reqUesrList,reqdelUser} from "../../api/index"
import UserForm from "./user_form"
import {PAGE_SIZE} from "../../utils/constants"
import Linkbutton from "../../components/link-button/linkButton"
/**
 * 用户管理
 */
export default class User extends Component {
  state = {
    isShow:false,
    users:[],
    roles:[],
    
  }
  initData = ()=>{
    this.columns = [
      {
        title:"用户名",
        dataIndex:"username"
      },
      {
        title:"邮箱",
        dataIndex:"email"
      },
      {
        title:"电话",
        dataIndex:"phone"
      },
      {
        title:"注册时间",
        dataIndex:"create_time"
      },
      {
        title:"所属角色",
        dataIndex:"role_id"
      },
      {
        title:"操作",
        render:(user)=>(
          <span>
            <Linkbutton  onClick = {()=>{this.updateUser(user)}}>修改</Linkbutton>
            <Linkbutton  onClick = {()=>{this.delete(user)}}>删除</Linkbutton>
            
          </span>
        )
      },
    ];
  }


  //添加界面
  createUser = ()=>{
    this.user = null;
    this.setState({isShow:true})
  }

  //显示修改界面
  updateUser = (user)=>{
    this.user = user//保存当前user
    this.setState({isShow:true})
  }
//删除用户
delete =(user)=>{
  Modal.confirm({
    title : `要删除${user.username}吗`,
    onOk:async()=>{
      let result = await reqdelUser(user._id)
      if(result.status == 0){
        message.success("删除成功")
        this.getUser();
      }else{
        message.error(result.msg)
      }
    }
  })
}
 
//获取用户
getUser = async()=>{
  let result = await reqUesrList()
  if(result.status == 0){
    console.log(result.data)
    let {users,roles} = result.data
    this.roleName = roles.reduce((pre,role)=>{
      pre[role._id] = role.name


      return pre;
    },{})
    this.setState({users,roles})

    
  }
}
 // 添加更新用户
  updateAddUser =()=>{
    this.setState({isShow:false})
    this.form.validateFields(async(err,values)=>{
    if(!err){
      if(this.user){
        values._id = this.user._id
      }

      let result = await reqAddOrUpdateUser(values)
      if(result.status == 0){
        console.log(result.data)
        this.getUser()
        message.success(`${result.data._id?"修改":"添加"}用户成功`)
      }else{
        message.error(result.msg)
      }
     }
    })
  }
  //点击取消
  oncancel = ()=>{
    this.form.resetFields()
    this.setState({isShow:false})
  }
  componentWillMount(){
    this.initData();
  }
  componentDidMount(){
    this.getUser();
  }
  render() {
    let {isShow,users,roles} = this.state;
    let user = this.user||{}
    console.log(user)
    let title = (
      <Button type = "primary" onClick = {this.createUser}>
        创建用户
      </Button>
    )
    return (
      <Card title ={title}>
<Table
  columns = {this.columns}
  bordered
  rowKey = "_id"
  dataSource = {users}
  pagination = {{defaultPageSize:PAGE_SIZE}}
>
</Table>
<Modal 
  title = {user._id?"修改":"添加"}
  visible = {isShow}
  onOk = {this.updateAddUser}
  onCancel = {this.oncancel}
  
>
<UserForm setform = {form =>this.form = form} roles = {roles} user = {user}/>
</Modal>
      </Card>
    )
  }
}
