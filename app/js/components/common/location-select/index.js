import React, { Component, PropTypes } from 'react';
import Picker from 'react-mobile-picker';

import {allpca, getProvince, getCity} from './pca';
import Province from './province';
import City from './city';
import Area from './area';
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
  if (city.length === 0) return false;
  city.sub.forEach(function(area){
      array.push(area.name)
  })
  return array;
}


function generateNumberArray(begin, end) {
  let array = [];
  for (let i = begin; i <= end; i++) {
    array.push((i < 10 ? '0' : '') + i);
  }
  return array;
}

export default class LocationPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPickerShow: false,
      valueGroups: {
        province: '四川省',
        city: '成都市',
        area: '高新区'
      },
      optionGroups: {
        province: getProvinceArray(),
        city: getCityArray('四川省'),
        area: getAreaArray('四川省', '成都市')
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

    return (
      <div className="picker-container">
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