import React, { Component, PropTypes } from 'react';
import {hashHistory,Link} from 'react-router';
import { connect } from 'react-redux';
import {Promise} from 'es6-promise';
import wx from 'weixin-js-sdk'
import Tappable from 'react-tappable';

import Header from '../common/header';
import ListItem from '../common/listItem';
import {
    Ajax,
    GetPackageList
} from '../../redux/actions';

/**
 *
 * @param  {列表}
 *
 **/

class List extends Component{
    constructor (props) {
        super(props);
        this.state = {
            selectArr:[],
            listArr:[],
            token:''
        }
        this.callbackFn = this.callbackFn.bind(this);
        this.selectFn = this.selectFn.bind(this);
        this.deleteFn = this.deleteFn.bind(this);
        this.getList = this.getList.bind(this);
        this.onStoreFn = this.onStoreFn.bind(this);
        this.changeStatus = this.changeStatus.bind(this);
        this.deliverytoHomeFn = this.deliverytoHomeFn.bind(this);
        // alert(window.location.href);
        wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: 'wxdcec8f2268c37b0c', // 必填，公众号的唯一标识
            timestamp: '', // 必填，生成签名的时间戳
            nonceStr: '', // 必填，生成签名的随机串
            signature: '',// 必填，签名，见附录1
            jsApiList: ['chooseWXPay'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        });
    }
    componentWillMount(){
        const body = document.getElementsByTagName('body')[0];
        body.style.backgroundColor = '#ececec';
        body.style.paddingBottom = '40px';
        this.getList()
    }
    callbackFn(opt){
        // 
    }

    getList(type = 'byNew'){
        const _this = this;
        const {dispatch, accountinfo, location} = this.props,
            {token} = this.state;
        _this.setState({
            listArr: []
        })
        // dispatch(GetPackageList({
        //     barna: type,
        //     // token: token
        // }))
        dispatch(Ajax({
            data:{
                barna: type, //byOut
                sno: 10201
            },
            success: (r) => {
                if( r.data.length != 0){
                    _this.setState({
                        listArr: r.data
                    })
                }
            }
        }))
    }

    submitHandler(){
        console.log('submitHandler')
    }

    selectFn(data){
        let selectArr = this.state.selectArr;
        if (data.select){
            selectArr.push(data.id);
        } else {
            selectArr.pop(data.id);
        }
        this.setState({
            selectArr: selectArr
        })
    }

    deleteFn(data){
        // console.log(data)
        // 调用服务端删除接口
    }

    ItemRender(){
        let _this = this,
            {listArr} = this.state,
            Ele = '',
            eleArr = [];
        if(listArr.length > 0){
            for (var i = 0; i < listArr.length; i++){
                const opt = {
                    ...listArr[i]
                };
                eleArr.push(<ListItem opt={opt} key={i} selectFn={_this.selectFn} deleteFn={_this.deleteFn}></ListItem>)
            }   
        } else {
            eleArr = (
                <div className="clearfix tc mt50 pt50">
                    <span className="nolist"></span>
                    <p className="f18 gray-col-1 mt20">对不起</p>
                    <p className="f14 gray-col mt5">您还没有相关记录！</p>
                </div>
            )
        }
        return (eleArr)
    }

    onStoreFn(){
        this.changeStatus(0)
    }  

    deliverytoHomeFn(){
        this.changeStatus(32)
    } 

    changeStatus(istype){
        const {dispatch, location} = this.props;
        const {token, selectArr} = this.state;
        let response = {};
        dispatch(Ajax({
            data: {
                sno: istype === 32 ? 10233 : 10231,
                ordnr: selectArr, // 订单号
                nstat: istype, //新状态
            },
            success: (r) => {
                if(istype === 0){
                    window.location.reload()
                }
                response = r.data
            }
        }))
    }

    render(){
        let _this = this;
        const {listArr} = this.state; 
        return (
            <div className="clearfix">
                <Header opt={{
                    title:'收件列表',
                    name:"addresseelist",
                    pathname:'addresseelist',
                    getUserInfo: true}}
                    callbackFn={this.callbackFn}
                    requestHandler={this.getList}>
                </Header>
                <div className="clearfix main list">
                    {
                        this.ItemRender()
                    }
                </div>
                {
                    listArr.length !== 0 && <div className="clearfix fixed flex-box">
                        <Tappable
                            id=""
                            onTap={this.deliverytoHomeFn}
                            className="list-btn flex-1 home"
                            component="a">
                            <i className="list-icon icon-home"></i>送货上门
                        </Tappable>
                        <Tappable
                            id=""
                            onTap={this.onStoreFn}
                            className="list-btn flex-1"
                            component="a">
                            <i className="list-icon icon-store"></i>到店自提
                        </Tappable>
                    </div>
                }
            </div>
        )
    }
};


const mapStateToProps = (state) => {
    // console.log(state.indexConfig)
    return {
        list:[...state.setPackageList],
        accountinfo:{
            ...state.setAccountInfo
        }
    }
};

export default connect(mapStateToProps)(List);