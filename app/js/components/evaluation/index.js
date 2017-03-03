import React, { Component, PropTypes } from 'react';
import {hashHistory,Link} from 'react-router';
import { connect } from 'react-redux';
import {Promise} from 'es6-promise';

import Tappable from 'react-tappable';

import Header from '../common/header';
import  Item from './item';
/**
 *
 * @param  {列表}
 *
 **/
class Evaluation extends Component{
    constructor (props) {
        super(props);
        this.state = {
        }
        this.callbackFn = this.callbackFn.bind(this);
    }
    componentDidMount(){
        document.getElementsByTagName('body')[0].style.backgroundColor = '#fff';
    }
    callbackFn(opt){
        // console.log(opt)
        this.setState({
            ...opt
        })
    }
    submitHandler(){
        console.log('submitHandler')
    }

    render(){
        let _this = this,
            headerOpt = {
                title:'邻米',
                name:"index",
                pathname:'index'
             };
        console.log(this.state);
        return (
            <div className="clearfix">
                <Header 
                    opt={headerOpt}>
                </Header>
                <div className="clearfix main">
                    <div className="clearfix page-sign ">
                        <p className="bigfont clearfix">取货完成</p>
                        <p className="smallfont clearfix">感谢使用邻米</p>
                    </div>
                    <p className="clearfix tc mb40">感谢您的评价：</p>
                    <Item opt={{label: '服务', id: 'server' }} 
                        callbackFn={this.callbackFn}>
                    </Item>
                    <Item opt={{label: '环境', id: 'environment' }} 
                        callbackFn={this.callbackFn}>
                    </Item>
                    <Item opt={{label: '产品', id: 'product' }} 
                        callbackFn={this.callbackFn}>
                    </Item>
                </div>
                <div className="clearfix fixed flex-box">
                    <Tappable
                        id=""
                        onTap={this.submitHandler}
                        className="btn flex-1"
                        component="a">
                        提交
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

export default connect(mapStateToProps)(Evaluation);