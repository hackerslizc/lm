import React, { Component, PropTypes } from 'react';
import {hashHistory,Link} from 'react-router';
import { connect } from 'react-redux';
import {Promise} from 'es6-promise';
import Tappable from 'react-tappable';
import Header from '../common/header';
import {
    remote
} from '../../redux/actions';

/**
 *
 * @param  {个人二维码}
 *
 **/

class QRcode extends Component{
    constructor (props) {
        super(props);
        this.state = {
            qrcode: '',
            cardnumber:''
        };
        this.callbackFn = this.callbackFn.bind(this)
    }
    componentDidMount(){
        const body = document.getElementsByTagName('body')[0];
        body.style.height = 'auto';
        body.style.backgroundColor = '#f2f1f1';
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
                // token,
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

    render(){
        let _this = this,
            headerOpt = {
                title:'邻米',
                name:"qrcode",
                pathname:'qrcode',
                getUserInfo: true
             };
        return (
            <div className="clearfix">
                <Header 
                    opt={headerOpt}
                    callbackFn={this.callbackFn}>
                </Header>
                <div className="clearfix tc">
                    <div className="qrcode-bg"></div>
                    <div>
                        <p className="yellocol">邻米电子会员卡</p>
                        <img src={this.state.qrcode} className="qrcode"/>
                        <p>卡号：{this.state.cardnumber}</p>
                    </div>
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

export default connect(mapStateToProps)(QRcode);