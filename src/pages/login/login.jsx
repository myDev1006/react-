import React,{Component} from 'react';
import {Button,Form,Input,Icon,message} from "antd"
import logo from "./img/logo.png"
import "./login.less"
import storageUtil from "../../utils/storageUtil"
import momoryUtil from "../../utils/momory"
import {reqLogin} from "../../api/index"

const Item = Form.Item;//变量保存Form.Item

class Login extends Component{
  handleSubmit = (e)=>{
    e.preventDefault();
  //    用户名/密码的的合法性要求
  // 1). 必须输入
  // 2). 必须大于等于4位
  // 3). 必须小于等于12位
  // 4). 必须是英文、数字或下划线组成 

console.log(this.props.form.getFieldValue('username'));


   //点击进行统一验证
    this.props.form.validateFields(async(err,{username,password})=>{
      if(!err){
        // message.success("成功");
        //提交发送请求

let result = await reqLogin(username,password);
    // console.log(result);
    if(result.status == 0){
      const user = result.data;
      storageUtil.saveuser(user);
      //保存在内存中
      momoryUtil.user =user;
      message.success("登录成功");
      this.props.history.replace("/");//跳转到管理界面
    }else{
      message.error(result.msg);
    }

      }else{
        message.error("验证失败");
        
      }
    });
    
  }

  //密码的验证规则
  validatordataPwd = (rule,value,callback)=>{
    value = value.trim();
    if(!value){
      callback("必须输入");
    }else if(value.length<4){
      callback("必须大于等于4位");
    }else if(value.length>12){
      callback("必须小于等于12位");
    }else if(!/[a-zA-Z0-9_]/){
      callback("必须是英文、数字或下划线组成");
    }else{
      callback();
    }
  }
   render(){
    //  console.log(this)
     let{getFieldDecorator} = this.props.form;

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
                     {
                       getFieldDecorator("username",{
                         //用户名的验证规则
                         rules:[
                          {required:true,message:"必须输入"},
                          {max:12,message:"必须小于等于12位"},
                          {min:4,message:"必须大于等于4位"},
                          {pattern:/[a-zA-Z0-9_]/,message:"必须是英文、数字或下划线组成"}
                         ]
                       })(
                        <Input
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="Username"
                      />
                       )
                     }
        
            
     


        </Item>
        <Item>
          {
             getFieldDecorator("password",{
               //使用自定义规则验证
               rules:[{validator:this.validatordataPwd}]
             })( <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
            />)
          }
           
           
          
        </Item>
        <Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
           登录
          </Button>
        </Item>
      </Form>
               </div>
           </div>
       );
   }
}


let WrapperForm = Form.create()(Login);

export default WrapperForm;