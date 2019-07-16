import React,{Component} from 'react';
import momoryUtil from "../../utils/momory"
import {Redirect} from "react-router-dom"
import Login from "../login/login"
export default class  extends Component{
render(){
    let {user} = momoryUtil;
    if(!user._id){
         return <Redirect to ="/login"/>
    }
return(
<div>hello+{user.username}</div>
);
}
}