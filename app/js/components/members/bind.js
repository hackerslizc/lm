import React, { Component, PropTypes } from 'react';
import {hashHistory,Link} from 'react-router';
import { connect } from 'react-redux';
import {Promise} from 'es6-promise';

import Tappable from 'react-tappable';

import Header from '../common/header';
import Input from '../common/input';
/**
 *
 * @param  {绑定页面}
 *
 **/
class BindUser extends Component{

    constructor (props) {
        super(props);
        this.state = {

        }
        this.callbackFn = this.callbackFn.bind(this);
    }
    componentDidMount(){
        document.getElementsByTagName('body')[0].style.backgroundColor = '#fff'
    }
    callbackFn(opt){
        console.log(opt)
    }
    submitHandler(){
        console.log('submitHandler')
    }
    render(){

        let _this = this,
            headerOpt = {
                title:'邻米',
                name:"index",
                pathname:'index'
             };
        return (
            <div className="clearfix">
                <Header 
                    opt={headerOpt}>
                </Header>
                <div className="clearfix main">
                    <Input opt={{
                        id:'mobile',
                        margint: true,
                        pagename:'bind',
                        type: 'mobile',
                        label: '手机号码',
                        callbackFn:_this.callbackFn}}>
                    </Input>
                    <Input opt={{
                        id:'captcha',
                        margint: true,
                        pagename:'bind',
                        type: 'captcha',
                        label: '验证码',
                        callbackFn:_this.callbackFn}}>
                    </Input>

                    <Tappable
                        onTap={this.submitHandler}
                        className="form-submit mt40"
                        component="buttom">
                        确定
                    </Tappable>
                    <div className="bind-qr-code">
                        <img src="http://www.zyue.com/upload/addr/er_20140725105541.png"/>
                        <p>请保存此图片  ，该图片可用于快捷取件</p>
                    </div>
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