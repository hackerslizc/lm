import React, { Component, PropTypes } from 'react';
import {hashHistory,Link} from 'react-router';
import { connect } from 'react-redux';
import {Promise} from 'es6-promise';
import Tappable from 'react-tappable';
import Header from '../header';


/**
 *
 * @param  {首页}
 *
 **/
class Home extends Component{

    constructor (props) {
        super(props);
    }
    componentDidMount(){
        document.getElementsByTagName('body')[0].style.paddingBottom = '80px;'
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
                    <div className="detail-bg"></div>
                    <div className="clearfix l30 f14 mt50">
                        <div className="flex-box">
                            <div className="flex-3 tr">物流公司：</div>
                            <div className="flex-4">申通快递物流</div>
                        </div>
                        <div className="flex-box">
                            <div className="flex-3 tr">单       号：</div>
                             <div className="flex-4">申通快递物流</div>
                        </div>
                        <div className="flex-box">
                            <div className="flex-3 tr">取  件 码：</div>
                             <div className="flex-4">申通快递物流</div>
                        </div>
                        <div className="flex-box">
                            <div className="flex-3 tr">到店时间：</div>
                            <div className="flex-4">申通快递物流</div>
                        </div>
                        <div className="flex-box yello-col">
                            <div className="flex-3 tr"><i className="detail-package-icon"></i>包裹状态：</div>
                            <div className="flex-4">申通快递物流</div>
                        </div>
                    </div>
                    <p className="clearfix tc yello-col l20 mt50 f16"> 温馨提示：本店主营业务互联网快递业务，
我们可以快递到您家！</p>
                    <div className="clearfix mt50">
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

export default connect(mapStateToProps)(Home);