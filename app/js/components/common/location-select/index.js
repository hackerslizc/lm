import React, { Component, PropTypes } from 'react';
import Picker from 'react-mobile-picker';

import {allpca, getProvince, getCity} from './pca';
import './picker-container.css'

/**
 *
 * @param  {地址选择器}
 *
 **/

function getProvinceArray() {
  let array = [];
   allpca.forEach(function(pca){
      array.push(pca.name)
  })
  return array;
}

function getCityArray(pname){
  let province = getProvince(pname),
      array = [];
  province.sub.forEach(function(city){
      array.push(city.name)
  })
  return array;
}

function getAreaArray(pname, cname){
  let province = getProvince(pname),
      city = getCity(province, cname),
      array = [];
  city.sub.forEach(function(area){
      array.push(area.name)
  })
  return array;
}

export default class LocationPicker extends Component {
  constructor(props) {
    super(props);

    const {province, city, area} = this.props.defaultLocation;
    const mprov = province ? province : '四川省', 
             mcity = city? city : '成都市',
             marea = area ? area : '高新区';
    console.log(province, city, area);

    this.state = {
      isPickerShow: false,
      valueGroups: {
        province: mprov,
        city: mcity ,
        area: marea
      },
      optionGroups: {
        province: getProvinceArray(),
        city: getCityArray(mprov),
        area: getAreaArray(mprov, mcity)
      }
    };
    this.togglePicker = this.togglePicker.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(name, value) {
    const {valueGroups, optionGroups} = this.state;
    const nextState = {
            valueGroups: {
              ...valueGroups,
              [name]: value
            }
          };

    if (name === 'province') {
        nextState.optionGroups = {
          ...optionGroups,
          city: getCityArray(value)
        };
    } else if (name === 'city') {
      nextState.optionGroups = {
        ...optionGroups,
        area: getAreaArray(nextState.valueGroups.province, nextState.valueGroups.city)
      };
    }
    this.setState(nextState);
  };

  togglePicker() {
    const data = {};
    data.isPickerShow = !this.state.isPickerShow;
    this.setState(data);
    this.props.callbackFn(this.state.valueGroups)
  };

  render() {
    const {isPickerShow, optionGroups, valueGroups} = this.state;
    const maskStyle = {
      display: isPickerShow ? 'block' : 'none'
    };
    const pickerModalClass = `picker-modal${isPickerShow ? ' picker-modal-toggle' : ''}`;
    const style = this.props.style ? this.props.style : {};

    return (
      <div className="location-wrap" style={style}>
        <div className="">
          <input
            type="text"
            className="weui_select"
            value={valueGroups.province + '-' + valueGroups.city + '-' + valueGroups.area}
            readOnly
            onClick={this.togglePicker} />
        </div>
        <div className="picker-modal-container">
          <div className="picker-modal-mask" style={maskStyle} onClick={this.togglePicker}></div>
          <div className={pickerModalClass}>
            <header>
              <div className="title">选择您的城市</div>
              <a href="javascript:;" onClick={this.togglePicker}>完成</a>
            </header>
            <Picker
             optionGroups={optionGroups}
             valueGroups={valueGroups}
             onChange={this.handleChange} />
          </div>
        </div>
      </div>
    );
  }
};