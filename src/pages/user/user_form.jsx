import React,{Component} from 'react';
import {Form,Input,message, Select} from "antd"
let Item = Form.Item;
let Option = Select.Option;
class UserForm extends Component{


componentWillMount(){
    this.props.setform(this.props.form)
}

render(){
    let {getFieldDecorator} = this.props.form
    let {roles,user} = this.props
    let formLayout = {
        labelCol:{span:4},
        wrapperCol:{span:15}
    }
return(
<Form {...formLayout}>
<Item label='用户名'>
          {
            getFieldDecorator('username', {
              initialValue: user.username,
              rules: [
                { required: true, message: '必须输入用户名' }
              ]
            })(
              <Input placeholder='请输入用户名'/>
            )
          }
        </Item>
          {
            user._id?null:(
              <Item label="密码">
          {
            getFieldDecorator('password', {
              initialValue: user.password,
              rules: [
                { required: true, message: '必须输入密码' }
              ]
            })(
              <Input placeholder='请输入密码'/>
            )
          }
        </Item>
            )
          }
<Item label='手机号'>
          {
            getFieldDecorator('phone', {
              initialValue: user.phone,
              rules: [
                { required: true, message: '必须输入手机号' }
              ]
            })(
              <Input placeholder='请输入手机号'/>
            )
          }
        </Item>
<Item label='邮箱'>
          {
            getFieldDecorator('email', {
              initialValue: user.email,
              rules: [
                { required: true, message: '必须输入邮箱名' }
              ]
            })(
              <Input placeholder='请输入邮箱'/>
            )
          }
        </Item>
<Item label='角色'>
          {
            getFieldDecorator('role_id', {
              initialValue:user.role_id,
              rules: [
                { required: true, message: '角色名必选' }
              ]
            })(
              <Select>
                 {
                   roles.map((item)=><Option key = {item._id} value ={item._id}>{item.name}</Option>)
                 }
              </Select>
            )
          }
        </Item>
</Form>
);
}
}
export default Form.create()(UserForm)