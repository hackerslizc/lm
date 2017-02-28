import React, { Component, PropTypes } from 'react';
import {Promise} from 'es6-promise';
import Tappable from 'react-tappable';

/**
 *
 * @param  {IconList 控件}
 *
 **/
class IconList extends Component{
    /*
    *
    * 图标有可能是后台配置推到这首页（或许会排序）
    *
    */

    iconRenderFn(){
        let iconArr = [],
              iconList = this.props.opt.list;
        iconList.map((item,idx)=>{
            iconArr.push(
                <li className="flex-1 clearfix" key={idx}>
                    <Tappable 
                        className="icon qrcode" 
                        component="a"
                        href={item.redirectUrl}>
                        <img src={item.normalImageUrl} />
                    </Tappable>
                    <label className="icon-text">{item.modelDetailName}</label>
                </li>
            )
        })

        return iconArr;
    }

    // moreIconRenderFn(){
    //     return (
    //         <li className="flex-1 clearfix">
    //             <Tappable 
    //                 className="icon more"
    //                 component="a">
    //             </Tappable>
    //             <label className="icon-text">更多</label>
    //         </li>
    //     )
    // }

    render(){
        return (
            <div className="iconList-warp clearfix">
                <ul className="flex-box clearfix">
                    {
                        this.iconRenderFn()
                    }
                </ul>
            </div>
        )
    }
};

export default IconList;