import React, { Component, PropTypes } from 'react';
import {hashHistory,Link} from 'react-router';
import { connect } from 'react-redux';
import {Promise} from 'es6-promise';

import Tappable from 'react-tappable';

import Header from '../common/header';
import ListItem from '../common/chooseItem';
import {
    Ajax,
    toast,
    toggleLoading,
    GetAddressList,
    getAddressee,
    getSender
} from '../../redux/actions';
/**
 *
 * @param  {地址列表}
 *
 **/
class List extends Component{
    constructor (props) {
        super(props);
        this.state = {
            selectArr:[],
            listArr:[],
            count: 0,
            token:''
        }
        this.callbackFn = this.callbackFn.bind(this);
        this.clickcallbackFn = this.clickcallbackFn.bind(this);
        this.ItemRender = this.ItemRender.bind(this);
        this.deleteFn = this.deleteFn.bind(this);
    }
    componentDidMount(){
        const {dispatch, location} = this.props;
        const body = document.getElementsByTagName('body')[0] ;
        let type = (location.state.type === 'addressee' ? 2 : 1);
        body.style.minHeight = '100%';
        body.style.backgroundColor = '#ececec';
        body.style.paddingBottom = '40px';
        dispatch(GetAddressList({
            // token: r.data.token,
            atype: 1, // 1是本地地址 2 是收件人
            sno: 10071
        }));
    }

    callbackFn(r){
        const {dispatch, location} = this.props;
        // this.setState({
        //     token: r.data.token
        // })
        dispatch(GetAddressList({
            // token: r.data.token,
            atype:1, // 1是本地地址 2 是收件人
            sno:10071
        }));
    }

    deleteFn(data){
        const  {dispatch} = this.props;
        if (!data.id) return false;
        dispatch(Ajax({
            data:{
                addnr: data.id, //byOut
                sno: 10077
            },
            success: (r) => {
                dispatch(toast('删除地址成功'));
                window.location.reload()
            }
        }))
    }

    clickcallbackFn(data){
        const {dispatch, location} = this.props;
        console.log(location);
        if(location.state.type === 'addressee'){
            dispatch(getAddressee(data));
        } else if(location.state.type === 'sender') {
            dispatch(getSender(data))
        }
        

        hashHistory.push({
            pathname: '/express-add',
            state: {
                ...data
            }
        });
    }

    ItemRender(){
        let _this = this,
            {list, location} = _this.props,
            Ele = '',
            eleArr = [];
        for (var i = 0; i < list.length; i++){
            const opt = {
                // token: this.state.token,
                id: list[i].addnr,
                name: list[i].agena,
                mobile: list[i].ageph,
                place:`${list[i].provn}${list[i].cityn}${list[i].distn}`,
                address: list[i].zonen,
                isDefault: list[i].isdef,
                provn: list[i].provn,
                cityn: list[i].cityn,
                distn: list[i].distn
            };
            eleArr.push(<ListItem opt={opt} 
                key={i} 
                clickcallbackFn={_this.clickcallbackFn}
                deleteFn={this.deleteFn} >
            </ListItem>)
        }

        return (eleArr)
    }

    render(){
        let _this = this, 
            {dispatch, location} = this.props,
            title = location.state.type === 'sender' ? '寄件人' : '收件人';
        return (
            <div className="clearfix" style={{'min-height': '100%', position: 'relative'}}>
                <Header 
                    opt={{
                        title:'选择'+title+'地址',
                        name:"address",
                        pathname:'addresslist',
                        getUserInfo: true
                     }}
                    callbackFn={this.callbackFn}>
                </Header>
                <div className="clearfix main">
                    {
                        this.ItemRender()
                    }
                </div>
                <div className="clearfix fixed flex-box">
                    <Link
                        className="list-btn add flex-1"
                        to={{
                            pathname:'/address-add',
                            state:{
                                // token: _this.state.token,
                                type: "new"
                            }
                        }}>
                        新增地址
                    </Link>
                </div>
                
            </div>
        )
    }
};


const mapStateToProps = (state) => {
    // console.log(state.indexConfig)
    return {
        list:[...state.setAddressList],
        ...state.setAccountInfo
    }
};

export default connect(mapStateToProps)(List);