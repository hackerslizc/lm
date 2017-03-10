import React, { Component, PropTypes } from 'react';
import {hashHistory,Link} from 'react-router';
import { connect } from 'react-redux';
import {Promise} from 'es6-promise';

import Tappable from 'react-tappable';

import Header from '../common/header';
import ListItem from '../common/listItem';
import {
    remote,
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
        this.getList = this.getList.bind(this)
    }
    componentDidMount(){
        const body = document.getElementsByTagName('body')[0];
        body.style.height = 'auto';
        body.style.backgroundColor = '#ececec';
        body.style.paddingBottom = '40px';
    }
    callbackFn(opt){
        const {token} = opt.data;
        this.setState({
            token: token
        });
        token && this.getList()
    }

    getList(type = 'byHis'){
        const {dispatch, accountinfo, location} = this.props,
            {token} = this.state;
        dispatch(GetPackageList({
            barna: type,
            token: token
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
        console.log(data);
    }

    deleteFn(data){
        // console.log(data)
        // 调用服务端删除接口
    }

    ItemRender(){
        let _this = this,
            {list} = this.props,
            Ele = '',
            eleArr = [];
        if(list.length > 0){
            for (var i = 0; i < list.length; i++){
                const opt = {
                    ...list[i]
                };
                eleArr.push(<ListItem opt={opt} key={i} selectFn={_this.selectFn} deleteFn={_this.deleteFn}></ListItem>)
            }   
        } else {
            eleArr = (
                <div className="clearfix tc mt50 pt50">
                    <span className="nolist"></span>
                    <p className="f18 gray-col-1 mt20">出错啦</p>
                    <p className="f14 gray-col mt5">对不起，您还没有相关记录！</p>
                </div>
            )
        }
        return (eleArr)
    }

    onStoreFn(){

    }

    deliverytoHomeFn(){

    }

    render(){
        let _this = this,
            headerOpt = {
                title:'邻米',
                name:"list",
                pathname:'list',
                getUserInfo: true
             };
        return (
            <div className="clearfix">
                <Header 
                    opt={headerOpt}
                    callbackFn={this.callbackFn}
                    requestHandler={this.getList}>
                </Header>
                <div className="clearfix main">
                    {
                        this.ItemRender()
                    }
                </div>
                <div className="clearfix fixed flex-box">
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