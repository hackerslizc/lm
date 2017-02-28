import React, { Component, PropTypes } from 'react';
import {hashHistory,Link} from 'react-router';
import { connect } from 'react-redux';
import {Promise} from 'es6-promise';

import Tappable from 'react-tappable';

import Header from '../header';
import ListItem from '../common/listItem';
/**
 *
 * @param  {绑定页面}
 *
 **/
class List extends Component{

    constructor (props) {
        super(props);
        this.state = {

        }
        this.callbackFn = this.callbackFn.bind(this);
    }
    componentDidMount(){
        document.getElementsByTagName('body')[0].style.backgroundColor = '#ececec'
    }
    callbackFn(opt){
        console.log(opt)
    }
    submitHandler(){
        console.log('submitHandler')
    }

    ItemRender(){
        let Ele = '';
        const opt = {
            orderNo:'12312321',
            orderIconURL:'http://static.sto.cn/www/images/logo.png',
            orderDesc:'12321321dassdsadsadsadsa',
            goodsList:{
                length:9
            },
            status:'已付款',
            sum:'10209',
        };

        return (<ListItem opt={opt}></ListItem>)
    }

    render(){
        let _this = this,
            headerOpt = {
                title:'邻米',
                name:"index",
                pathname:'index'
             };
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
                <div className="clearfix fixed">
                    <Tappable
                        id=""
                        onTap={this.selectFn}
                        className="list-order-"
                        component="a">
                        送货上门
                    </Tappable>
                    <Tappable
                        id=""
                        onTap={this.selectFn}
                        className="list-order"
                        component="a">
                        到店自提
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