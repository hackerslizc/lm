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
            isSelect: false
        }
        this.editFn = this.editFn.bind(this);
        this.setDefaultFn = this.setDefaultFn.bind(this);
        this.deleteFn = this.deleteFn.bind(this);
    }

    editFn(e){

    }

    deleteFn(e){
        this.props.deleteFn({
            id: e.target.id
        })
    }

    setDefaultFn(e){
        this.setState({
            isSelect: !(e.currentTarget.classList.contains('on'))
        })
        console.log(e.currentTarget.id);
    }

    render(){
        const opt = this.props.opt,
              idx = opt.idx,
              id = opt.id,
              isSelect = this.state.isSelect ? 'address-icon default on' : 'address-icon default',
              iconsrc = opt.iconsrc,
              takeDelivery = opt.takeDelivery,
              date = opt.date,
              orderId = opt.orderId,
              status = opt.status,
              count = opt.count;
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
                    <Tappable
                        id={id}
                        onTap={this.editFn}
                        className="list-address-edit"
                        component="a">
                        <i className="address-icon edit"></i>
                        编辑
                    </Tappable>
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