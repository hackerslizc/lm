import React, { Component, PropTypes } from 'react';
import {hashHistory,Link} from 'react-router';
import { connect } from 'react-redux';
import {Promise} from 'es6-promise';

import CONSTS from '../../const.js';

import Tappable from 'react-tappable';

import Header from '../common/header';

import {
    AccountInfoFn
} from '../../redux/actions';
/**
 *
 * @param  {会员中心}
 *
 **/
class MemberIndex extends Component{

    constructor (props) {
        super(props);
        this.state = {
        }
    }

    
    render(){
      
        return (
            <div className="clearfix">
               
            </div>
        )
    }
};


const mapStateToProps = (state) => {
    // console.log(state.indexConfig)
    return { 
        loginstatus:{
            // ...state.setLoginStatus
        },
        accountinfo:{
            // ...state.setAccountInfo
        }
    }
};

export default connect(mapStateToProps)(MemberIndex);