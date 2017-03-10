import {Promise} from 'es6-promise';
import fetch from 'isomorphic-fetch';
import { hashHistory } from 'react-router';

import CONSTS from '../../const';

export const TOGGLE_LOADING = 'TOGGLE_LOADING';
export const TOGGLE_DATA_LOADING = 'TOGGLE_DATA_LOADING';
export const TOAST_TIP = 'TOAST_TIP';
export const SET_RUNTIME = 'SET_RUNTIME';

export const GET_ACCOUNT_INFO= 'GET_ACCOUNT_INFO';  //获取用户信息
export const GET_PACKAGE_LIST= 'GET_PACKAGE_LIST';  //获取用户信息

export const GET_ADDRESS_LIST= 'GET_ADDRESS_LIST';  //获取用户信息
export const GET_ADDRESSEE= 'GET_ADDRESSEE';  //获取用户信息
export const GET_SENDER= 'GET_SENDER';  //获取用户信息



/**
 * @param  {data} 传递用户信息
 * @return {Object} action 对象
 */
function getAccountInfo(data) {
    return {
        type: GET_ACCOUNT_INFO,
        data: data
    }
}
function getAddressee(data) {
    return {
        type: GET_ADDRESSEE,
        data: data
    }
}
function getSender(data) {
    return {
        type: GET_SENDER,
        data: data
    }
}
/**
 * @param  {data} 传递收件列表
 * @return {Object} action 对象
 */
function getpackageList(data) {
    return {
        type: GET_PACKAGE_LIST,
        data
    }
}

/**
 * @param  {data} 传递地址列表
 * @return {Object} action 对象
 */
function getaddressList(data) {
    return {
        type: GET_ADDRESS_LIST,
        data
    }
} 




/**
 * @param  {Boolean} 是否显示Loading状态
 * @return {Object} action 对象
 */
function toggleDataLoading(showLoading) {
    return {
        type: TOGGLE_DATA_LOADING,
        showLoading
    }
}
/**
 * @param  {Boolean} 是否显示Loading状态
 * @return {Object} action 对象
 */
function toggleLoading(showLoading) {
    return {
        type: TOGGLE_LOADING,
        showLoading
    }
}

/**
 * @param  {Boolean} 设置运行环境
 * @return {Object} action 对象
 */
function setRuntime(isInApp) {
    return {
        type: SET_RUNTIME,
        isInApp
    }
}


/**
 * @param  {Boolean} 显示Tip
 * @return {Object} action 对象
 */
function toastTip(msg) {
    return {
        type: TOAST_TIP,
        msg
    }
}


function toast(msg){
    let timmer;
    return dispatch => {

        if ( timmer )
            clearTimeout(timmer)

        timmer = setTimeout(function(){
            dispatch(toastTip(''));
        }, 2000);

        return dispatch(toastTip(msg)) 
    }
}
/*获取地址列表*/
function GetAddressList(data){
    return (dispatch,  getState) => {
        const store = getState();
        dispatch(
            remote({
                type: 'post',
                data: {
                    ...data
                }
            })
        ).then((json)=>{
            if (json) {
                dispatch(getaddressList(json.data));
            } else {
            }
        })
    }
}

/*获取收件列表*/
function GetPackageList(data){
    return dispatch => {
        dispatch(
            remote({
                type: 'post',
                data: {
                    sno:10201,
                    ...data
                }
            })
        ).then((json)=>{
            if (json) {
                dispatch(getpackageList(json.data));
            } else {
            }
        })
    }
}

function remote(options) {
    return (dispatch, getState) => {
        options = {
            type: 'post',
            data: {},
            // 
            ...options
        };

        let fetchOptions = {
            credentials:'include'
        },
            store = getState();
        options.data = {
            asn: 9024405, // 随机数
            aot: 9024391, //失效时间
            acd: "cac0efdbe794f04edd15b8085f4d7f27", //验证码， md5
            // sno: '', // 服务编号

            phone:18980709669,  
            passw:"123456",
            ...options.data,

        }

        if ( options.type.toUpperCase() === 'GET' && options.data) {
            let concatStr = '?';

            if ( options.url.indexOf(concatStr) > -1 ) {
                concatStr = '&'
            }

            options.url += (concatStr + param(options.data));
        } else {
            fetchOptions.method = options.type;
            // fetchOptions.body = options.data;
            fetchOptions.headers = {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            };
            fetchOptions.body = param(options.data);
            delete fetchOptions.credentials;
        }

        dispatch(toggleLoading(true));

        return fetch(CONSTS.URL.SERVER_URl, fetchOptions)
            .then(res =>res.json())
            .then(json => {
                dispatch(toggleLoading(false));
                if ( json.err == '0' ) {
                    return json || {};
                }else {
                    if(json.err == '908'){
                        dispatch(toast('网络繁忙，服务端未知错误'))
                        hashHistory.push('/error-page');
                    }
                    if ( json.msg != '') {
                        dispatch(toast(json.msg))
                    } else {
                        dispatch(toast(json.msg || '网络繁忙，服务端未知错误'))
                    }
                }

            })
            .catch( e => {
                dispatch(toggleLoading(false));
                dispatch(toast('网络异常：' + e));
                // hashHistory.push('/error-page');
            });

    }
}

function param (obj) {
    var str = [];

    for (var p in obj) {
        if (obj.hasOwnProperty(p)) {
            str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
        }
    }

    return str.join('&');
}

function paramToFormData (obj) {
    var data = new FormData();

    for (var p in obj) {
        if (obj.hasOwnProperty(p)) {
            data.append(p, obj[p])
        }
    }

    return data;
}



export {
    toast,
    remote,
    setRuntime,
    toggleDataLoading,
    toggleLoading,

    getAccountInfo,
    GetPackageList,
    getpackageList,
    GetAddressList,
    getaddressList,
    getAddressee,
    getSender
}