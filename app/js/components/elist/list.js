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
    }
    componentDidMount(){
        const body = document.getElementsByTagName('body')[0];
        body.style.height = 'auto';
        body.style.backgroundColor = '#ececec';
        body.style.paddingBottom = '40px';
    }
    callbackFn(opt){
        const _this = this;
        const body = document.getElementsByTagName('body')[0],
            {dispatch, accountinfo, location} = this.props,
            token = opt.data.token;
        this.setState({
            token: token
        });

        dispatch(remote({
            data:{
                token,
                barna: 'byNew ', //byOut
                sno: 10301
            }
        })).then((r)=>{
            console.log(r)
            if(r.err === 0){
                if( r.data.length != 0){
                    _this.setState({
                        listArr: r.data
                    })
                }
            }
        })
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
        }
        return (eleArr)
    }

    deleteFn(){
        console.log(1)
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
                    callbackFn={this.callbackFn}>
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