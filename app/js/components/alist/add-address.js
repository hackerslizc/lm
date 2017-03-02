import React, { Component, PropTypes } from 'react';
import {hashHistory,Link} from 'react-router';
import { connect } from 'react-redux';
import {Promise} from 'es6-promise';

import Tappable from 'react-tappable';

import Header from '../common/header';
import ListItem from '../common/addItem';
/**
 *
 * @param  {地址列表}
 *
 **/
class AddAddress extends Component{
    constructor (props) {
        super(props);
        this.state = {
        }
    }
    componentDidMount(){
        document.getElementsByTagName('body')[0].style.height = 'auto';
        document.getElementsByTagName('body')[0].style.backgroundColor = '#fff';
        document.getElementsByClassName('main')[0].style.paddingTop = '0px';
    }

    render(){
        let _this = this,
            headerOpt = {
                title:'新增地址',
                name:"address",
                pathname:'index'
             };
        console.log(this.state)
        return (
            <div className="clearfix">
                <Header 
                    opt={headerOpt}>
                </Header>
                <div className="clearfix main">
                    <div className="add-address-bg"></div>
                </div>
                <div className="clearfix fixed flex-box">
                    <Tappable
                        id=""
                        onTap={this.onStoreFn}
                        className="list-btn add flex-1"
                        component="a">
                        新建地址+
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