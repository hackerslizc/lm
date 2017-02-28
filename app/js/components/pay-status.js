import React, { Component, PropTypes } from 'react';
import {hashHistory,Link} from 'react-router';
import { connect } from 'react-redux';
import {Promise} from 'es6-promise';

import Tappable from 'react-tappable';

/**
 *
 * @param  {支付结果页面}
 *
 **/
class PayStatus extends Component{

    constructor (props) {
        super(props)

        this.stringToNum = this.stringToNum.bind(this);
        this.preferentialAmount = this.preferentialAmount.bind(this);
    }

    /*
    *字符串转换数字
    *参数：str 
    */

    stringToNum(str){
        var str = String(parseFloat(str)),
              arr = str.split('.'),
              str1 ;
        if(arr[1].length == 1){
            arr[1] = arr[1]+"0";
        }
        str1 = arr[0]+"."+arr[1];
        return str1;
    }

    /*
    *
    * 计算金额，保留两位数
    *
    */
    preferentialAmount(){
        var price = this.props.payState && this.stringToNum(this.props.payState.disMap['实付金额']);
        var originalprice = this.props.payState && this.stringToNum(this.props.payState.disMap['应付金额']);
        var preferential = ( parseFloat(originalprice) - parseFloat(price) ).toFixed(2);
        return preferential;
    }

    render(){

        var copewith = this.props.payState && this.stringToNum(this.props.payState.disMap['应付金额']);
        var wh = window.document.body.clientHeight,
              _height = wh+'px';
        return (
            <div className="pr h pay-icon" style={{minHeight:_height}}>
                <div className="pay-detail paymentcode-detail">
                    <div>
                        <p className="paymentcode-status g-status">
                            支付成功
                        </p>
                    </div>
                    
                    <div className="paymentcode-main">
                        <div className="paymentcode-info clearfix">
                            <p className="storename">testy</p>
                            <h1 className="price">¥{ this.props.payState && this.stringToNum(this.props.payState.disMap['实付金额'])}</h1>
                            <p className="originalprice">
                                {
                                    this.props.payState && ((this.preferentialAmount() != 0 && this.preferentialAmount() > 0) && (<span>¥ <label>{copewith}</label></span>))
                                }
                            </p>
                        </div> 
                        {
                            this.props.payState && 
                            ( this.preferentialAmount() != 0 && (
                                <div className="coupon-wrap"> 
                                    <dl>
                                        <dt className="red">优惠金额</dt>
                                        <dd className="red">
                                            <p>{ this.preferentialAmount() }</p>
                                        </dd>
                                    </dl>
                                </div>)
                            )
                        }
                        
                        <div className="coupon-wrap"> 
                            <dl>
                                <dt>支付方式</dt>
                                <dd>
                                    <p>{ this.props.payState && this.props.payState.disMap['付款方式'] }</p>
                                </dd>
                            </dl>
                            <dl>
                                <dt>交易时间</dt>
                                <dd>
                                    <p>{ this.props.payState && this.props.payState.disMap['交易时间'] }</p>
                                </dd>
                            </dl>
                            <dl>
                                <dt>订单编号</dt>
                                <dd>
                                    <p>{ this.props.payState && this.props.payState.disMap['订单编号'] }</p>
                                </dd>
                            </dl>
                        </div>
                    </div>
                </div> 
            </div>
        )
    }
};


const mapStateToProps = (state) => {
    // console.log(state.setInfo);
    return {
        ...state.payStates
    }
};

export default connect(mapStateToProps)(PayStatus);