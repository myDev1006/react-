import React,{Component} from 'react';
import Login from "./pages/login/login"
// import Admin from "./pages/admin/admin"
import {Route,Switch,HashRouter} from "react-router-dom"
export default class App extends Component{
   
    render(){
        return(
          
                <HashRouter>
            <Switch>
                <Route path = "/login" component ={Login}></Route>
                {/* <Route path = "/admin" component = {Admin}/> */}
            </Switch>
        </HashRouter>
            
        );
        
        }
        }