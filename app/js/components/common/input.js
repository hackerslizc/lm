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

    renderTemp(){
        const opt = this.props.opt,
              wrapclass = opt.pagename == 'bind' ? 'clearfix flex-box formItem bind' : 'clearfix flex-box formItem',
              _type = (opt.type === 'mobile' || opt.type === 'captcha') ? 'number' : 'text',
              id = opt.id;

        if (opt.type === 'text'|| opt.type === 'mobile' ) {
            return (<div className={wrapclass}>
                    <label className="clearfix label">{opt.label}</label>
                    <p className="clearfix flex-1"><input type={_type} id={id} onChange={this.changeHandler}/></p>
                </div>)
        } else if (opt.type === 'captcha') {
            return (<div className={wrapclass}>
                    <label className="clearfix label">opt.label</label>
                    <p className="clearfix flex-1"><input type={_type} id={id} onChange={this.changeHandler} maxLength="6"/></p>
                </div>)
        } else {
            return null
        }
        
    }

    changeHandler(e){
        let data = {};
        data['name'] = e.target.id;
        data['value'] = e.target.value;
        this.props.opt.callbackFn(data)
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


const mapStateToProps = (state) => {
    // console.log(state.indexConfig)
    return {
        ...state.indexConfig
    }
};

export default Input;