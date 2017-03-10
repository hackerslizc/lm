import React, { Component, PropTypes } from 'react';
import {hashHistory,Link} from 'react-router';
import { connect } from 'react-redux';
import {Promise} from 'es6-promise';

import CONSTS from '../const.js';

import Tappable from 'react-tappable';

/**
 *
 * @param  {列表}
 *
 **/
class NoContent extends Component{

    constructor (props) {
        super(props);
        this.nocontent = this.nocontent.bind(this);
        this.toMoudle = this.toMoudle.bind(this);
        this.ListContent = this.ListContent.bind(this);

    }

    toMoudle(type){
        var moudleName = '';
        if(type == 'BINDJD'){
            (!!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) ? (moudleName = 'BINDJDACCOUNT') : (moudleName = 'BINDJD')
        }else if(type == 'LOOKOTHER'){
            moudleName = 'FINANCE'
        }else{
            moudleName = 'HOME'
        }
    }

    nocontent (type){
        let title = '',
              desc = '',
              btndesc = '';
       if( type == 'BINDJD' ){
            title = "您还没有绑定账户";
            desc = "绑定后才能查看订单，支持待付款";
            btndesc = "立即绑定";
        }else{
            title = "您还没有相关记录";
            desc = "可以去看看有哪些精品推荐";
            btndesc = "随便逛逛";
        }

        return (
            <div className="clearfix tc mt50 pt50">
                    <span className="nolist"></span>
                    <p className="f18 gray-col-1 mt20">无记录</p>
                    <p className="f14 gray-col mt5">对不起，您还没有相关记录！</p>
            </div>
        )
    }

    ListContent(){
        var contentType = '';
        if(this.props.getInfo && this.props.getInfo.jdPin == ''){
            contentType = 'BINDJD'
        }else{
            contentType = 'LOOKOTHER'
        }
        return this.nocontent(contentType)
    }

    render(){
        const {dispatch} = this.props;
        return (
            <div className="clearfix">
                {
                    this.ListContent()
                }
            </div>
        )
    }
};


export default NoContent;