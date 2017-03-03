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
            <div className="list-order-warp clear">
                <div className="list-info-center clearfix">
                    的撒的撒的范德萨发的萨菲阿范德萨范德萨范德萨范德萨阿哥和规范的后
                    果东风发的什么基金可点击撒金额为秋日请new汾河湾
                </div>
                <div className="list-order-foot clearfix">
                    <span className=" fl gray-col">
                        阅读全文
                    </span>
                </div>
            </div>
        )
    }
};

export default InfomationItem;