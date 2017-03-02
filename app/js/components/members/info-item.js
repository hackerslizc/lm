import React, { Component, PropTypes } from 'react';
import {hashHistory,Link} from 'react-router';
import {Promise} from 'es6-promise';

import Tappable from 'react-tappable';
import Header from '../common/header';
/**
 *
 * @param  {消息 模块}
 *
 **/
class InfomationItem extends Component{
    constructor (props) {
        super(props);
    }
    componentDidMount(){
        // document.getElementsByTagName('body')[0].style.backgroundColor = '80px'
    }
    render(){
        return (
            <div className="clearfix">
                <div className="clearfix main">

                </div>
            </div>
        )
    }
};

export default InfomationItem;