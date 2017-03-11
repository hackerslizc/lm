import React, { Component, PropTypes } from 'react';
import {hashHistory,Link} from 'react-router';
import { connect } from 'react-redux';
import {Promise} from 'es6-promise';
import Tappable from 'react-tappable';
import wx from 'weixin-js-sdk'
import Header from '../common/header';
import {
    remote,
    GetPackageList
} from '../../redux/actions';

/**
 *
 * @param  {首页}
 *
 **/
class Home extends Component{

    constructor (props) {
        super(props);
        this.state = {
            token: ''
        };
        this.callbackFn = this.callbackFn.bind(this);
        this.onStoreFn = this.onStoreFn.bind(this);
        this.deliverytoHomeFn = this.deliverytoHomeFn.bind(this);
        this.changeStatus = this.changeStatus.bind(this);

        wx.config({
            debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: 'wxdcec8f2268c37b0c', // 必填，公众号的唯一标识
            timestamp: '', // 必填，生成签名的时间戳
            nonceStr: '', // 必填，生成签名的随机串
            signature: '',// 必填，签名，见附录1
            jsApiList: ['chooseWXPay'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        });
    }
    componentDidMount(){
        document.getElementsByTagName('body')[0].style.paddingBottom = '80px;'
    }

    callbackFn(r){
        if (r && r.data) {
            this.setState({
                token: r.data.token
            })
        }
    }
    
    getState(status) {
        let ostat = '';
        if(status === 0){
            ostat = '自提'
        } else if (status === 1) {
            ostat = '待付款'
        } else if (status === 2) {
            ostat = '已付款'
        } else if (status === 4) {
            ostat = '已派单'
        } else if (status === 8) {
            ostat = '已出库'
        } else if (status === 16) {
            ostat = '多次派送'
        } else if (status === 32) {
            ostat = '电子签收'
        } else if (status === 64) {
            ostat = '本人签收'
        } else if (status === 128) {
            ostat = '他人代签'
        }
        return ostat
    }

    onStoreFn(){
        this.changeStatus(0)
    }  

    deliverytoHomeFn(){
        this.changeStatus(32)
    } 

    changeStatus(istype){
        const {dispatch, location} = this.props;
        const {posnt, ordnr, smsvc, inpda, ostat } = location.state;
        const {token} = this.state;
        let response = {};
        dispatch(remote({
            data: {
                sno: istype === 32 ? 10220 : 10221,
                ordnr: ordnr, // 订单号
                nstat: istype, //新状态
                token: token
            }
        })).then((r) => {
            if(r.err === 0) {
                response = r.data
            }
        })
        if(istype !== 32 && !response.ordam) return false;
        wx.ready(function(){
            // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
            wx.chooseWXPay({
                timestamp: 0, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                nonceStr: '', // 支付签名随机串，不长于 32 位
                package: '', // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
                signType: '', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                paySign: '', // 支付签名
                success: function (res) {
                    // 支付成功后的回调函数
                }
            });
        });
    }

    render(){
        const {posnt, ordnr, smsvc, inpda, ostat } = this.props.location.state,
            state = this.getState(ostat);
        // console.log(this.props.location.state)
        return (
            <div className="clearfix">
                <Header 
                    opt={{
                    title: '包裹详情',
                    name: 'detail',
                    pathname: 'detail'}}
                    callbackFn={this.callbackFn}>
                </Header>
                <div className="clearfix main">
                    <div className="detail-bg"></div>
                    <div className="clearfix l30 f14 mt50">
                        <div className="flex-box">
                            <div className="flex-3 tr">物流公司：</div>
                            <div className="flex-4">{posnt}</div>
                        </div>
                        <div className="flex-box">
                            <div className="flex-3 tr">单       号：</div>
                             <div className="flex-4">{ordnr}</div>
                        </div>
                        <div className="flex-box">
                            <div className="flex-3 tr">取  件 码：</div>
                             <div className="flex-4">{smsvc}</div>
                        </div>
                        <div className="flex-box">
                            <div className="flex-3 tr">到店时间：</div>
                            <div className="flex-4">{inpda}</div>
                        </div>
                        <div className="flex-box yello-col">
                            <div className="flex-3 tr"><i className="detail-package-icon"></i>包裹状态：</div>
                            <div className="flex-4">{state}</div>
                        </div>
                    </div>
                    <p className="clearfix tc yello-col l20 mt50 f16"> 温馨提示：本店主营业务互联网快递业务，
我们可以快递到您家！</p>
                    {
                        ostat === 1 && (<div className="clearfix mt50">
                            <Tappable
                                id=""
                                onTap={this.onStoreFn}
                                className="round-btn flex-1"
                                component="a">
                                到店自提
                            </Tappable>
                            <Tappable
                                id=""
                                onTap={this.deliverytoHomeFn}
                                className="round-btn flex-1"
                                component="a">
                                2元送货上门
                            </Tappable>
                        </div>)
                    }
                    
                </div>
            </div>
        )
    }
};


const mapStateToProps = (state) => {
    // console.log(state.indexConfig)
    return {
        accountinfo:{
            ...state.setAccountInfo
        }
    }
};

export default connect(mapStateToProps)(Home);