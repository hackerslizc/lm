import React, { Component, PropTypes } from 'react';
import {hashHistory,Link} from 'react-router';
import { connect } from 'react-redux';
import {Promise} from 'es6-promise';

import Tappable from 'react-tappable';

import Header from '../common/header';
import ListItem from '../common/addItem';
/**
 *
 * @param  {地址列表}
 *
 **/
class AddAddress extends Component{
    constructor (props) {
        super(props);
        this.state = {
            name: '',
            mobile: '',
            location: '',
            isdefault: false
        };
        this.changeVal = this.changeVal.bind(this);
    }
    componentDidMount(){
        document.getElementsByTagName('body')[0].style.height = 'auto';
        document.getElementsByTagName('body')[0].style.backgroundColor = '#fff';
        document.getElementsByClassName('main')[0].style.paddingTop = '0px';
    }

    setDefaultFn(e){
        this.setState({
            isdefault: !e.currentTarget.classList.contains('on')
        })
    }

    changeVal(e){

    }

    render(){
        let _this = this,
            headerOpt = {
                title:'新增地址',
                name:"address",
                pathname:'add-address'
             };
        console.log(this.state)
        return (
            <div className="clearfix">
                <Header 
                    opt={headerOpt}>
                </Header>
                <div className="clearfix main">
                    <div className="add-address-bg"></div>
                    <div className="clearfix mt30">
                        <div className="add-address-form">
                            <i className="icon name"></i>
                            <input type="text" id="" onChange={this.changeVal} placeholder="姓名"/>
                        </div>
                        <div className="add-address-form">
                            <i className="icon mobile"></i>
                            <input type="tel" id="" onChange={this.changeVal} maxLength="11" placeholder="电话"/>
                        </div>
                        <div className="add-address-form">
                            <i className="icon location"></i>
                            <input type="text" id="" onChange={this.changeVal} placeholder="所在地区"/>
                        </div>
                        <div className="add-address-form">
                            <i className="icon no"></i>
                            <input type="text" id="" onChange={this.changeVal} placeholder="街道、楼盘号"/>
                        </div>
                        <div className="add-address-form">
                            <Tappable
                                id=""
                                onTap={this.setDefaultFn.bind(this)}
                                className={this.state.isdefault ? "default on" :  "default"}
                                component="a">
                                设为默认地址
                            </Tappable>
                            <input type="text" placeholder="注：每次下单使用该地址" disabled />
                        </div>
                    </div>
                </div>
                <div className="clearfix fixed flex-box">
                    <Tappable
                        id=""
                        onTap={this.onStoreFn}
                        className="list-btn add flex-1"
                        component="a">
                        新建地址+
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

export default connect(mapStateToProps)(AddAddress);