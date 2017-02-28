import React, { Component, PropTypes } from 'react';
import {Promise} from 'es6-promise';

import Tappable from 'react-tappable';
/**
 *
 * @param  {首页}
 *
 **/
class Finance extends Component{

    constructor (props) {
        super(props);
        this.renderFn = this.renderFn.bind(this);
    }

    renderFn(){
        let FinanceArr = [],
             FinanceList = this.props.opt.list,
             lastc = FinanceList.length-1;
        FinanceList.map((item,idx)=>{
            console.log("lastc："+lastc , "idx："+idx);
            let _classname = (lastc === idx ? 'finance-item' : "finance-item index-bottom-line");

            FinanceArr.push(
                <div className="clearfix" key={idx}>
                    <Tappable
                        className={_classname}
                        component="a"
                        href={item.jumpUrl}>
                        <div className="clearfix mb10">
                            <label className="finance-name fw500">{item.title}</label>
                        </div>
                        <div className="clearfix flex-box">
                            <div className="finance-left">
                                <p className="f-num">{item.incomeValue.value}</p>
                                <p className="f-desc mt5">{item.incomeValue.key}</p>
                            </div>
                            <div className="ml5 mr10 f-line"></div>
                            <div className="finance-right">
                                <p className="f14 gray-col-1 clearfix mt15 fontNb">{item.description}</p>
                                <p className="f-tag-warp clearfix">
                                    <span>
                                        {
                                            item.firstTag && item.firstTag != '' && (<label className="f-tag mr5  tag-b">{item.firstTag}</label>)
                                        }
                                        {
                                            item.secondTag && item.secondTag != '' && (<label className="f-tag tag-b">{item.secondTag}</label>)
                                        }
                                    </span>
                                </p>
                            </div>
                        </div>
                    </Tappable>
                </div>
            );
        })
        return FinanceArr;
    }

    render(){
        return (
            <div className="finance-warp mt10 clearfix">
                <p className="column-title pl15 title-line">爆款理财</p>
                <div className="finance-content">
                    {
                        this.renderFn()
                    }
                </div>
            </div>
        )
    }
};


export default Finance;