import React from 'react';
import ReactDOM from 'react-dom';
import {
    Route, 
    Router, 
    RouteHandler, 
    IndexRoute, 
    hashHistory,
    browserHistory
} from 'react-router';

// 定义整个页面的路由结构
import IndexPage from './components/index';
import AboutUs from './components/aboutus';

ReactDOM.render((
    <Router history={browserHistory}>
        <Route path="/" name="IndexPage" component={IndexPage}>
        	<IndexRoute name="IndexPage" component={IndexPage} />
        </Route>
        <Route path="/index" name="IndexPage" component={IndexPage}></Route>
        <Route path="/about" name="AboutUs" component={AboutUs}></Route>
    </Router>
),document.getElementById('wrapBox'));