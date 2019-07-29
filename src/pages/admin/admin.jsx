import React,{Component} from 'react';
import momoryUtil from "../../utils/momory"
import {Redirect,Route,Switch} from "react-router-dom"
import { Layout } from 'antd';
import LeftNav from "../../components/left-nav/left-nav"
import Header from "../../components/header/header"
import Login from "../login/login"
import Home from '../home/home'
import Category from '../category/category'
import Product from '../product/product'
import Role from '../role/role'
import User from '../user/user'
import Bar from '../charts/bar'
import Line from '../charts/line'
import Pie from '../charts/pie'


const { Footer, Sider, Content } = Layout;

export default class Admin extends Component{
render(){
    let {user} = momoryUtil;
    if(!user._id){
         return <Redirect to ="/login"/>
    }
return(
<Layout style = {{height:"100%"}}>
    <Sider>
    <LeftNav/>{/*左边的列表*/}
    </Sider>
<Layout>
  <Header/>{/*右边的上边的头部*/}
  <Content style = {{background:"#fff",margin:"20px",height:"100%"}}>
  <Switch>
            <Route path="/home" component={Home}/>
            <Route path='/category' component={Category} />
            <Route path='/product' component={Product} />
            <Route path='/role' component={Role} />
            <Route path='/user' component={User} />
            <Route path='/charts/bar' component={Bar} />
            <Route path='/charts/line' component={Line} />
            <Route path='/charts/pie' component={Pie} />
            <Redirect to = "/home"/>
  </Switch>
  </Content>
  <Footer style  ={{textAlign:"center"}}>推荐使用goole进行访问</Footer>
</Layout>
</Layout>
);
}
}