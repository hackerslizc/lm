import React, { Component, PropTypes } from 'react';
import {hashHistory,Link} from 'react-router';
import { connect } from 'react-redux';
import {Promise} from 'es6-promise';
import Tappable from 'react-tappable';
import classnames from 'classnames'
import Header from '../common/header';
import Input from '../common/input';
import LocationSelect from '../common/location-select';
import {returnAddr} from '../../common/Util';
import {
    toast,
    Ajax
} from '../../redux/actions/';
/**
 *
 * @param  {我要寄件}
 *
 **/
class ExpressForm extends Component{
    constructor (props) {
        super(props);
        const {name, mobile, place, address, provn, cityn, distn} = this.props.addressee;

        this.state = {
            // token: '',
            name: name ? name : '',
            mobile: mobile ? mobile : '',
            provn: provn ? provn : '',
            cityn: cityn ? cityn : '',
            distn: distn ? distn : '',
            locan: address ? address : '',
            zonen: address ? address : '',
            count: 1,
            prewn: 0,
            paktn: ''
        };
        this.headercallbackFn = this.headercallbackFn.bind(this);
        this.callbackFn = this.callbackFn.bind(this);
        this.reduceFn = this.reduceFn.bind(this);
        this.addFn = this.addFn.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
        this.selectTypeFn = this.selectTypeFn.bind(this);
        this.onSubmitFn = this.onSubmitFn.bind(this);
        this.onVerificationFn = this.onVerificationFn.bind(this);
        this.changeWeight = this.changeWeight.bind(this);
    }
    componentDidMount(){
        const body = document.getElementsByTagName('body')[0];
        body.style.backgroundColor = '#fff';
        body.style.paddingBottom = '0px';
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
        // this.setState({
        //     token: r.data.token
        // })
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
            prewn:  e.currentTarget.id
        });
    }

    onVerificationFn(){
        const {dispatch} = this.props;
        
        const { name, mobile, place, address, 
            provn, cityn, distn, prewn, paktn} = this.state;
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
        }  else if(prewn == 0){
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
        const {name, mobile, place, address, provn, cityn, distn, paktn, prewn, count} = this.state;
        const {sender} = this.props;
        const {dispatch, location} = this.props;

        // alert(JSON.stringify(sender))

        let sourcesdata = {},
            targetdata = {
                // token,
                sname: sender.name,
                sphon: sender.mobile ,
                sprov: sender.provn,
                scity: sender.cityn ,
                sdist: sender.distn ,
                saddr: sender.address ,
                gname: name ,
                gphon: mobile,
                gprov: provn,
                gcity: cityn,
                gdist: distn,
                gaddr: address,
                pakns: count,
                paktn: paktn,
                prewn: prewn,
                savev : 0
            };
        const type = true;
        targetdata = Object.assign(sourcesdata, targetdata, {
            sno: type ? 10304 : 10305
        });

        // alert(JSON.stringify(targetdata));

        dispatch(Ajax({
            data: targetdata,
            success: (r) => {
                hashHistory.push({
                    pathname: '/express-result',
                    state: {
                        mobile,
                        mobile,
                        address
                    }
                });
            },
            error: (r) => {
                dispatch(toast(r.msg || "提交失败，请重试")) 
            }
        }))
    }

    render(){
        let _this = this,
            {name, mobile, provn, cityn, distn, zonen, prewn, paktn } = this.state,
            sendername = this.props.sender.name;

        return (
            <div className="clearfix">
                <Header 
                    opt={{
                        title:'邻米',
                        name:"index",
                        pathname:'index'
                    }}
                    callbackFn={this.headercallbackFn}>
                </Header>
                <div className="clearfix main">
                    <Link className="clearfix flex-box formItem bind"
                        to={{
                            pathname: '/choose-address',
                            state:{
                                type: 'sender'
                            }
                        }}>
                        <label className="clearfix label">寄件人</label>
                        <p className="clearfix flex-1">
                            {sendername ? sendername : (<span className="gray-col">请选择寄件人</span>)}
                        </p>
                    </Link>
                    <div className="mt10"></div>
                    <Link className="clearfix flex-box formItem bind"
                        to={{
                            pathname: '/choose-address',
                            state:{
                                type: 'addressee'
                            }
                        }}>
                        <label className="clearfix label">收件人</label>
                        <p className="clearfix flex-1">
                            {name !== '' ? name : (<span className="gray-col">请选择收件人</span>)}
                        </p>
                    </Link>
                    <div className="clearfix express-form-item">
                        <div className="flex-box clearfix">
                            <label className="clearfix flex-1 justify">姓名：<span></span></label>
                            <p className="clearfix flex-2">
                                <input type="text" id="name" className="flex-1" defaultValue={name} onChange={this.changeHandler}/>
                            </p>
                        </div>
                    </div>
                    <div className="clearfix express-form-item">
                        <div className="flex-box clearfix">
                            <label className="clearfix flex-1 justify">电话：<span></span></label>
                            <p className="clearfix flex-2">
                                <input type="tel" id="mobile" className="flex-1" maxLength="11" defaultValue={mobile} onChange={this.changeHandler}/>
                            </p>
                        </div>
                    </div>
                    <div className="clearfix express-form-item">
                        <div className="flex-box clearfix">
                            <label className="clearfix flex-1 justify">省市：<span></span></label>
                            <div className="clearfix flex-2 pr">
                                <LocationSelect style={{left: '0px'}} defaultLocation={{
                                    province: provn,
                                    city: cityn,
                                    area: distn
                                }} callbackFn={this.callbackFn}/>
                            </div>
                        </div>
                    </div>
                    <div className="clearfix express-form-item">
                        <div className="flex-box clearfix">
                            <label className="clearfix flex-1 justify">详细地址：<span></span></label>
                            <p className="clearfix flex-2">
                                <input type="text" id="address" className="flex-1" defaultValue={zonen} onChange={this.changeHandler}/>
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
                                    onClick={this.changeWeight}
                                    className="calculation-btn"
                                    component="a">
                                    1KG
                                </Tappable>
                                <Tappable
                                    id="2"
                                    onClick={this.changeWeight}
                                    className="calculation-btn"
                                    component="a">
                                    2KG
                                </Tappable>
                                <input className="other-input wb" 
                                    type="tel"
                                    id="prewn" 
                                    data-id="input"
                                    placeholder={prewn} 
                                    value={prewn}
                                    onChange={this.changeHandler} />
                                <label className="other-input yb">KG</label>
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
                                className={classnames("calculation-btn", {yellocol: (paktn==='信件')})}
                                component="a">
                                文件
                            </Tappable>
                            <Tappable
                                name="数码"
                                onTap={this.selectTypeFn}
                                className={classnames("calculation-btn", {yellocol: (paktn==='数码')})}
                                component="a">
                                数码
                            </Tappable>
                            <Tappable
                                name="生活用品"
                                onTap={this.selectTypeFn}
                                className={classnames("calculation-btn", {yellocol: (paktn==='生活用品')})}
                                component="a">
                                生活用品
                            </Tappable>
                            <Tappable
                                name="服饰"
                                onTap={this.selectTypeFn}
                                className={classnames("calculation-btn", {yellocol: (paktn==='服饰')})}
                                component="a">
                                服饰
                            </Tappable>
                            <Tappable
                                name="食品"
                                onTap={this.selectTypeFn}
                                className={classnames("calculation-btn", {yellocol: (paktn==='食品')})}
                                component="a">
                                食品
                            </Tappable>
                            <Tappable
                                name="酒类"
                                onTap={this.selectTypeFn}
                                className={classnames("calculation-btn", {yellocol: (paktn==='酒类')})}
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
    return {
        sender: {
            ...state.setsender
        },
        addressee: {
            ...state.setaddressee
        }
    }
};


export default connect(mapStateToProps)(ExpressForm);