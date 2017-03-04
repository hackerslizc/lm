require('../../css/app.less');

import React, {Component} from 'react';
import {connect} from 'react-redux';
import Loading from './loading';
import LoadingBottom from './loadingbottom';
import Tip from './tip';
import { hashHistory } from 'react-router';

import Home from './index/index';
import Members from './members/index';
import Header from './common/header';
import {
    remote,
    getAccountInfo,
    setRuntime,
} from '../redux/actions'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
        
class App extends Component {

    constructor (props) {
        super(props);
        this.state={
        }
    }

    componentWillMount(){
        // alert(window.location)
        const {dispatch} = this.props;
        dispatch(remote({
            type: 'post',
            data: {
                sno:10002
            }
        })).then((r)=>{
            if( r && r.data ){
                getAccountInfo(r.data)
                this.dispatchRoute(r);
            }
        })
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

    dispatchRoute (r) {
        const {data} = r;
        if( data.phone && data.wxuid) {
            hashHistory.push('/list');
        } else {
            hashHistory.push('/bind');
        }
    }

    render() {
        let content;

        
        const { pathname } = this.props.location
        const key = pathname.split('/')[1] || 'root';

        content =
            <ReactCSSTransitionGroup
                component="div" transitionName="example"
                transitionEnterTimeout={200} transitionLeaveTimeout={50}>
                {
                    React.cloneElement(this.props.children || <div />, { key: key })
                }
            </ReactCSSTransitionGroup>;

        
        return (
            <div>
                {
                    // false && <Home/>
                }
                {content}
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
        // ...state.indexConfig,
        accountinfo:{
            ...state.setAccountInfo
        },
        // dataloading: state.dataloading
    }
}

export default connect(mapStateToProps)(App);