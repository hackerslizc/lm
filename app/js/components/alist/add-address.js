import React, { Component, PropTypes } from 'react';
import {hashHistory,Link} from 'react-router';
import { connect } from 'react-redux';
import {Promise} from 'es6-promise';

import Tappable from 'react-tappable';

import Header from '../common/header';
import ListItem from '../common/addItem';
import LocationSelect from '../common/location-select';
import {
    toast,
    remote
} from '../../redux/actions/';
/**
 *
 * @param  {地址列表}
 *
 **/
class AddAddress extends Component{
    constructor (props) {
        super(props);
        const _this = this,
                 {location} = this.props,
                 name = (location.state.type === 'edit' ? location.state.param.name : ''),
                 mobile = (location.state.type === 'edit' ? location.state.param.mobile : ''),
                 place = (location.state.type === 'edit' ? location.state.param.place : ''),
                 address = (location.state.type === 'edit' ? location.state.param.address : ''),
                 isdefault = (location.state.type === 'edit' ? location.state.param.isDefault : false);

        this.state = {
            name: name,
            mobile: mobile,
            place: place,
            address: address,
            isdefault: isdefault
        };
        this.changeVal = this.changeVal.bind(this);
        this.onSubmitFn = this.onSubmitFn.bind(this);
        this.onVerificationFn = this.onVerificationFn.bind(this)
    }
    componentDidMount(){
        let body = document.getElementsByTagName('body')[0];
        body.style.height = 'auto';
        body.style.backgroundColor = '#fff';
        document.getElementsByClassName('main')[0].style.paddingTop = '0px';
    }

    setDefaultFn(e){
        this.setState({
            isdefault: !e.currentTarget.classList.contains('on')
        })
    }

    changeVal(e){
        // console.log(e.currentTarget.id, e.currentTarget.value);
        let data = {};
        data[e.currentTarget.id] = e.currentTarget.value;
        this.setState(data);
    }

    onVerificationFn(){
        const {dispatch} = this.props;
        
        const {name, mobile, place, address} = this.state;
        let valid = false;
        if (name == ''){
            valid = false;
            dispatch(toast("姓名错误，请重新填写"))
        } else if(mobile == '' && mobile.length){
            valid = false;
            dispatch(toast("手机号错误，请重新填写"))
        } else if(place == ''){
            valid = false;
            dispatch(toast("所在地区不错误，请重新填写"))
        } else if(address == ''){
            valid = false;
            dispatch(toast("详细地址错误，请重新填写"))
        } else {
            valid = true;
        } 

        valid && this.onSubmitFn()
    }

    onSubmitFn(){
        const {name, mobile, place, address} = this.state;
        const {dispatch, location} = this.props;
        let data = {
            agena: name ,
            ageph: mobile,
            provn : 'provn' ,
            cityn : 'cityn' ,
            distn : 'distn' ,
            stren : 0,
            builn: 0,
            unitn: 0,
            housn: 0,
            zonen: address
        };
        // if(){
        //     data: {
        //         dosql:"provn='江苏',cityn='南京',distn='雨花台',zonen='中山陵广场235号'"
        //     }
            
        // }
        dispatch(remote({
            data: {
                addnr: data.id,
                sno: location.state.type === 'edit' ? 10086 : 10085,
                appno:2801000,
                asn:9034087,
                aot:9034087
            }
        })).then((r) => {
            console.log(r.msg)
        })
    }

    changePlace(){

    }

    render(){
        let _this = this,
            {name, mobile, place, address } = this.state,
            headerOpt = {
                title:_this.props.location.state.type === 'edit' ? '编辑地址' : '新增地址',
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
                            <input type="text" id="name" onChange={this.changeVal} defaultValue={name} placeholder="姓名"/>
                        </div>
                        <div className="add-address-form">
                            <i className="icon mobile"></i>
                            <input type="tel" id="mobile" onChange={this.changeVal} defaultValue={mobile} maxLength="11" placeholder="电话"/>
                        </div>
                        <div className="add-address-form">
                            <i className="icon location"></i>
                            <Tappable
                                id="place"
                                type="text" 
                                onTap={this.changePlace.bind(this)}
                                onChange={this.changeVal} 
                                defaultValue={place} 
                                placeholder="所在地区"
                                component="input">
                            </Tappable>
                            
                                <LocationSelect />
                        </div>
                        <div className="add-address-form">
                            <i className="icon no"></i>
                            <input type="text" id="address" onChange={this.changeVal} defaultValue={address} placeholder="街道、楼盘号"/>
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
                        <div className="add-address-form">
                            <LocationSelect />
                        </div>
                    </div>
                </div>
                <div className="clearfix fixed flex-box">
                    <Tappable
                        id=""
                        onTap={this.onVerificationFn}
                        className="list-btn add flex-1"
                        component="a">
                        {this.props.location.state.type === 'edit' ? '保存' : '新建地址'}
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