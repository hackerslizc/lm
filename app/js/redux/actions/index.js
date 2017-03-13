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
        dispatch(Ajax({
            data: {
                ...data
            },
            success: (r) => {
                dispatch(getaddressList(r.data));
            }
        }))
    }
}

/*获取收件列表*/
function GetPackageList(data){
    return dispatch => {
        dispatch(Ajax({
            data: {
                sno:10201,
                ...data
            },
            success: (r) => {
                dispatch(getpackageList(r.data));
            }
        }))
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
            appno: 2801000,
            // dbg: 2,
            // sno: '', // 服务编号
            // phone:18980709669,  
            // passw:"123456",
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
        let nowTiem = new Date().getTime();
        return fetch(`${CONSTS.URL.SERVER_URl}?t=${nowTiem}`, fetchOptions)
            .then(res =>res.json())
            .then(json => {
                dispatch(toggleLoading(false));
                alert(json.sid)
                if ( json.err == '0' ) {
                    return json || {};
                } else if (json.err == 1) {
                    hashHistory.push('/bind');
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


/* 封装ajax函数
 * @param {string}opt.type http连接的方式，包括POST和GET两种方式
 * @param {string}opt.url 发送请求的url
 * @param {boolean}opt.async 是否为异步请求，true为异步的，false为同步的
 * @param {object}opt.data 发送的参数，格式为对象类型
 * @param {function}opt.success ajax发送并接收成功调用的回调函数
 */
function Ajax(opt){
    return (dispatch, getState) => {
        dispatch(toggleLoading(true));
        opt = opt || {};
        opt.method = 'POST';
        opt.url = `${CONSTS.URL.SERVER_URl}?t=${new Date().getTime()}`;
        opt.async = opt.async || true;
        var tempdata = {
            asn: 9024405, // 随机数
            aot: 9024391, //失效时间
            acd: "cac0efdbe794f04edd15b8085f4d7f27", //验证码， md5
            appno: 2801000,
        };
        opt.data = Object.assign(tempdata, opt.data);
        opt.success = opt.success || function () {};
        var xmlHttp = null;
        if (XMLHttpRequest) {
            xmlHttp = new XMLHttpRequest();
        }else {
            xmlHttp = new ActiveXObject('Microsoft.XMLHTTP');
        }
        var params = [];
        for (var key in opt.data){
            params.push(key + '=' + opt.data[key]);
        }
        var postData = params.join('&');
        if (opt.method.toUpperCase() === 'POST') {
            xmlHttp.open(opt.method, opt.url, opt.async);
            xmlHttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
            xmlHttp.send(postData);
        } else if (opt.method.toUpperCase() === 'GET') {
            xmlHttp.open(opt.method, opt.url + '?' + postData, opt.async);
            xmlHttp.send(null);
        } 
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                var r = JSON.parse(xmlHttp.responseText);
                dispatch(toggleLoading(false));
                console.log(r);
                if(r.err === 0){
                    return opt.success(r)
                } else {
                    if (!opt.error) {
                        return dispatch(toast(r.msg || '网络繁忙，服务端未知错误'))
                    } else {
                        return opt.error(r)
                    }
                }
            }
        };
    }
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
    Ajax,
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