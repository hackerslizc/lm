import React, { Component, PropTypes } from 'react';
import {hashHistory,Link} from 'react-router';
import Tappable from 'react-tappable';

/**
 *
 * @param  {列表组件}
 *
 **/
class ChooseItem extends Component {
    constructor (props) {
        super(props);
        this.deleteFn = this.deleteFn.bind(this);
        this.clickHandler = this.clickHandler.bind(this);
    }
    clickHandler() {
        const {clickcallbackFn} = this.props;
        clickcallbackFn && clickcallbackFn(this.props.opt)
    }

    deleteFn(e){
        const {deleteFn} = this.props;
        deleteFn && deleteFn({
            id: e.currentTarget.id
        })
    }

    render(){
        const {opt} = this.props,
              id = opt.id;
        return (
            <div className="list-order-warp clear">
                <div className="list-order-top flex-box">
                    <div className="list-lm-icon yello flex-1"></div>
                </div>
                <div className="list-order-center address clearfix" onClick={this.clickHandler}>
                    <div className="flex-box ">
                        <p className="flex-1">{opt.name}</p>
                        <p className="flex-3">{opt.mobile}</p>
                    </div>
                    <div className="list-order-address">
                        {opt.address}
                    </div>
                </div>
                <div className="list-order-foot clearfix">
                    <Link
                        id={id}
                        to={{
                            pathname: '/address-add', 
                            state:{
                                type: "edit",
                                token: opt.token,
                                param: {...opt}
                            }
                        }}
                        className="list-address-edit">
                        <i className="address-icon edit"></i>
                        编辑
                    </Link>
                    <Tappable
                        id={id}
                        onTap={this.deleteFn}
                        className="list-address-delete"
                        component="a">
                        <i className="list-order-delet"></i>
                        删除
                    </Tappable>
                </div>
            </div>
        )
    }
};
export default ChooseItem;