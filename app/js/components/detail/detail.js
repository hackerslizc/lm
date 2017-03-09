import React, { Component, PropTypes } from 'react';
import {hashHistory,Link} from 'react-router';
import { connect } from 'react-redux';
import {Promise} from 'es6-promise';
import Tappable from 'react-tappable';
import Header from '../common/header';
import {
    remote,
    GetPackageList
} from '../../redux/actions';

/**
 *
 * @param  {首页}
 *
 **/
class Home extends Component{

    constructor (props) {
        super(props);
        this.onStoreFn = this.onStoreFn.bind(this)
    }
    componentDidMount(){
        document.getElementsByTagName('body')[0].style.paddingBottom = '80px;'
    }
    
    getState(status) {
        let ostat = '';
        if(status === 0){
            ostat = '自提'
        } else if (status === 1) {
            ostat = '待付款'
        } else if (status === 2) {
            ostat = '已付款'
        } else if (status === 4) {
            ostat = '已派单'
        } else if (status === 8) {
            ostat = '已出库'
        } else if (status === 16) {
            ostat = '多次派送'
        } else if (status === 32) {
            ostat = '电子签收'
        } else if (status === 64) {
            ostat = '本人签收'
        } else if (status === 128) {
            ostat = '他人代签'
        }
        return ostat
    }

    onStoreFn(){
        const {dispatch} = this.props;
        // dispatch(remote({
        //     data:{
        //         10221
        //     }
        // })).then((r) => {
        //     console.log(r)
        // })
        // 
        console.log(this.props);
    }  

    render(){
        const {posnt, ordnr, smsvc, inpda, ostat } = this.props.location.state,
                 state = this.getState(ostat);
        let _this = this,
             headerOpt = {
                title:'邻米',
                name:"detail",
                pathname:'detail'
             };
        return (
            <div className="clearfix">
                <Header 
                    opt={headerOpt}>
                </Header>
                <div className="clearfix main">
                    <div className="detail-bg"></div>
                    <div className="clearfix l30 f14 mt50">
                        <div className="flex-box">
                            <div className="flex-3 tr">物流公司：</div>
                            <div className="flex-4">{posnt}</div>
                        </div>
                        <div className="flex-box">
                            <div className="flex-3 tr">单       号：</div>
                             <div className="flex-4">{ordnr}</div>
                        </div>
                        <div className="flex-box">
                            <div className="flex-3 tr">取  件 码：</div>
                             <div className="flex-4">{smsvc}</div>
                        </div>
                        <div className="flex-box">
                            <div className="flex-3 tr">到店时间：</div>
                            <div className="flex-4">{inpda}</div>
                        </div>
                        <div className="flex-box yello-col">
                            <div className="flex-3 tr"><i className="detail-package-icon"></i>包裹状态：</div>
                            <div className="flex-4">{state}</div>
                        </div>
                    </div>
                    <p className="clearfix tc yello-col l20 mt50 f16"> 温馨提示：本店主营业务互联网快递业务，
我们可以快递到您家！</p>
                    {
                        ostat === 1 && (<div className="clearfix mt50">
                            <Tappable
                                id=""
                                onTap={this.onStoreFn}
                                className="round-btn flex-1"
                                component="a">
                                到店自提
                            </Tappable>
                            <Tappable
                                id=""
                                onTap={this.onStoreFn}
                                className="round-btn flex-1"
                                component="a">
                                2元送货上门
                            </Tappable>
                        </div>)
                    }
                    
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

export default connect(mapStateToProps)(Home);