import React, { Component, PropTypes } from 'react';
import {hashHistory,Link} from 'react-router';
import { connect } from 'react-redux';
import {Promise} from 'es6-promise';

import Tappable from 'react-tappable';

import Header from '../header';
import ListItem from '../common/listItem';
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

        }
        this.callbackFn = this.callbackFn.bind(this);
        this.selectFn = this.selectFn.bind(this);
        this.deleteFn = this.deleteFn.bind(this);
    }
    componentDidMount(){
        document.getElementsByTagName('body')[0].style.height = 'auto';
        document.getElementsByTagName('body')[0].style.backgroundColor = '#ececec';
        document.getElementsByTagName('body')[0].style.paddingBottom = '40px';
    }
    callbackFn(opt){
        console.log(opt)
    }
    submitHandler(){
        console.log('submitHandler')
    }

    selectFn(data){
        let selectArr = this.state.selectArr;
        if (data.select){
            selectArr.push(data.id);
        } else {

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
            Ele = '',
            eleArr = [];
        for (var i = 0; i < 10; i++){
            const opt = {
                id: new Date().getTime()+i,
                iconsrc: 'http://static.sto.cn/www/images/logo.png',
                orderId: '12321321d',
                takeDelivery: '',
                date: '2017-03-01',
                status: '未付款',
                count: '12'
            };
            eleArr.push(<ListItem opt={opt} key={i} selectFn={_this.selectFn} deleteFn={_this.deleteFn}></ListItem>)
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
                name:"index",
                pathname:'index'
             };
        console.log(this.state)
        return (
            <div className="clearfix">
                <Header 
                    opt={headerOpt}>
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
        // ...state.indexConfig
    }
};

export default connect(mapStateToProps)(List);