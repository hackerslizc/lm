require('../../css/app.less');

import React, {Component} from 'react';
import {connect} from 'react-redux';
import Loading from './loading';
import LoadingBottom from './loadingbottom';
import Tip from './tip';
import { hashHistory } from 'react-router';

import Home from './index/index';
import Members from './members/index';
import Header from './header';

import {
    setRuntime,
} from '../redux/actions'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

var isAppLoaded = false;
        
class App extends Component {

    constructor (props) {
        super(props);
        this.state={
            showDownLoadBar:false
        }
        var _this = this;
        
        this.downloadbarcbFn = this.downloadbarcbFn.bind(this)
    }

     componentDidUpdate (prevProps) {
        if (this.props.location.pathname === '/') {

            if ( prevProps.location.pathname !== '/' ) {
                console.log('后退回了首页，将要关闭WEB View');
                // window.localStorage.removeItem('scrollPosition');
                // HybridBridge.close();
            }
        }
    }

    downloadbarcbFn(){
        this.setState({
            showDownLoadBar:false
        })
    }

    render() {
        let {indexConfig} = this.props,
            content;


        const { pathname } = this.props.location
        const key = pathname.split('/')[1] || 'root';

        content =
            <ReactCSSTransitionGroup
              component="div" transitionName="example"
              transitionEnterTimeout={200} transitionLeaveTimeout={50}
            >
                {React.cloneElement(this.props.children || <div />, { key: key })}
            </ReactCSSTransitionGroup>;

        
        return (
            <div>
                <Home/>
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
    // alert("configStates:"+JSON.stringify(state.configStates)+"-"+"listStates:"+JSON.stringify(state.listStates))
    return {
        ...state.indexConfig,
        dataloading: state.dataloading
    }
}

export default connect(mapStateToProps)(App);