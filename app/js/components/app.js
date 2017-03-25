import React, {Component} from 'react';
import {connect} from 'react-redux';
import { hashHistory } from 'react-router';
require('../../css/app.less');

import Tip from './tip';
import Loading from './loading';
import Header from './common/header';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
        
class App extends Component {

    constructor (props) {
        super(props);
        this.state={
        }
    }

    componentDidMount(){
    }
     componentDidUpdate (prevProps) {
        if (this.props.location.pathname === '/') {

            if ( prevProps.location.pathname !== '/' ) {
                console.log('后退回了首页，将要关闭WEB View');
                // HybridBridge.close();
            }
        }
    }

    render() {
        let content;
        const { pathname } = this.props.location
        const key = pathname.split('/')[1] || 'root';

        content =
            <ReactCSSTransitionGroup
                component="div" className="clearfix" style={{'minHeight': '100%'}} transitionName="example"
                transitionEnterTimeout={200} transitionLeaveTimeout={50}>
                {
                    React.cloneElement(this.props.children || <div />, { key: key })
                }
            </ReactCSSTransitionGroup>;
        return (
            <div className="clearfix" style={{height: '100%'}}>
                {
                    // false && <Home/>
                }
                {this.props.children}
                <Loading />
                {!!this.props.dataloading &&
                    <LoadingBottom />
                }
                <Tip />
            </div>
        ) 

    }
}

const mapStateToProps = (state) => {
    return { }
}

export default connect(mapStateToProps)(App);