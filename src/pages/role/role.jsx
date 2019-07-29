import React, { Component } from 'react'
import {Card,Table,Button,Modal, message} from "antd"
import {reqRole,reqAddRole,reqUpdateRole} from "../../api/index"
import{PAGE_SIZE} from "../../utils/constants"
import AddForm from "./add_form"
import UpdateForm from "./update-form"
import {formatDate} from "../../utils/formatDate"
import LinkButton from "../../components/link-button/linkButton"
import momory from "../../utils/momory"
/**
 * 角色管理
 */
export default class Role extends Component {
  state = {
    roles:[],
    isShowAdd:false,
    isShowAuth:false
  }
  roleRef = React.createRef()
  
  initData = ()=>{
    this.columns = [
      {
        title:"角色名称",
        dataIndex:"name"
      },
      {
        title:"创建时间",
        dataIndex:"create_time",
        render:formatDate
      },
      {
        title:"授权时间",
        dataIndex:"auth_time",
        render:formatDate
      },
      {
        title:"授权人",
        dataIndex:"auth_name"
      },
      {
        title:"操作",
        render:(role)=><LinkButton onClick = {()=>{this.showAuth(role)}}>设置权限</LinkButton>
      }
      
    ];
  }
  //显示授权界面
  showAuth =(role)=>{
    this.role = role
    console.log(role)
    this.setState({isShowAuth:true})

  }

  //请求角色
getRoles = async()=>{
  let result = await reqRole();
  if(result.status == 0){
    let roles = result.data
    this.setState({roles})
  }
}

//添加角色
addRole = ()=>{
  this.form.validateFields(async( err,values)=>{
if(!err){
  this.setState({isShowAdd:false})
  let result = await reqAddRole(values.roleName)
  if(result.status == 0){
    this.getRoles();
    message.success("添加角色成功")
  }else{
    message.error(result.msg)
  }
}
  })
}

//更新角色
updaterole = async()=>{
  this.setState({isShowAuth:false})
  let {role} = this
  role.menus = this.roleRef.current.getMenu();
  role.auth_time = Date.now()
  role.auth_name = momory.user.username;
  //发请求更新
  let result = await reqUpdateRole(role)
  if(result.status == 0){
    this.getRoles()
    message.success("角色授权成功")
  }else{
    message.error(result.msg)
  }
}
  componentWillMount(){
    this.initData();
  }
  componentDidMount(){
    this.getRoles();
  }
  render() {
    let {roles,isShowAdd,isShowAuth} = this.state;
    let role = this.role||{};
    let title = (
      <Button type = "primary" onClick = {()=>{this.setState({isShowAdd:true})}}>
        创建角色 
      </Button>
    )
    return (
      <Card title ={title}>
      <Table
      bordered
        columns = {this.columns}
        dataSource = {roles}
        rowKey = "_id"
        pagination = {{defaultPageSize:PAGE_SIZE}}

      >
      </Table>
      <Modal
        title ="添加角色"
        visible = {isShowAdd}
        onOk = {this.addRole}
        onCancel ={()=>{
          this.setState({isShowAdd:false})
          this.form.resetFields()
        }}
      >
        <AddForm setForm = {form =>this.form = form}/>
      </Modal>
      <Modal
        title ="设置角色权限"
        visible = {isShowAuth}
        onOk = {this.updaterole}
        onCancel ={()=>{
          this.setState({isShowAuth:false})
          
        }}
      >
        <UpdateForm role = {role} ref = {this.roleRef}></UpdateForm>
      </Modal>

            </Card>
    )
  }
}



