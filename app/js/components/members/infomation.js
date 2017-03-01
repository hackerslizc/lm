import React, { Component, PropTypes } from 'react';
import {hashHistory,Link} from 'react-router';
import {Promise} from 'es6-promise';

import Tappable from 'react-tappable';
import Header from '../header';
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
    render(){
        return (
         <div className="clearfix">
                <Header opt={{
                    title:'信息',
                    name:"index",
                    pathname:'info'}}>
                </Header>
                <div className="clearfix main">
                
                </div>
         </div>
        )
    }
};

export default Infomation;