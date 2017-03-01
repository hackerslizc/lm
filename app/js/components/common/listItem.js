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
        this.selectFn = this.selectFn.bind(this);
        this.deleteFn = this.deleteFn.bind(this);
    }

    godetailHandler(){
        console.log(1);
    }

    selectFn(e){
        this.setState({
            isSelect: !(e.target.classList.contains('on'))
        })
        this.props.selectFn({
            id: e.target.id,
            select: !e.target.classList.contains('on')
        })
    }

    deleteFn(e){
        this.props.deleteFn({
            id: e.target.id
        })
    }

    render(){
        const opt = this.props.opt,
              idx = opt.idx,
              id = opt.id,
              isSelect = this.state.isSelect ? 'list-order-select on' : 'list-order-select',
              iconsrc = opt.iconsrc,
              takeDelivery = opt.takeDelivery,
              date = opt.date,
              orderId = opt.orderId,
              status = opt.status,
              count = opt.count;

        return (
            <div className="list-order-warp clear">
                <div className="list-order-top flex-box">
                    <div className="list-lm-icon gray flex-1"></div>
                    <Tappable
                        id={id}
                        onTap={this.deleteFn}
                        className="list-order-delet"
                        component="a">
                    </Tappable>
                </div>
                <Tappable
                    id={id}
                    onTap={this.godetailHandler}
                    className="list-order-center clearfix"
                    component="div">
                    <div className="list-express-icon">
                        <img src={iconsrc}/>
                    </div>
                    <div className="list-order-info">
                        <p>订单编号：{orderId}</p>
                        <p>提  货  号：{takeDelivery}</p>
                        <p>到站日期：{date}</p>
                    </div>
                </Tappable>
                <div className="list-order-foot clearfix">
                    <Tappable
                        id={id}
                        onTap={this.selectFn}
                        className={isSelect}
                        component="a">
                    </Tappable>
                    <label className="list-order-status">{status}</label>
                    <label className="list-order-length">共 {count} 件包裹  </label>
                </div>
            </div>
        )
    }
};

export default ListItem;