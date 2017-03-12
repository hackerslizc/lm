import React, { Component, PropTypes } from 'react';
import {hashHistory,Link} from 'react-router';
import { connect } from 'react-redux';
import {Promise} from 'es6-promise';

import Tappable from 'react-tappable';

import Header from '../common/header';
import ListItem from '../common/addItem';
import {
    toast,
    remote,
    toggleLoading,
    GetAddressList
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
            // token:''
        }
        this.defaultFn = this.defaultFn.bind(this);
        this.deleteFn = this.deleteFn.bind(this);
        this.callbackFn = this.callbackFn.bind(this)
    }
    componentDidMount(){
        const {dispatch} = this.props;
        const body = document.getElementsByTagName('body')[0] ;
        body.style.height = 'auto';
        body.style.backgroundColor = '#ececec';
        body.style.paddingBottom = '40px';
        dispatch(GetAddressList({
            atype:1, // 1是本地地址 2 是收件人
            sno:10071
        }));
    }

    callbackFn(r){
        // const {dispatch, location} = this.props;
        // this.setState({
        //     token: r.data.token
        // })
        // dispatch(GetAddressList({
        //     token: location.state ? location.state.token : r.data.token,
        //     atype:1, // 1是本地地址 2 是收件人
        //     sno:10071
        // }));
    }

    submitHandler(){
        console.log('submitHandler')
    }

    selectFn(data){
        let selectArr = this.state.selectArr;
        if (data.select){
            selectArr.push(data.id);
        } else {

        }
        this.setState({
            selectArr: selectArr
        })
        console.log(data);
    }
 
    deleteFn(data){
        console.log(data)
        // 调用服务端删除接口
        const {dispatch} = this.props;
        dispatch(toggleLoading(false));
        dispatch(remote({
            data: {
                // token: this.state.token,
                addnr: data.id,
                appno:2801000,
                sno:10077,
                asn:9034107,
                aot:9034107,
                acd:'',
                dbg:2
            }
        })).then((r) => {
            dispatch(toast(r.msg));
            window.location.reload()
        })
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
                defaultFn={_this.defaultFn} 
                deleteFn={_this.deleteFn}>
            </ListItem>)
        }

        return (eleArr)
    }

    defaultFn(id){
        this.setState({
            isdefault: id
        })
        const {dispatch} = this.props;
        dispatch(remote({
            data: {
                // token: this.state.token,
                addnr: id,
                atype:1,
                sno: 10078,
                appno:2801000,
                asn:9034087,
                aot:9034087
            }
        })).then( r => {
            dispatch(toast(`设置${r.msg}`))
            window.location.reload();
        })
    }

    render(){
        let _this = this, 
            {dispatch, location} = this.props,
            headerOpt = {
                title:'地址列表',
                name:"address",
                pathname:'alist',
                getUserInfo: true
             };

        return (
            <div className="clearfix">
                <Header 
                    opt={headerOpt}
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