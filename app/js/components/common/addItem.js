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
        this.state = {
            isSelect: this.props.opt.isDefault === 1 ?  1 : 0
        }
        this.setDefaultFn = this.setDefaultFn.bind(this);
        this.deleteFn = this.deleteFn.bind(this);
    }
    
    setDefaultFn(e){
        const {defaultFn} = this.props;
        this.setState({
            isSelect: (e.currentTarget.classList.contains('on') ? 0 : 1)
        })
        defaultFn && defaultFn(e.currentTarget.id)
    }
    deleteFn(e) {
        const {deleteFn} = this.props;
        deleteFn && deleteFn({
            id: e.currentTarget.id
        })
    }
    render(){
        const {opt} = this.props,
              id = opt.id,
              isSelect = this.state.isSelect === 1 ? 'address-icon default on' : 'address-icon default';
        console.log(this.state.isSelect);
        return (
            <div className="list-order-warp clear">
                <div className="list-order-top flex-box">
                    <div className="list-lm-icon yello flex-1"></div>
                </div>
                <div className="list-order-center address clearfix">
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
                    <span className="list-order-setDefault fl">
                        <Tappable
                        id={id}
                        onTap={this.setDefaultFn}
                        className={isSelect}
                        component="a"></Tappable>
                        设为默认
                    </span>
                </div>
            </div>
        )
    }
};

export default ListItem;