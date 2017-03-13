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
        this.deleteFn = this.deleteFn.bind(this);
    }
    deleteFn(e){
        this.props.deleteFn({
            id: e.target.id
        })
    }

    getState(status) {
        let ostat = '';
        if(status === 0){
            ostat = '自提'
        } else if (status === 1) {
            ostat = '待付款'
        } else if (status === 2) {
            ostat = '已付款'
        } else if (status === 4) {
            ostat = '已派单'
        } else if (status === 8) {
            ostat = '已出库'
        } else if (status === 16) {
            ostat = '多次派送'
        } else if (status === 32) {
            ostat = '电子签收'
        } else if (status === 64) {
            ostat = '本人签收'
        } else if (status === 128) {
            ostat = '他人代签'
        }
        return ostat
    }

    render(){
        const opt = this.props.opt,
              isSelect = this.state.isSelect ? 'list-order-select on' : 'list-order-select',

              takeDelivery = opt.smsvc, //提货码
              count = opt.count,

              orderId = opt.ordnr, //订单编号
              posur = opt.posur, //物流公司
              senna = opt.senna, //物流单号
              ordda = opt.ordda, //到店时间
              status = this.getState(opt.ostat),
              iconsrc = opt.posur, //ICON
              paktn = opt.paktn,
              tracs = opt.tracs; //件数
              
        return (
            <div className="list-order-warp clear">
                <div className="list-order-top flex-box">
                    <div className="list-lm-icon gray flex-1"></div>
                </div>
                <Link
                    id={orderId}
                    className="list-order-center clearfix"
                    to={{
                        pathname:'/express-detail',
                        state:{
                            ...opt
                        }
                    }}>
                    <div className="list-express-icon">
                        <img src={iconsrc}/>
                    </div>
                    <div className="list-order-info">
                        <p>收件人：{senna}</p>
                        <p>快件类型：{paktn}</p>
                        <p>到站日期：{ordda}</p>
                    </div>
                </Link>
                <div className="list-order-foot clearfix">
                    <label className="list-order-status">{status}</label>
                    <label className="list-order-length">共 {tracs} 件包裹  </label>
                </div>
            </div>
        )
    }
};

export default ListItem;