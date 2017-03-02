import React, { Component, PropTypes } from 'react';
import {hashHistory,Link} from 'react-router';
import { connect } from 'react-redux';
import {Promise} from 'es6-promise';
import Tappable from 'react-tappable';
import Header from '../common/header';
import Input from '../common/input';


/**
 *
 * @param  {我要寄件}
 *
 **/
class ExpressForm extends Component{

    constructor (props) {
        super(props);
    }
    componentDidMount(){
        document.getElementsByTagName('body')[0].style.backgroundColor = '#fff';
    }
    reduceFn(){
        console.log(1)
    }
    addFn(){
        console.log(2)
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
                    <Input opt={{
                        id:'captcha',
                        margint: true,
                        pagename:'bind',
                        type: 'text',
                        label: '寄件人',
                        callbackFn:_this.callbackFn}}>
                    </Input>
                    <Input opt={{
                        id:'captcha',
                        margint: true,
                        pagename:'bind',
                        type: 'text',
                        label: '收件人',
                        callbackFn:_this.callbackFn}}>
                    </Input>
                    <div className="clearfix express-form-item">
                        <div className="flex-box clearfix">
                            <label className="clearfix flex-1 justify">姓名：<span></span></label>
                            <p className="clearfix flex-2">
                                <input type="text" id="12321" className="flex-1" onChange={this.changeHandler}/>
                            </p>
                        </div>
                    </div>
                    <div className="clearfix express-form-item">
                        <div className="flex-box clearfix">
                            <label className="clearfix flex-1 justify">电话：<span></span></label>
                            <p className="clearfix flex-2">
                                <input type="tel" id="12321" className="flex-1" maxLength="11" onChange={this.changeHandler}/>
                            </p>

                        </div>
                    </div>
                    <div className="clearfix express-form-item">
                        <div className="flex-box clearfix">
                            <label className="clearfix flex-1 justify">省市：<span></span></label>
                            <p className="clearfix flex-2">
                                <input type="text" id="12321" className="flex-1" onChange={this.changeHandler}/>
                            </p>
                        </div>
                    </div>
                    <div className="clearfix express-form-item">
                        <div className="flex-box clearfix">
                            <label className="clearfix flex-1 justify">详细地址：<span></span></label>
                            <p className="clearfix flex-2">
                                <input type="text" id="12321" className="flex-1" onChange={this.changeHandler}/>
                            </p>
                        </div>
                    </div>
                    <div className="clearfix express-form-item">
                        <div className="flex-box clearfix">
                            <label className="clearfix flex-1 justify">下单数量：<span></span></label>
                            <p className="clearfix flex-2">
                                <Tappable
                                    id=""
                                    onTap={this.reduceFn}
                                    className="calculation-btn"
                                    component="a">
                                    -
                                </Tappable>
                                <span className="other-input wb">1</span>
                                <Tappable
                                    id=""
                                    onTap={this.addFn}
                                    className="calculation-btn"
                                    component="a">
                                    +
                                </Tappable>
                            </p>
                        </div>
                    </div>
                    
                    <div className="clearfix express-form-item">
                        <div className="flex-box clearfix">
                            <label className="clearfix flex-1 justify">预估重量：<span></span></label>
                            <p className="clearfix flex-2">
                                <Tappable
                                    id=""
                                    onTap={this.addFn}
                                    className="calculation-btn"
                                    component="a">
                                    1KG
                                </Tappable>
                                <Tappable
                                    id=""
                                    onTap={this.addFn}
                                    className="calculation-btn"
                                    component="a">
                                    2KG
                                </Tappable>
                                <input className="other-input wb" type="tel"/>
                                <label className="other-input yb" >KG</label>
                            </p>
                        </div>
                    </div>
                    <div className="clearfix express-form-item">
                        <div className="flex-box clearfix">
                            <label className="clearfix flex-1 justify">物品类型：<span></span></label>
                            <p className="clearfix flex-2">
                            </p>
                        </div>
                        <div className="clearfix type-box">
                            <Tappable
                                id=""
                                onTap={this.selectTypeFn}
                                className="calculation-btn"
                                component="a">
                                文件
                            </Tappable>
                            <Tappable
                                id=""
                                onTap={this.selectTypeFn}
                                className="calculation-btn"
                                component="a">
                                数码
                            </Tappable>
                            <Tappable
                                id=""
                                onTap={this.selectTypeFn}
                                className="calculation-btn"
                                component="a">
                                生活用品
                            </Tappable>
                            <Tappable
                                id=""
                                onTap={this.selectTypeFn}
                                className="calculation-btn"
                                component="a">
                                服饰
                            </Tappable>
                            <Tappable
                                id=""
                                onTap={this.selectTypeFn}
                                className="calculation-btn"
                                component="a">
                                食品
                            </Tappable>
                            <Tappable
                                id=""
                                onTap={this.selectTypeFn}
                                className="calculation-btn"
                                component="a">
                                酒类
                            </Tappable>
                        </div>
                    </div>


                    <div className="clearfix mt50">
                        <Tappable
                            id=""
                            onTap={this.onStoreFn}
                            className="btn flex-1"
                            component="a">
                            确认
                        </Tappable>
                    </div>
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

export default connect(mapStateToProps)(ExpressForm);