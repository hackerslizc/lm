import React, { Component, PropTypes } from 'react';
import {hashHistory,Link} from 'react-router';
import { connect } from 'react-redux';
import {Promise} from 'es6-promise';

import Tappable from 'react-tappable';

import Header from '../header';
import ListItem from '../common/addItem';
/**
 *
 * @param  {地址列表}
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
                name: '张女士',
                mobile: '15982316112',
                address: '成都市成华区八里桥路水武街75号',
                isDefault: false,
            };
            eleArr.push(<ListItem opt={opt} 
                key={i} 
                defaultFn={_this.selectFn} 
                selectFn={_this.selectFn} 
                deleteFn={_this.deleteFn}>
            </ListItem>)
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
                title:'新增地址',
                name:"address",
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
                        onTap={this.onStoreFn}
                        className="list-but flex-1"
                        component="a">
                        新增地址
                    </Tappable>
                </div>
            </div>
        )
    }
};


const mapStateToProps = (state) => {
    // console.log(state.indexConfig)
    return {
        ...state.indexConfig
    }
};

export default connect(mapStateToProps)(List);