import React, {Component} from 'react';
import {render} from 'react-dom';
import { Provider, connect } from 'react-redux';
import { Router, Route, Link, hashHistory , IndexRoute, browserHistory} from 'react-router';

import configureStore from '../redux/create-store';


import InitState from '../redux/reducers/init-state';

import AppMain from '../components/app';

import Home from '../components/index/index';
import MemberCenter from '../components/members/index';

import NoContent from '../components/nocontent';
import BindUser from '../components/members/bind';
import List from '../components/plist/list';
import Detail from '../components/detail/index';

import AddressList from '../components/alist/list';
import AddAddress from '../components/alist/add-address';
import Infomation from '../components/members/infomation';
import MailingResult from '../components/members/mailing-result';
import ExpressForm from '../components/express-form/index';

import Evaluation from '../components/evaluation/index';


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
                    <Route path="/" component={AppMain}>

                        <Route path="/error-page" 
                            component={NoContent}>
                        </Route>

                        <Route path="/bind" 
                            component={BindUser}>
                        </Route>

                        <Route path="/list" 
                            component={List}>
                        </Route>

                        <Route path="/detail" 
                            component={Detail}>
                        </Route>

                        <Route path="/info" 
                            component={Infomation}>
                        </Route>

                        <Route path="/address-list" 
                            component={AddressList}>
                        </Route>
                        
                        <Route path="/address-add" 
                            component={AddAddress}>
                        </Route>

                        <Route path="/express-form" 
                            component={ExpressForm}>
                        </Route>

                        <Route path="/express-result" 
                            component={MailingResult}>
                        </Route>

                        <Route path="/evaluation" 
                            component={Evaluation}>
                        </Route>
                    </Route>
                </Router>
            </Provider>
        );
    } 
}

render(
    <App store={AppStore} />,
    document.querySelector('#wrapBox'))

