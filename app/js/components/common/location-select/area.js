import React, { Component, PropTypes } from 'react';
import {Promise} from 'es6-promise';
import {allpca, getProvince, getCity} from './pca';



/**
 *
 * @param  {地址选择器}
 *
 **/
class Area extends Component{
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
        var city=getCity(province,this.props.cname)
        return (
            <select name="area"  id="area" defaultValue={this.props.aname}  onChange={this.callbackFn.bind(this)}>
            {
                city.sub.map(function(area){
                    return <option key={area.name} value={area.name}>{area.name}</option>;
                })
            }
            </select>);
    }
};


export default Area