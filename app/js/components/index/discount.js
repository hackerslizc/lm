import React, { Component, PropTypes } from 'react';
import Tappable from 'react-tappable';
/**
 *
 * @param  {首页}
 *
 **/
class Discount extends Component{

    constructor (props) {
        super(props);
        this.discountRenderFn = this.discountRenderFn.bind(this);
    }

    discountRenderFn(){
        var discountArr = [],
              discountList = this.props.opt.list;

        discountList.forEach((item,idx)=>{
            discountArr.push(
                <div className="discount" key={idx}>
                    <img src={item.normalImageUrl} className="discount-img" />
                    <div className="discount-text">
                        <label>{item.couponContent}</label>
                    </div>
                    <div className="discount-btn" >
                        <Tappable 
                            className="discount-btn-position" 
                            href={item.redirectUrl}
                            component="a">
                        </Tappable>
                        <span className="discount-btn-text">
                        {item.modelDetailContent}
                        </span>
                    </div>
                    
                </div>
            )
        })

        return discountArr;
    }

    render(){
        let _this = this,
             list = this.props.opt.list,
             _length = list.length,
            ulWidth = _length*(130+15);

        return (
            <div className="discount-warp mt10 clearfix">
                <div className="column-title">一大波优惠</div>
                <div className="discount-content">
                    <div className="clearfix" style={{width:ulWidth}}>
                        {this.discountRenderFn()}
                    </div>
                </div>
            </div>
        )
    }
};

export default Discount;