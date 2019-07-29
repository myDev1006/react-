import React,{Component} from 'react';
import {Link,Route,withRouter} from "react-router-dom"
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import logo from "../../assets/img/logo.png"
import "./left-nav.less"
//引入配置文件更新列表
import menuList from "../../config/menuConfig"

const { SubMenu } = Menu;
 class leftNav extends Component{
    getmenuNodes = (menuList)=>{
       //获得当前请求的地址
       let path = this.props.location.pathname;
    //    console.log(path);
    return menuList.reduce((pre,item)=>{
if(!item.children){
    pre.push((
        <Menu.Item key={item.key}>
            <Link to ={item.key}/>
              <Icon type={item.icon} />
              <span>{item.title}</span>
            </Menu.Item>
    ));
}else{
    const cItem = item.children.find(cItem=> path.indexOf(cItem.key) == 0);
    //如果找到将key保存为openkey
if(cItem){
    this.openKey = item.key;
}

    pre.push((
        <SubMenu
            key={item.key}
            title={
              <span>
                <Icon type={item.icon} />
                <span>{item.title}</span>
              </span>
            }
          >
            {this.getmenuNodes(item.children)}
          </SubMenu>
    ));
}
return pre;
    },[]);
    }
    
    componentWillMount(){
        this.list = this.getmenuNodes(menuList);
    }
render(){
    let selectKey = this.props.location.pathname;
    console.log(selectKey)
    if(selectKey.indexOf("/product") == 0){
        selectKey = "/product"
    }
return(
<div className = "left-nav">
    <Link className = "left-nav-header" to = "/home">
        <img src={logo} alt="logo"/>
        <h2>后台管理</h2>
    </Link>
    <Menu theme="dark" selectedKeys={[selectKey]} defaultOpenKeys ={[this.openKey]}  mode="inline">
    {this.list}

          </Menu>
</div>
);
}
}

export default withRouter(leftNav);