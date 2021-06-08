import React, {Component} from 'react';
import Menu from './MenuComponent';
import {DISHES} from '../shared/dishes';
import DishDetail from './DishdetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import { Switch, Route, Redirect } from 'react-router-dom';
class Main extends Component{

    constructor(props){
        super(props);
        this.state={
            dishes:DISHES,
            
        };
    }

    
    
    render(){
        const HomePage = () => {
            return(
                <Home/>
            );
        }
        return(
            <div>
                <Header></Header>
                <Switch>
                    <Route path="/home" component={HomePage}></Route>
                    <Route exact path="/menu" component={()=><Menu dishes={this.state.dishes}/>}></Route>
                    <Redirect to="/home" />
                </Switch>
                <Footer></Footer>
            </div>
        );
    }

}

export default Main;
