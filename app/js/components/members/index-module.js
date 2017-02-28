import React, { Component, PropTypes } from 'react';
import {Promise} from 'es6-promise';

import Tappable from 'react-tappable';

/**
 *
 * @param  {会员中心 模块}
 *
 **/
class IndexModule extends Component{

    constructor (props) {
        super(props);
        this.returnStringFn = this.returnStringFn.bind(this);
        this.enotation = this.enotation.bind(this);
    }

    returnStringFn(num){
        let strNum = String(num),
             str = '';
        if(strNum.indexOf('.') === -1){
            str = strNum+'.00';
        }else{
            let  arrNum = strNum.split('.');
            if(arrNum[1].length == 1){
                str = arrNum[0]+'.'+arrNum[1]+'0';
            }else if(arrNum[1].length == 2){
                str = arrNum[0]+'.'+arrNum[1];
            }else{
                str = arrNum[0]+'.'+(arrNum[1].slice(0,2));
            }
        }
        return str;
    }

    enotation(num){
        let numArr = '',
             returnStr  = '',
             startStr = '';
        if(typeof num === 'number'){
            numArr = String(num).split('.');
        }else if(typeof num === 'string'){
            numArr = num.split('.');
        }else{
            return '0.00';
        }

        startStr = numArr[0].replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');

        if(!!numArr[1]){
            if(numArr[1].length === 1){
                returnStr = startStr +'.'+numArr[1]+'0'
            }else if(numArr[1].length === 2){
                returnStr = startStr+'.'+numArr[1]
            }else{
                var sliceStr = numArr[1].slice(0,2);
                returnStr = startStr+'.'+ sliceStr
            }
        }else{
            returnStr = startStr+'.00'
        }

        return returnStr;
    }

    render(){
        var opt = this.props.opt;

        return (
         <div className="assets-list clearfix">
             <ul className="clearfix">
                 <li className="right-line bottom-line">
                    <Tappable
                        href="#"
                        component="a">
                        <i className="member-icon yue-icon"></i>
                        <div className="">
                            <p className="f15 fw500">账户余额</p>
                            <p className="f13 gray-col mt5 assets-list-desc">{opt.isLogin ? ( !!opt.accountBalance ? this.enotation(opt.accountBalance) : '0.00' ) : '0.00'}</p>
                        </div>
                    </Tappable>
                 </li>
             </ul>
         </div>
        )
    }
};

export default IndexModule;