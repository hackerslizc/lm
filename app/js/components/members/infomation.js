import React, { Component, PropTypes } from 'react';
import {hashHistory,Link} from 'react-router';
import {Promise} from 'es6-promise';

import Tappable from 'react-tappable';
import Header from '../common/header';
import InfoItem from './info-item';
/**
 *
 * @param  {消息列表 模块}
 *
 **/
class Infomation extends Component{
    constructor (props) {
        super(props);
    }
    componentDidMount(){
        // document.getElementsByTagName('body')[0].style.backgroundColor = '80px;'
    }

    callbackFn(data){
        console.log(data)
    }

    render(){
        return (
         <div className="clearfix">
                <Header opt={{
                    title:'信息',
                    name:"index",
                    pathname:'info'}}
                    callbackFn={this.callbackFn}>
                </Header>
                <div className="clearfix main">
                    <InfoItem></InfoItem>
                </div>
         </div>
        )
    }
};

export default Infomation;