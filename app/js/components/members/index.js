import React, { Component, PropTypes } from 'react';
import {hashHistory,Link} from 'react-router';
import { connect } from 'react-redux';
import {Promise} from 'es6-promise';

import CONSTS from '../../const.js';

import Tappable from 'react-tappable';

import Header from '../header';
import IndexModule from './index-module';

import {
    AccountInfoFn
} from '../../redux/actions';
/**
 *
 * @param  {会员中心}
 *
 **/
class MemberIndex extends Component{

    constructor (props) {
        super(props);
        this.state = {
            getdata:true,
            isNoMask:true
        }
        this.enotation = this.enotation.bind(this);
    }

    handleMask(e){
        let isNoMask = this.state.isNoMask;
        
        if(isNoMask){
            this.setState({
                isNoMask:false
            })
            e.target.classList.add('on')
        }else{
            this.setState({
                isNoMask:true
            })
            e.target.classList.remove('on')
        }
    }

    verifyUserInfoFn(){
        let isLoginStatus = this.props.loginstatus.isUserLogin !== undefined ? this.props.loginstatus.isUserLogin : 'false',
             status = (isLoginStatus === 'true') ? true : false;
        if(status){
            let loginStatus = this.props.loginstatus;
            if(loginStatus.isUserRealname === 'true'){
                return (<div className="ml15 mr15 clearfix  member-info-warp">
                            <div className="member-pic">
                                <img src={loginStatus.userImage}/>
                            </div>
                            <div className="member-info">
                                <p className="member-name mt10">{ loginStatus.username }</p>
                                <p className="member-mobile mt5">{ loginStatus.userPhone }</p>
                            </div>
                        </div>)
            }else{
                return (<div className="ml15 mr15 clearfix  member-info-warp">
                            <div className="member-pic">
                                <img src={!!loginStatus.userImage ? loginStatus.userImage : (CONSTS.BASEURL+'img/account-logo.png')}/>
                            </div>
                            <div className="member-info ">
                                <Tappable
                                    className="white-col"
                                    href=""
                                    component="a">
                                    <p className="member-name mt10 tdul">去实名</p>
                                    <p className="member-mobile mt5">{ loginStatus.userPhone }</p>
                                </Tappable>
                            </div>
                        </div>)
            }
        }else{
            return (<div className="ml15 mr15 clearfix  member-info-warp">
                            <div className="member-pic">
                                <img src={CONSTS.BASEURL+'img/account-logo.png'}/>
                            </div>
                            <div className="member-info ">
                                <Tappable
                                    className="white-col"
                                    href="#"
                                    component="a">
                                    <p className="member-name mt10">去登录</p>
                                    <p className="member-mobile mt5">登录后可见</p>
                                </Tappable>
                            </div>
                        </div>)
        }

    }

    enotation(num){
        let numArr = '',
             returnStr  = '',
             startStr = '';
        if(typeof num === 'number'){
            numArr = String(num).split('.');
        }else if(typeof num === 'string'){
            numArr = num.split('.');
        }else{
            return '0.00';
        }

        startStr = numArr[0].replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');

        if(!!numArr[1]){
            if(numArr[1].length === 1){
                returnStr = startStr +'.'+numArr[1]+'0'
            }else if(numArr[1].length === 2){
                returnStr = startStr+'.'+numArr[1]
            }else{
                var sliceStr = numArr[1].slice(0,2);
                returnStr = startStr+'.'+ sliceStr
            }
        }else{
            returnStr = startStr+'.00'
        }

        return returnStr;
    }

    render(){
        let isLoginStatus = this.props.loginstatus.isUserLogin !== undefined ? this.props.loginstatus.isUserLogin : 'false';
        if(isLoginStatus === "true" && this.state.getdata){
            this.props.dispatch(AccountInfoFn())
            this.setState({
                getdata:false
            })
        }

        let headeropt = {
                title:'个人中心',
                name:'member-center'
             },
             accountInfo = this.props.accountinfo,
             status = (isLoginStatus === 'true') ? true : false,
             opt = {
                            isLogin:status,
                            ...accountInfo
                        };

        // if(status ){
        //     this.props.dispatch(AccountInfoFn())
        //     return (
        //         <div className="clearfix">
        //         </div>
        //     )
        // }

        return (
            <div className="clearfix">
                <div className="member-top-warp">
                    <Header opt={headeropt}></Header>
                    <div className="clearfix main">
                        {
                            this.verifyUserInfoFn()
                        }
                        <div className="member-have flex-box">
                            <Tappable
                                className="flex-1"
                                href="/bankcard/index.htm"
                                component="a">
                                <p className="f17">{status ? (!!accountInfo.bankCardNumber ? accountInfo.bankCardNumber : 0) : 0}</p>
                                <p className="member-have-text">银行卡</p>
                            </Tappable>
                            <Tappable
                                href="card-voucher/dist/index.html#/Home"
                                className="flex-1"
                                component="a">
                                <p className="f17">{status ? (!!accountInfo.couponsNumber ? accountInfo.couponsNumber : 0) : 0}</p>
                                <p className="member-have-text">优惠券</p>
                            </Tappable>
                        </div>
                    </div>
                </div>
                <div className="clearfix">
                     <div className="assets-warp f12">
                         <p className="f14 gray-col">总资产（元）</p>
                         <p className="f29">
                             {
                                this.state.isNoMask ? (<span >{status ? (!!accountInfo.totalAssetsAmount ? this.enotation(accountInfo.totalAssetsAmount) : '0.00') : '0.00'}</span>) : (<span >****</span>)
                             }
                             <Tappable
                                className="fr assers-btn mr20 mt15"
                                component="a"
                                onClick={this.handleMask.bind(this)}>
                            </Tappable>
                         </p>
                         {
                            this.state.isNoMask ? (<p className="profit">最新收益 {status ? (!!accountInfo.totalRevenue ? this.enotation(accountInfo.totalRevenue) : '0.00') : '0.00'}</p>) : (<p className="profit">最新收益  ****</p>)
                         }
                     </div>
                    <IndexModule
                        opt={opt}>
                     </IndexModule>
                </div>
                {
                    status && (<div className="clearfix  mt15">
                                            <Tappable
                                                href="/logout.htm"
                                                className="log-out-btn"
                                                data-islogin="true"
                                                component="a">
                                                退出
                                            </Tappable>
                                        </div>)
                }
            </div>
        )
    }
};


const mapStateToProps = (state) => {
    // console.log(state.indexConfig)
    return { 
        loginstatus:{
            ...state.setLoginStatus
        },
        accountinfo:{
            ...state.setAccountInfo
        }
    }
};

export default connect(mapStateToProps)(MemberIndex);