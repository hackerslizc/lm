require('../../css/app.less');

import React, {Component} from 'react';
import {connect} from 'react-redux';
import Loading from './loading';
import LoadingBottom from './loadingbottom';
import Tip from './tip';
import { hashHistory } from 'react-router';

import Header from './common/header';
import {
    remote,
    setRuntime,
} from '../redux/actions'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
        
class App extends Component {

    constructor (props) {
        super(props);
        this.state={
        }
    }

    componentDidMount(){
        // const {dispatch} = this.props,
        //         _this = this;
        // dispatch(remote({
        //     type: 'post',
        //     data: {
        //         sno:10000
        //     }
        // })).then((r)=>{
        //     if( r && r.data ){
        //         dispatch(getAccountInfo(r.data));
        //         _this.dispatchRoute(r);
        //     }
        // })
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
        // accountinfo:{
        //     ...state.setAccountInfo
        // },
        // dataloading: state.dataloading
    }
}

export default connect(mapStateToProps)(App);