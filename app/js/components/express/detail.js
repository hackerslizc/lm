import React, { Component, PropTypes } from 'react';
import {hashHistory,Link} from 'react-router';
import { connect } from 'react-redux';
import {Promise} from 'es6-promise';
import Tappable from 'react-tappable';
import Header from '../common/header';
import {
    Ajax,
    GetPackageList
} from '../../redux/actions';

/**
 *
 * @param  {首页}
 *
 **/
class ExpressDetail extends Component{

    constructor (props) {
        super(props);
        this.state = {
            data: {}
        };
        this.onStoreFn = this.onStoreFn.bind(this)
    }

    componentWillMount(){
        const {dispatch, location: {state: {ordnr}}} = this.props;
        dispatch(Ajax({
            data: {
                sno: 10303,
                ordnr
            },
            success: (r) => {
                // alert(JSON.stringify(r))
                this.setState({
                    data: r.data
                })
            }
        }))
    }

    componentDidMount(){
        document.getElementsByTagName('body')[0].style.paddingBottom = '40px;'
    }
    
    getState(status) {
        let ostat = '';
        if(status === 0){
            ostat = '新建'
        } else if (status === 1) {
            ostat = '待取件'
        } else if (status === 2) {
            ostat = '核价中'
        } else if (status === 8) {
            ostat = '已核价（待付款）'
        } else if (status === 16) {
            ostat = '已付款（待发件）'
        } else if (status === 32) {
            ostat = '已发件'
        } else if (status === 128) {
            ostat = '已完成'
        }
        return ostat
    }

    onStoreFn(){
        const {dispatch} = this.props;
        console.log(this.props);
    }

    render(){
        const {data: { posnt, ordnr, smsvc, creda, ostat, paktn, getna, getph, getad }} = this.state,
                 state = this.getState(ostat);
        console.log(this.props.location.state);
        return (
            <div className="clearfix">
                <Header opt={{
                    title:'寄件详情',
                    name:"detail",
                    pathname:'detail'}}>
                </Header>
                <div className="clearfix main">
                    <div className="detail-bg"></div>
                    <div className="clearfix l30 f14 mt50">
                        <div className="flex-box">
                            <div className="flex-3 tr">收件人：</div>
                            <div className="flex-4">{getna}</div>
                        </div>
                        <div className="flex-box">
                            <div className="flex-3 tr">收件人电话：</div>
                            <div className="flex-4">{getph}</div>
                        </div>
                        <div className="flex-box">
                            <div className="flex-3 tr">单号：</div>
                             <div className="flex-4">{ordnr}</div>
                        </div>
                        <div className="flex-box">
                            <div className="flex-3 tr">收件人地址：</div>
                             <div className="flex-4">{getad}</div>
                        </div>
                        <div className="flex-box">
                            <div className="flex-3 tr">寄件时间：</div>
                            <div className="flex-4">{creda}</div>
                        </div>
                        <div className="flex-box">
                            <div className="flex-3 tr">物流公司：</div>
                            <div className="flex-4">{posnt}</div>
                        </div>
                        <div className="flex-box">
                            <div className="flex-3 tr">包裹类型：</div>
                             <div className="flex-4">{paktn}</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};


const mapStateToProps = (state) => {
    // console.log(state.indexConfig)
    return {
        accountinfo:{
            ...state.setAccountInfo
        }
    }
};

export default connect(mapStateToProps)(ExpressDetail);