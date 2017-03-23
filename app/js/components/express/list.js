import React, { Component, PropTypes } from 'react';
import {hashHistory,Link} from 'react-router';
import { connect } from 'react-redux';
import {Promise} from 'es6-promise';

import Tappable from 'react-tappable';

import Header from '../common/header';
import ListItem from '../common/expresslistItem';
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
        this.clickHandler = this.clickHandler.bind(this);
        this.getList = this.getList.bind(this);
    }
    componentWillMount(){
        const body = document.getElementsByTagName('body')[0];
        body.style.backgroundColor = '#ececec';
        body.style.paddingBottom = '80px';
        this.getList();
    }
    callbackFn(opt){
        // const {token} = opt.data;
        // this.setState({
        //     token: token
        // });
        // token && 
    }
    
    getList(type = 'byNew'){
        const _this = this;
        const {dispatch, accountinfo, location} = this.props,
            {token} = this.state;
        
        dispatch(Ajax({
            data:{
                barna: type, //byOut
                sno: 10301
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
                eleArr.push(<ListItem opt={opt} key={i}></ListItem>)
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

    
    clickHandler(){
        hashHistory.push('/express-add')
    }

    render(){
        let _this = this;
        return (
            <div className="clearfix">
                <Header opt={{
                        title:'邻米',
                        name:"expresslist",
                        pathname:'expresslist',
                        getUserInfo: true
                     }} 
                    callbackFn={this.callbackFn}
                    requestHandler={this.getList}>
                </Header>
                <div className="clearfix main list">
                    {
                        this.ItemRender()
                    }
                </div>
                <div className="clearfix fixed flex-box">
                    <Tappable
                        id=""
                        onTap={this.clickHandler}
                        className="list-btn flex-1 home"
                        component="a">我要寄件
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