import React, { Component, PropTypes } from 'react';
import {hashHistory,Link} from 'react-router';
import { connect } from 'react-redux';
import {Promise} from 'es6-promise';
import Tappable from 'react-tappable';
import Header from '../common/header';
import Input from '../common/input';
import LocationSelect from '../common/location-select';
import wx from 'weixin-js-sdk'
import {
    toast,
    remote
} from '../../redux/actions/';
/**
 *
 * @param  {我要寄件}
 *
 **/
class ExpressForm extends Component{

    constructor (props) {
        super(props);
        this.state = {
            token: '',
            name:'',
            mobile:'',
            provn: '',
            cityn: '',
            distn: '',
            count: 1,
            weight: 0,
            paktn: '',
        };
        this.headercallbackFn = this.headercallbackFn.bind(this);
        this.callbackFn = this.callbackFn.bind(this);
        this.reduceFn = this.reduceFn.bind(this);
        this.addFn = this.addFn.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
        this.selectTypeFn = this.selectTypeFn.bind(this);
        this.onSubmitFn = this.onSubmitFn.bind(this);
        this.onVerificationFn = this.onVerificationFn.bind(this);
        this.changeWeight = this.changeWeight.bind(this)
    }
    componentDidMount(){

        console.log(wx);
        document.getElementsByTagName('body')[0].style.backgroundColor = '#fff';
    }
    reduceFn(){
        const {count} = this.state;
        if(count === 1) return false;
        this.setState({
            count: count - 1
        })
    }
    addFn(){
        const {count} = this.state;
        this.setState({
            count: count + 1
        })
    }

    callbackFn(data) {
        this.setState({
            provn: data.province,
            cityn: data.city,
            distn: data.area
        })
    }

    headercallbackFn(r){
        this.setState({
            token: r.data.token
        })
    }

    changeHandler(e){
        let data = {};
        data[e.currentTarget.id] = e.currentTarget.value;
        this.setState(data);
    }

    selectTypeFn(e){
        this.setState({
            paktn:  e.currentTarget.name
        });
    }

    changeWeight(e) {
        this.setState({
            weight:  e.currentTarget.id
        });
    }

    onVerificationFn(){
        const {dispatch} = this.props;
        
        const { name, mobile, place, address, 
            provn, cityn, distn, weight, paktn} = this.state;
        let valid = false;
        if (name == ''){
            valid = false;
            dispatch(toast("姓名错误，请重新填写"))
        } else if(!(/^1[3578]\d{9}$/.test(mobile))){
            valid = false;
            dispatch(toast("手机号错误，请重新填写"))
        } else if(address == ''){
            valid = false;
            dispatch(toast("详细地址错误，请重新填写"))
        }  else if(weight == 0){
            valid = false;
            dispatch(toast("包裹重量错误，请重新填写"))
        }  else if(paktn == ''){
            valid = false;
            dispatch(toast("请选择文件类型"))
        } else {
            valid = true;
        } 

        valid && this.onSubmitFn()
    }

    onSubmitFn(){
        const {name, mobile, place, address, provn, cityn, distn, token} = this.state;

        const {dispatch, location} = this.props;

        let sourcesdata = {},
            targetdata = {
                token,
                agena: name ,
                ageph: mobile,
                provn,
                cityn,
                distn,
                stren : 0,
                builn: 0,
                unitn: 0,
                housn: 0,
                zonen: address
            };
        if(location.state.type === 'edit'){
            sourcesdata = {
                ordnr:location.state.param.id,
            };
        }

        targetdata = Object.assign(targetdata, sourcesdata, {
            sno: 10305,
            appno:2801000,
            asn:9034087,
            aot:9034087
        });

        dispatch(remote({
            data: targetdata
        })).then((r) => {
            dispatch(toast("修改"+r.msg));
            window.location.reload()
        })
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
                    opt={headerOpt}
                    callbackFn={this.headercallbackFn}>
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
                                <input type="text" id="name" className="flex-1" onChange={this.changeHandler}/>
                            </p>
                        </div>
                    </div>
                    <div className="clearfix express-form-item">
                        <div className="flex-box clearfix">
                            <label className="clearfix flex-1 justify">电话：<span></span></label>
                            <p className="clearfix flex-2">
                                <input type="tel" id="mobile" className="flex-1" maxLength="11" onChange={this.changeHandler}/>
                            </p>

                        </div>
                    </div>
                    <div className="clearfix express-form-item">
                        <div className="flex-box clearfix">
                            <label className="clearfix flex-1 justify">省市：<span></span></label>
                            <div className="clearfix flex-2 pr">
                                <LocationSelect style={{left: '0px'}} callbackFn={this.callbackFn}/>
                            </div>
                        </div>
                    </div>
                    <div className="clearfix express-form-item">
                        <div className="flex-box clearfix">
                            <label className="clearfix flex-1 justify">详细地址：<span></span></label>
                            <p className="clearfix flex-2">
                                <input type="text" id="address" className="flex-1" onChange={this.changeHandler}/>
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
                                <span className="other-input wb">{this.state.count}</span>
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
                                    id="1"
                                    onTap={this.changeWeight}
                                    className="calculation-btn"
                                    component="a">
                                    1KG
                                </Tappable>
                                <Tappable
                                    id="2"
                                    onTap={this.changeWeight}
                                    className="calculation-btn"
                                    component="a">
                                    2KG
                                </Tappable>
                                <input className="other-input wb" id="weight" onChange={this.changeHandler} type="tel"/>
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
                                name="信件"
                                onTap={this.selectTypeFn}
                                className="calculation-btn"
                                component="a">
                                文件
                            </Tappable>
                            <Tappable
                                name="数码"
                                onTap={this.selectTypeFn}
                                className="calculation-btn"
                                component="a">
                                数码
                            </Tappable>
                            <Tappable
                                name="生活用品"
                                onTap={this.selectTypeFn}
                                className="calculation-btn"
                                component="a">
                                生活用品
                            </Tappable>
                            <Tappable
                                name="服饰"
                                onTap={this.selectTypeFn}
                                className="calculation-btn"
                                component="a">
                                服饰
                            </Tappable>
                            <Tappable
                                name="食品"
                                onTap={this.selectTypeFn}
                                className="calculation-btn"
                                component="a">
                                食品
                            </Tappable>
                            <Tappable
                                name="酒类"
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
                            onTap={this.onVerificationFn}
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
    return {}
};

export default connect(mapStateToProps)(ExpressForm);