import React, { Component, PropTypes } from 'react';
import {hashHistory,Link} from 'react-router';
import Tappable from 'react-tappable';
import Header from '../common/header';
/**
 *
 * @param  {结果页面}
 *
 **/
class MailingResult extends Component{
    componentWillMount(){
        document.getElementsByTagName('body')[0].style.backgroundColor = '#fff'
    }
    componentWillUnmount (){
        localStorage.clear()
    }
    render(){
        const data= localStorage;
        // alert(JSON.stringify(data.getItem('name')))
        if(!data.getItem('name') || !data.getItem('mobile') || !data.getItem('address')) return null;
        return (
            <div className="clearfix">
                <Header opt={{
                    title:'信息',
                    name:"index",
                    pathname:'info'}}>
                </Header>
                <div className="clearfix main">
                    <div className="mailing-result-icon"></div>
                    <div className="tc l24 f16 yellocol">恭喜您，<br/>寄件下单成功</div>
                    <div className="clearfix mt40 l30">
                        <div className="flex-box">
                            <div className="flex-3 tr">收件人：</div>
                            <div className="flex-4">{data.getItem('name')}</div>
                        </div>
                        <div className="flex-box">
                            <div className="flex-3 tr">电       话：</div>
                             <div className="flex-4">{data.getItem('mobile')}</div>
                        </div>
                        <div className="flex-box">
                            <div className="flex-3 tr">取件地址：</div>
                             <div className="flex-4">{data.getItem('address')}</div>
                        </div>
                    </div>
                    <div className="tc l24 yellocol clearfix mt40"><i className="local-icon"></i>系统正在为您安排小哥上门，请耐心等待！</div>
                </div>
         </div>
        )
    }
}
export default MailingResult;