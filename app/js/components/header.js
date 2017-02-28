import React, { Component, PropTypes } from 'react';
import { hashHistory } from 'react-router';

import { connect } from 'react-redux';
import {Promise} from 'es6-promise';


import Tappable from 'react-tappable';

import {
    AccountInfoFn
} from '../redux/actions';

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
            getdata:true
        }

        this.toMemberCenter = this.toMemberCenter.bind(this);
        this.backHandleFn = this.backHandleFn.bind(this);

    }

    componentWillMount(){

    }

    toMemberCenter(){
        hashHistory.push('/member-center');
    }

    backHandleFn(){
        window.history.go(-1);
    }

    clickHancler(){
        
    }

    render(){

        let opt = (!!this.props.opt) ?  this.props.opt : {name:''},
            classname = (opt.name == 'member-center') ? 'nav-bar-no' : 'nav-bar',
            backclass = (opt.name == 'login') ? 'nav-back J_navBack gray' : 'nav-back J_navBack';
            // classname = (opt.name == 'member-center') ? 'nav-bar-no bottom-line' : 'nav-bar bottom-line';

        return (
            <header className="g-header logged-in" id="J_header">
                <div className={classname}>
                    {
                        opt.pathname != 'index' && (<div className={backclass}>
                                <Tappable
                                    href="javascript:void(0)"
                                    onClick={this.backHandleFn}
                                    component="a">
                                    返回
                                </Tappable>
                            </div>)
                    }
                    <div className="nav-title-wrap">
                        <h1 className="nav-title">
                            {opt.title ? opt.title : "邻米"}
                        </h1>
                    </div>
                    <div className="nav-more">
                        <Tappable
                            onTap={this.clickHancler}
                            className="header-trade-record white-col"
                            component="a">
                            <i className="header-trade-record-icon"></i>
                            <label>账单1</label>
                        </Tappable>
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
        },
        accountinfo:{
            ...state.setAccountInfo
        }
    }
};

export default connect(mapStateToProps)(Header);