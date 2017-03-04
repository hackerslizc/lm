import React, { Component, PropTypes } from 'react';
import {hashHistory,Link} from 'react-router';
import { connect } from 'react-redux';
import {Promise} from 'es6-promise';

import CONSTS from '../../const.js';

import Tappable from 'react-tappable';

import Header from '../common/header';

import {
    // AccountInfoFn
} from '../../redux/actions';
/**
 *
 * @param  {会员中心}
 *
 **/
class MailingResult extends Component{

    constructor (props) {
        super(props);
        this.state = {
        }
    }

    componentWillMount(){
        document.getElementsByTagName('body')[0].style.backgroundColor = '#fff'
    }
    
    render(){
        return (
            <div className="clearfix">
                <Header opt={{
                    title:'信息',
                    name:"index",
                    pathname:'info'}}>
                </Header>
                <div className="clearfix main">
                    <div className="mailing-result-icon"></div>
                    <div className="tc l24 f16 yello-col">恭喜您，<br/>寄件下单成功</div>
                    <div className="clearfix mt40 l30">
                        <div className="flex-box">
                            <div className="flex-3 tr">收件人：</div>
                            <div className="flex-4">申通快递物流</div>
                        </div>
                        <div className="flex-box">
                            <div className="flex-3 tr">电       话：</div>
                             <div className="flex-4">15982316112</div>
                        </div>
                        <div className="flex-box">
                            <div className="flex-3 tr">取件地址：</div>
                             <div className="flex-4">申通快递物流申通快递物流</div>
                        </div>
                    </div>
                    <div className="tc l24 yello-col clearfix mt40"><i className="local-icon"></i>系统正在为您安排小哥上门，请耐心等待！</div>
                </div>
         </div>
        )
    }
};


const mapStateToProps = (state) => {
    // console.log(state.indexConfig)
    return { 
        loginstatus:{
            // ...state.setLoginStatus
        },
        accountinfo:{
            // ...state.setAccountInfo
        }
    }
};

export default connect(mapStateToProps)(MailingResult);