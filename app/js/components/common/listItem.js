import React, { Component, PropTypes } from 'react';
import {hashHistory,Link} from 'react-router';

import Tappable from 'react-tappable';

/**
 *
 * @param  {列表组件}
 *
 **/
class ListItem extends Component{
    constructor (props) {
        super(props);
    }

    renderTemp(){
        const opt = this.props.opt;
        let inputTemp = (<input type={_type} id={id} onChange={this.changeHandler}/>);
        if ( opt.type === 'text' ) {

        } else {
            return null
        }
        
    }

    godetailHandler(){
        console.log(1);
    }

    render(){
        const opt = this.props.opt,
                    idx = opt.idx;

        return (
            <div className="list-order-warp clear">
                <div className="list-order-top flex-box">
                    <div className="list-lm-icon flex-1"></div>
                    <Tappable
                        id=""
                        onTap={this.deleteFn}
                        className="list-order-delet"
                        component="a">
                    </Tappable>
                </div>
                <Tappable
                    id=""
                    onTap={this.godetailHandler}
                    className="list-order-center clearfix"
                    component="div">
                    <div className="list-express-icon">
                        <img src="http://static.sto.cn/www/images/logo.png"/>
                    </div>
                    <div className="list-order-info">
                        <p>订单编号：123213213213</p>
                        <p>提  货  号：32321333wew</p>
                        <p>到站日期：2017-02-28</p>
                    </div>
                </Tappable>
                <div className="list-order-foot clearfix">
                    <Tappable
                        id=""
                        onTap={this.selectFn}
                        className="list-order-select"
                        component="a">
                    </Tappable>
                    <label className="list-order-status">未提取</label>
                    <label className="list-order-length">共1件包裹  </label>
                </div>
            </div>
        )
    }
};


const mapStateToProps = (state) => {
    // console.log(state.indexConfig)
    return {
        ...state.indexConfig
    }
};

export default ListItem;