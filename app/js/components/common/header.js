import React, { Component, PropTypes } from 'react';
import { hashHistory } from 'react-router';

import { connect } from 'react-redux';
import {Promise} from 'es6-promise';
import classnames from 'classnames';

import Tappable from 'react-tappable';
import {
    toast,
    toggleLoading,
    getAccountInfo
} from '../../redux/actions';
/**
 *
 * @module {头部}
 * @param  {
 *          name：String， // 当前模块名称（有特殊需求时用到 ： 个人中心根据这个字段判断）
 *          title：String ,      // 当前页面名称
 *          showMenu：Boolean,        // 当前页面名称
 *          pathname：String        // 当前页面路径
 *     }
 *
 **/

class Header extends Component{

    constructor (props) {
        super(props);

        this.state={
            getdata:true,
            showList: false
        }

        this.backHandleFn = this.backHandleFn.bind(this);
        this.showList = this.showList.bind(this);
        this.renderHeader = this.renderHeader.bind(this);
        this.clickHancler = this.clickHancler.bind(this)
    }

    componentDidMount(){
        const {dispatch, opt} = this.props;
        //         _this = this;
        // if(opt.name != 'bind'){
            // dispatch(Ajax({
            //     type: 'post',
            //     data: {
            //         sno:10000   //10000
            //     },
            //     success: (r) => {
            //         dispatch(getAccountInfo(r.data));
            //         this.setState({
            //             token: r.data.token
            //         })
            //         callbackFn && callbackFn(r);
            //     }
            // }))
        // } else {
        //     dispatch(toggleLoading(false));
        // }
        dispatch(toggleLoading(false));
    }

    backHandleFn() {
        window.history.go(-1);
    }

    showList() {
        const showList = !this.state.showList;
        this.setState({
            showList
        })
    }

    renderHeader() {
        const {showList} = this.state;
        const {opt} = this.props;
        let ele = '';

        if (opt && opt.name === 'addresseelist') {
            ele = (<h1 className="nav-title">
                        <label className={classnames("listheader",{on: showList})} onClick={this.showList}>我的包裹</label>
                        {
                            showList && (<div className="header-list">
                                <div className="arrow-up"></div>
                                <ul>
                                    <li id="byGet" onClick={this.clickHancler}>已取件</li>
                                    <li id="byHis" onClick={this.clickHancler}>已送件</li>
                                    <li id="byNew" onClick={this.clickHancler}>待取件</li>
                                    <li id="byOut" onClick={this.clickHancler}>待送件</li>
                                </ul>
                            </div>)
                        }
                    </h1>)
        } else if (opt && opt.name === 'expresslist') {
            ele = (<h1 className="nav-title">
                        <label className={classnames("listheader",{on: showList})} onClick={this.showList}>我的包裹</label>
                        {
                            showList && (<div className="header-list">
                                <div className="arrow-up"></div>
                                <ul>
                                    <li id="byNew" onClick={this.clickHancler}>新建列表</li>
                                    <li id="byOut" onClick={this.clickHancler}>已付列表</li>
                                </ul>
                            </div>)
                        }
                    </h1>)
        } else {
            ele = (<h1 className="nav-title">
                        {opt.title ? opt.title : "邻米"}
                   </h1>)
        }

        return ele;
    }

    clickHancler(e) {
        const {showList} = this.state;
        const {requestHandler} = this.props;
        const id = e.currentTarget.id;
        this.setState({
            showList: !showList
        })

        requestHandler && requestHandler(id)

    }

    render(){

        let opt = (!!this.props.opt) ?  this.props.opt : {name:''},
            classname = (opt.name == 'member-center') ? 'nav-bar-no' : 'nav-bar';
        
            // classname = (opt.name == 'member-center') ? 'nav-bar-no bottom-line' : 'nav-bar bottom-line';
        // console.log(this.props.accountinfo);
        return (
            <header className="g-header logged-in" id="J_header">
                <div className={classname}>
                    {
                        opt.pathname == 'false' && (<div className={classnames("nav-back", "J_navBack", {gray: (opt.name == 'login')})}>
                                <Tappable
                                    href="javascript:void(0)"
                                    onClick={this.backHandleFn}
                                    component="a">
                                    返回
                                </Tappable>
                            </div>)
                    }
                    <div className="nav-title-wrap">
                        {this.renderHeader()}
                    </div>
                    {
                        false && (<div className="nav-more">
                            <Tappable
                                onTap={this.clickHancler}
                                className="header-trade-record white-col"
                                component="a">
                                <i className="header-trade-record-icon"></i>
                                <label>账单1</label>
                            </Tappable>
                        </div>)
                    }
                    
                </div>
            </header>
        )
    }
};


const mapStateToProps = (state) => {
    return { 
        loginstatus:{
            ...state.setLoginStatus
        }
    }
};

export default connect(mapStateToProps)(Header);