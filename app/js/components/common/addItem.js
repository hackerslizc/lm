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
              isSelect = this.state.isSelect ? 'list-order-setDefault fl on' : 'list-order-setDefault fl',
              iconsrc = opt.iconsrc,
              takeDelivery = opt.takeDelivery,
              date = opt.date,
              orderId = opt.orderId,
              status = opt.status,
              count = opt.count;

        return (
            <div className="list-order-warp clear">
                <div className="list-order-top flex-box">
                    <div className="list-lm-icon flex-1"></div>
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
                        onTap={this.deleteFn}
                        className="list-order-edit"
                        component="a">
                        编辑
                    </Tappable>
                    <Tappable
                        id={id}
                        onTap={this.selectFn}
                        className="list-order-delete"
                        component="a">
                        删除
                    </Tappable>
                    <Tappable
                        id={id}
                        onTap={this.deleteFn}
                        className={isSelect}
                        component="a">
                        设为默认
                    </Tappable>
                </div>
            </div>
        )
    }
};

export default ListItem;