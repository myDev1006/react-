import React,{Component} from 'react';
import LinkButton from "../link-button/linkButton"//封装button
import {Modal} from "antd"
import "./header.less"
/*
这两个是本地缓存类 
*/
import momory from "../../utils/momory"
import storageUtil from "../../utils/storageUtil"
//包装组件类拥有路由的属性
import {withRouter} from "react-router-dom"
import {reqWeather} from "../../api/index"//请求天气
import {formatDate} from "../../utils/formatDate"//格式化日期
//nav配置列表对象
import menuList from "../../config/menuConfig"
 class Header extends Component{
    //初始状态数据
    state = {weather:"",time:formatDate(Date.now()),dayPictureUrl:""};
    //退出登录方法
    loginout = ()=>{
        Modal.confirm({
            title: 'Confirm',
            content: '确定退出？',
            onOk:()=>{
                //清除缓存信息
                momory.user = {};
                storageUtil.cleanuser();
                //跳转到登录页面
                this.props.history.replace("/login");
            }
          });
    }

   
    //获取时间
    
        getTime = ()=>{
           this.timer =setInterval(() => {
            let time = formatDate(Date.now());
            this.setState({time});
           }, 1000);  
        }
   

    //获取天气
    getWeather = async()=>{
        let {weather,dayPictureUrl} = await reqWeather("北京");
        this.setState({weather,dayPictureUrl});
    }
    componentDidMount(){
        this.getTime();
        this.getWeather();
    }
    componentWillUnmount(){
        clearInterval(this.timer);
    }

    //获取每一项路由标题文本
    getTitle = ()=>{
        let path = this.props.location.pathname;
        let title;
        menuList.forEach((item)=>{
            if(item.key == path){
                title = item.title;
            }else if(item.children){
                let cItem = item.children.find(cItem =>path.indexOf(cItem.key) == 0);
                if(cItem){
                title = cItem.title;

                }
            }
        });
        return title;
    }
render(){
    //获取用户名
    let username = momory.user.username;
    let {weather,dayPictureUrl,time} = this.state;
    let title = this.getTitle();
    
return(
<div className = "header">
    <div className="header-top">
        <span>你好{username}</span>
        <LinkButton onClick = {this.loginout}>退出</LinkButton>
    </div>
    <div className="header-bottom">
        <h2 className = "header-bottom-left">{title}</h2>
       <div className="header-bottom-right">
       <span>{time}</span>
       <img src={dayPictureUrl}/>
       <span>{weather}</span>
       </div>
    </div>
</div>
);
}
}
export default withRouter(Header);