import React, { Component, PropTypes } from 'react';
import {allpca, getProvince, getCity} from './pca';
import Province from './province';
import City from './city';
import Area from './area';



/**
 *
 * @param  {地址选择器}
 *
 **/
class LocationSelect extends Component{
    constructor (props) {
        super(props);
        this.state = { 
            province: "四川省",
            city:"成都市",
            area:"高新区"
        };
        this.getSel = this.getSel.bind(this)
    }

    getSel(event){
        const targetname= event.target.getAttribute("name");
        if (targetname=="province") {
            const province=getProvince(event.target.value);
            this.setState({
                province: event.target.value,
                city: province.sub[0].name,
                area: province.sub[0].sub[0].name
            })
        } else if (targetname=="city") {
            const province=getProvince(this.state.province),
                     city=getCity(province,event.target.value);
            this.setState({
                city: event.target.value,
                area: city.sub[0].name
            })
        }
    }

    callbackFn(data){
        console.log(data);
        if(data.province) {
            document.getElementById('city').change();
        } else if (data.city) {
            document.getElementById('area').click();
        } else if (data.area) {

        }
    }

    render(){
        return (
            <div onChange={this.getSel}>
                <Province pname={this.state.province}  callbackFn={this.callbackFn.bind(this)}/>
                <City pname={this.state.province} cname={this.state.city} callbackFn={this.callbackFn.bind(this)}/>
                <Area pname={this.state.province} cname={this.state.city} aname={this.state.area} callbackFn={this.callbackFn.bind(this)}/>
            </div>
        )
    }
};
export default LocationSelect;