import React, { Component, PropTypes } from 'react';
import { hashHistory } from 'react-router';

import { connect } from 'react-redux';
import {Promise} from 'es6-promise';
import classnames from 'classnames';

import Tappable from 'react-tappable';
import {
    toast,
    toggleLoading,
    getpackageList,
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
            showList: false,
            type: ''
        }

        this.backHandleFn = this.backHandleFn.bind(this);
        this.showList = this.showList.bind(this);
        this.renderHeader = this.renderHeader.bind(this);
        this.clickHandler = this.clickHandler.bind(this)
    }

    componentDidMount(){
        const {dispatch, opt} = this.props;
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
        const {showList, type} = this.state;
        const {opt} = this.props;
        let ele = '', title = '';

        if (type === 'byNew') {
            title = '待取件列表'
        } else if (type === 'byGet') {
            title = '已取件列表'
        } else if (type === 'byOut') {
            title = '待送件列表'
        }  else if (type === 'byHis') {
            title = '已送件列表'
        }  else {
            title = '收件列表'
        }

        if (opt && opt.name === 'addresseelist') {
            ele = (<h1 className="nav-title">
                        <label className={classnames("listheader",{on: showList})} onClick={this.showList}>{title}</label>
                        {
                            showList && (<div className="header-list">
                                <div className="arrow-up"></div>
                                <ul>
                                    <li id="byNew" className={classnames({
                                        active: type === 'byNew'
                                    })} onClick={this.clickHandler}>待取件</li>
                                    <li id="byOut" className={classnames({
                                        active: type === 'byOut'
                                    })} onClick={this.clickHandler}>待送件</li>
                                    <li id="byGet" className={classnames({
                                        active: type === 'byGet'
                                    })} onClick={this.clickHandler}>已取件</li>
                                    <li id="byHis" className={classnames({
                                        active: type === 'byHis'
                                    })} onClick={this.clickHandler}>已送件</li>
                                </ul>
                            </div>)
                        }
                    </h1>)
        } else if (opt && opt.name === 'expresslist') {
            ele = (<h1 className="nav-title">
                        <label className={classnames("listheader",{on: showList})} onClick={this.showList}>寄件列表</label>
                        {
                            showList && (<div className="header-list">
                                <div className="arrow-up"></div>
                                <ul>
                                    <li id="byNew" className={classnames({
                                        active: type === 'byNew'
                                    })} onClick={this.clickHandler}>新建列表</li>
                                    <li id="byOut" className={classnames({
                                        active: type === 'byOut'
                                    })} onClick={this.clickHandler}>已付列表</li>
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

    clickHandler(e) {
        const {showList} = this.state;
        const {requestHandler, dispatch} = this.props;
        const id = e.currentTarget.id;
        this.setState({
            showList: !showList,
            type: id
        })  
        if (e.currentTarget.classList.contains('active')) return false;
        dispatch(getpackageList([]))
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