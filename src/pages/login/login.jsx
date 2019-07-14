import React,{Component} from 'react';
import {Button,Form,Input,Icon,message} from "antd"
import logo from "./img/logo.png"
import "./login.less"
const Item = Form.Item;

export default class Login extends Component{
  handleSubmit = (e)=>{
    e.preventDefault();
    alert("nihao");
  }
   render(){
       return (
           <div className = "login">
               <div className = "login-header">
                   <img src= {logo} alt="图片未加载"/>
                   <h2>后台管理系统</h2>
               </div>
               <div className = "login-content">
                   <h2>用户登录</h2>
                   <Form onSubmit={this.handleSubmit} className="login-form">
        <Item>
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Username"
            />
       
        </Item>
        <Item>
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
            />
          
        </Item>
        <Item>
          <Button onclick = {this.click} type="primary" htmlType="submit" className="login-form-button">
           登录
          </Button>
        </Item>
      </Form>
               </div>
           </div>
       );
   }
}