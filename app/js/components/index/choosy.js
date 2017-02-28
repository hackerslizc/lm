import React, { Component, PropTypes } from 'react';
import {Promise} from 'es6-promise';
import Tappable from 'react-tappable';

/**
 *
 * @param  {首页}
 *
 **/
class Choosy extends Component{
    constructor (props) {
        super(props);
        this.renderFn = this.renderFn.bind(this);
    }

    renderFn(){
        let imgArr = [],
             imgList = this.props.opt.list;
        imgList.map((item,idx)=>{
            imgArr.push(
                <li key={idx}>
                    <Tappable
                        component="a"
                        href={item.redirectUrl}>
                        <img className='banner' src={item.normalImageUrl}/>
                    </Tappable>
                </li>
            );
        })
        return imgArr;
    }

    render(){
        return (
            <div className="choosy-warp mt10 clearfix">
                <p className="column-title">精挑细选</p>
                <ul>
                    {
                        this.renderFn()
                    }
                </ul>
            </div>
        )
    }
};


export default Choosy;