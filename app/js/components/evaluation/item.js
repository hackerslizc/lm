import React, { Component, PropTypes } from 'react';
import {hashHistory,Link} from 'react-router';
import { connect } from 'react-redux';
import {Promise} from 'es6-promise';

import Tappable from 'react-tappable';

import Header from '../common/header';
import ListItem from '../common/listItem';
/**
 *
 * @param  {列表}
 *
 **/
class Evaluation extends Component{
    constructor (props) {
        super(props);
        this.state = {
            star: 0
        };
        this.changeStar = this.changeStar.bind(this);
    }

    changeStar(e){
        let id = e.currentTarget.id,
             data = {};
        data[this.props.opt.id] = id;
        this.setState({
            star: id
        })
        this.props.callbackFn(data);
        // console.log(id);
    }

    render(){
        let _this = this,
             classname = `start-box  flex-2 ml10 star-${this.state.star}`;
           
        return (
            <div className="clearfix flex-box mb10">
                <label className="flex-1 tr">{this.props.opt.label}</label>
                <ul className={classname}>
                    <Tappable
                        id="1"
                        onTap={this.changeStar}
                        className="star"
                        component="li">
                    </Tappable>
                    <Tappable
                        id="2"
                        onTap={this.changeStar}
                        className="star"
                        component="li">
                    </Tappable>
                    <Tappable
                        id="3"
                        onTap={this.changeStar}
                        className="star"
                        component="li">
                    </Tappable>
                    <Tappable
                        id="4"
                        onTap={this.changeStar}
                        className="star"
                        component="li">
                    </Tappable>
                    <Tappable
                        id="5"
                        onTap={this.changeStar}
                        className="star"
                        component="li">
                    </Tappable>
                </ul>
            </div>
        )
    }
};


const mapStateToProps = (state) => {
    // console.log(state.indexConfig)
    return {
        // ...state.indexConfig
    }
};

export default connect(mapStateToProps)(Evaluation);