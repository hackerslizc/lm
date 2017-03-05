import React, { Component, PropTypes } from 'react';
import {allpca, getProvince, getCity} from './pca';
import {Promise} from 'es6-promise';


/**
 *
 * @param  {地址选择器}
 *
 **/
class City extends Component{
    constructor (props) {
        super(props);
    }

    callbackFn(e){
        let data = {};
        data[e.currentTarget.name] = e.currentTarget.value;
        this.props.callbackFn(data);
    }

    render(){
        var self=this;
        var province=getProvince(this.props.pname);
        return (
            <select name="city" id="city" defaultValue={this.props.cname}  onChange={this.callbackFn.bind(this)}>
            {
                province.sub.map(function(city){
                    return <option key={city.name} value={city.name}>{city.name}</option>;
                })
            }
          </select>
        );
    }
};

export default City;