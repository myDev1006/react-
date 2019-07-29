import React,{Component} from 'react';
import Home from "./home"
import Detail from "./detail"
import AddUpdata from "./addUpdata"
import {Route,Redirect,Switch} from "react-router-dom"
import "./product.less"
export default class Product extends Component{
  render(){
   return(
    <Switch>
    <Route path = "/product" component = {Home} exact ={true}/>
  <Route path = "/product/detail" component = {Detail}/>
  <Route path = "/product/updata" component = {AddUpdata}/>
  <Redirect to = "/product"/>
  </Switch>
   ) 
   
   
  }
}