import React, { Component, PropTypes } from 'react';
import {hashHistory,Link} from 'react-router';
import { connect } from 'react-redux';
import {Promise} from 'es6-promise';
import wx from 'weixin-js-sdk'
import Tappable from 'react-tappable';
import Header from '../common/header';
/**
 *
 * @param  {绑定成功页面}
 *
 **/

class BindResult extends Component{
    constructor (props) {
        super(props);
        this.state = {}
    }
    componentDidMount(){
        const body = document.getElementsByTagName('body')[0];
        body.style.height = '100%';
        body.style.backgroundColor = '#ececec';
    }
    callbackFn(opt){
        // this.getList()
    }

    clickHandler(e){
        const id = e.currentTarget.id;
        hashHistory.push(id)
    }

    render(){
        return (
            <div className="clearfix" style={{height: '100%'}}>
                <Header 
                    opt={{
                        title:'邻米',
                        name:"bind",
                        pathname:'bind',
                        getUserInfo: false
                     }}
                    callbackFn={this.callbackFn}
                    requestHandler={this.getList}>
                </Header>
                <div className="clearfix main">
                    <div className="mt40 clearfix"></div>
                    <div className="mailing-result-icon"></div>
                    <div className="tc l24 f16 yellocol">恭喜您<br/>绑定手机号码成功</div>
                    <div className="tc">我们将为您带来一站式服务</div>
                </div>
                <div className="clearfix fixed flex-box">
                    <Tappable
                        id="/list"
                        onTap={this.clickHandler}
                        className="list-btn flex-1 home"
                        component="a">
                        取件
                    </Tappable>
                    <Tappable
                        id="/express-list"
                        onTap={this.clickHandler}
                        className="list-btn flex-1"
                        component="a">
                        寄件
                    </Tappable>
                </div>
            </div>
        )
    }
};
export default BindResult;