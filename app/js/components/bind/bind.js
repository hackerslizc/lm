import React, { Component, PropTypes } from 'react';
import {hashHistory,Link} from 'react-router';
import { connect } from 'react-redux';
import {Promise} from 'es6-promise';
import Tappable from 'react-tappable';
import Header from '../common/header';
import Input from '../common/input';
import CountDownBtn from '../common/countdown-btn';

// import {Ajax} from '../../common/Util'

import {
    Ajax,
    toast
} from '../../redux/actions';
/**
 *
 * @param  {绑定页面}
 *
 **/
class BindUser extends Component{

    constructor (props) {
        super(props);
        this.state = {
            qrcode: '',
            phone: '',
            smsvc: ''
        };
        this.beforeCountDownStart = this.beforeCountDownStart.bind(this);
        this.callbackFn = this.callbackFn.bind(this);
        this.inputcallbackFn = this.inputcallbackFn.bind(this);
        this.headerCallbackFn = this.headerCallbackFn.bind(this);
        this.validform = this.validform.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
    }
    componentDidMount(){
        document.getElementsByTagName('body')[0].style.backgroundColor = '#fff'
    }

    inputcallbackFn(opt){
        let data = {};
        if(opt.name === "mobile"){
            data['phone'] = opt.value
        } else if (opt.name === "captcha") {
            data['smsvc'] = opt.value
        }
        this.setState(data)
    }

    callbackFn(e){
        let data = {};
        data[e.currentTarget.id] = e.currentTarget.value
        this.setState(data)
    }

    headerCallbackFn(r) {
        // alert(r);
    }

    beforeCountDownStart() {
        const {dispatch} = this.props;
        const {phone} = this.state;
        const me = this;
        const regex = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
        if(!regex.test(phone)){
            dispatch(toast('手机号错误，请重新填写'));
            return false;
        }
        dispatch(Ajax({
            method : 'post',
            data : {
                sno: 10021,
                phone
            },
            success: (r) => {
                dispatch(toast('短信验证码发送成功'))
            },
            error: (r) =>{
                dispatch(toast(r.msg))
                me.refs.countDown.reset();
            }
        }))
    }

    validform(){
        // hashHistory.push('/bind-result');
        const {dispatch} = this.props;
        const regex = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
        const {phone, smsvc} = this.state;
        let status = '';
        if (!regex.test(phone)) {
            dispatch(toast('手机号码错误，请重新填写'));
        } else if (smsvc ==='' || smsvc.length != 6) {
            dispatch(toast('短信验证码错误，请重新填写'));
        } else {
            this.submitHandler()
        }
    }

    submitHandler(){
        const {dispatch} = this.props;
        const {smsvc, phone} = this.state;
        dispatch(Ajax({
            method : 'post',
            data : {
                sno: 10022,
                smsvc,
                phone,
                sigip: 0
            },
            success: (r) => {
                hashHistory.push('/bind-result');
            },
            error: (r) =>{
                dispatch(toast(r.msg));
            }
        }))
    }

    render(){
        const {qrcode} = this.state;    
        let _this = this;
        let countOptions = {
            // time: 59,
            before: this.beforeCountDownStart
        };
        return (
            <div className="clearfix">
                <Header opt={{
                        title:'邻米',
                        name: "bind",
                        pathname: 'bind'}}
                        callbackFn={this.headerCallbackFn}>
                </Header>
                <div className="clearfix main">
                    <div className="captcha-warp mt20 clearfix ">
                        <i className="mobile-img"></i>
                        <input type="tel" maxLength="11" id="phone"  placeholder="请填写手机号" onChange={_this.callbackFn}/> 
                    </div>
                    <div className="captcha-warp mt20 clearfix ">
                        <i className="captcha-img"></i>
                        <input type="tel" maxLength="6" id="smsvc" placeholder="短信验证码" onChange={_this.callbackFn}/> 
                        <CountDownBtn className="captcha-btn" options={countOptions} ref="countDown"/>
                    </div>
                    <Tappable
                        onTap={this.validform}
                        className="form-submit mt40"
                        component="buttom">
                        确定
                    </Tappable>
                    {
                        qrcode !== '' && <div className="bind-qr-code">
                            <img src="http://www.zyue.com/upload/addr/er_20140725105541.png"/>
                            <p>请保存此图片  ，该图片可用于快捷取件</p>
                        </div>
                    }
                    
                </div>
            </div>
        )
    }
};


const mapStateToProps = (state) => {
    // console.log(state.indexConfig)
    return {
        // ...state.indexConfig
    }
};

export default connect(mapStateToProps)(BindUser);