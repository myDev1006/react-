import React from "react"
import Login from "./pages/login/login"
import Admit from "./pages/admit/admit"
import {BrowserRouter,Switch,Route} from "react-router-dom"

export default class App extends React.Component{
    render(){
        return ( 
        <BrowserRouter>
        <Switch>
        <Route path="/login" component={Login}></Route>
        <Route path="/admit" component={Admit}> </Route>
         {/* <h2>the sky is beautiful</h2>*/}
         </Switch>
         </BrowserRouter>  
        )       
    }
}