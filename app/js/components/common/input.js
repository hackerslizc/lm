import React, { Component, PropTypes } from 'react';
import {hashHistory,Link} from 'react-router';

import Tappable from 'react-tappable';

/**
 *
 * @param  {绑定页面}
 *
 **/
class Input extends Component{

    constructor (props) {
        super(props);
        this.renderTemp = this.renderTemp.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
    }

    changeHandler(e){
        let data = {};
        data['name'] = e.target.id;
        data['value'] = e.target.value;
        this.props.opt.callbackFn(data)
    }

    renderTemp(){
        const opt = this.props.opt,
              wrapclass = opt.pagename == 'bind' ? 'clearfix flex-box formItem bind' : 'clearfix flex-box formItem',
              _type = (opt.type === 'mobile' || opt.type === 'captcha') ? 'tel' : 'text',
              disabled = opt.disabled ? opt.disabled : false,
              id = opt.id;
        let inputTemp = (<input type={_type} id={id} disabled={disabled}  onChange={this.changeHandler}/>);

        if (opt.type === 'text' || opt.type === 'mobile' ) {
            if( opt.type === 'mobile' ){
                inputTemp = (<input type={_type} id={id} disabled={disabled} maxLength='11' onChange={this.changeHandler}/>)
            }
            return (<div className={wrapclass}>
                    <label className="clearfix label">{opt.label}</label>
                    <p className="clearfix flex-1">
                        {inputTemp}
                    </p>
                </div>)
        } else if (opt.type === 'captcha') {
            return (<div className={wrapclass}>
                    <label className="clearfix label">{opt.label}</label>
                    <p className="clearfix flex-1">
                        <input type={_type} id={id}  maxLength="6" onChange={this.changeHandler}/>
                    </p>
                </div>)
        } else {
            return null
        }
        
    }

    render(){
        const propsclass = this.props.opt.margint ? 'clearfix flex-box mt20' : 'clearfix flex-box'
        return (
            <div className={propsclass}>
                {this.renderTemp()}
            </div>
        )
    }
};

export default Input;