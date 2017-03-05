import React, { Component, PropTypes } from 'react';
import {Promise} from 'es6-promise';
import {allpca, getProvince, getCity} from './pca';


/**
 *
 * @param  {地址选择器}
 *
 **/
class Province extends Component{
    constructor (props) {
        super(props);
    }

    callbackFn(e){
        let data = {},
             city = document.getElementById('city');
        data[e.currentTarget.name] = e.currentTarget.value;
        this.props.callbackFn(data);
    }

    render(){
        var self=this;
        return (
            <select name="province" id="province" defaultValue={this.props.pname} onChange={this.callbackFn.bind(this)}>
                {
                    allpca.map(function(pca){
                        return <option key={pca.name}  value={pca.name}>{pca.name}</option>;
                    })
                }
            </select>
        )
    }
};

export default Province