import React,{Component} from 'react';
import Login from "./pages/login/login"
import Admin from "./pages/admin/admin"
import {Route,Switch,BrowserRouter} from "react-router-dom"
export default class App extends Component{
   
    render(){
        return(
                <BrowserRouter>
            <Switch>
                <Route path = "/login" component ={Login}></Route>
                <Route path = "/" component = {Admin}/>
            </Switch>
        </BrowserRouter>
            
        );
        
        }
        }