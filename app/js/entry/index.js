import React, {Component} from 'react';
import {render} from 'react-dom';
import { Provider, connect } from 'react-redux';
import { Router, Route, Link, hashHistory , IndexRoute} from 'react-router';

import configureStore from '../redux/create-store';


import InitState from '../redux/reducers/init-state';

import AppMain from '../components/app';

import Header from '../components/header';
import Home from '../components/index/index';
import MemberCenter from '../components/members/index';

import NoContent from '../components/nocontent.js';
import BindUser from '../components/members/bind';
// import PayStatus from '../components/pay-status.js';

const store = configureStore();
const AppStore = configureStore(InitState);

//APP 入口
class App extends Component {
    setTitle (title) {

    }

    render () {
        return (
            <Provider store={this.props.store}>
                <Router history={hashHistory}>
                    <Route path="/" 
                        component={AppMain}>
                        <Route path="/Index" 
                            component={Home}>
                        </Route>
                    </Route>
                    <Route path="/member-center" 
                        component={MemberCenter}>
                    </Route>
                    <Route path="/error-page" 
                        component={NoContent}>
                    </Route>
                    <Route path="/bind" 
                        component={BindUser}>
                    </Route>
                </Router>
            </Provider>
        );
    } 
}

render(
    <App store={AppStore} />,
    document.querySelector('#wrapBox'))

