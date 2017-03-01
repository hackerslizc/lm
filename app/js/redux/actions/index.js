import {Promise} from 'es6-promise';
import fetch from 'isomorphic-fetch';
import { hashHistory } from 'react-router';

import CONSTS from '../../const';

export const TOGGLE_LOADING = 'TOGGLE_LOADING';
export const TOGGLE_DATA_LOADING = 'TOGGLE_DATA_LOADING';
export const TOAST_TIP = 'TOAST_TIP';
export const SET_RUNTIME = 'SET_RUNTIME';

export const GET_ACCOUNT_INFO= 'GET_ACCOUNT_INFO';  //获取用户信息


/**
 * @param  {data} 传递用户信息
 * @return {Object} action 对象
 */
function getAccountInfo(data) {
    return {
        type: GET_ACCOUNT_INFO,
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

/*获取用户信息*/
function AccountInfoFn(){
    return dispatch => {
        dispatch(
            remote({
                url:CONSTS.URL.SELECT_ACCOUNT_INFO,
                type: 'get'
            })
        ).then((json)=>{
            if (json) {
                dispatch(getAccountInfo(json));
            } else {
            }
        })
    }
}

function remote(options) {
    return (dispatch, getState) => {
        options = {
            type: 'GET',
            data: {},
            // 
            ...options
        };

        let fetchOptions = {
            credentials:'include'
        },
            store = getState();
        options.data = {
            ...options.data
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
                'Content-Type': 'application/json'
            };

            fetchOptions.body = JSON.stringify(options.data);

            delete fetchOptions.credentials;
        }

        // return fetch(options.url, options.data)
        // return fetch(options.url, fetchOptions)
        // return fetch(CONSTS.BASE_URL + options.url, options)  // member get
        return fetch(CONSTS.BASE_URL + options.url, fetchOptions)//post.
            .then(res =>res.json())
            .then(json => {
                dispatch(toggleLoading(false))
                if ( json.resultCode == '0' ) {
                    return json.resultData || {};
                }else {
                    if ( json.resultMsg != '') {
                        dispatch(toast(json.resultMsg))
                    } else {
                        dispatch(toast(json.resultMsg || '网络繁忙，服务端未知错误'))
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
    AccountInfoFn,
    getAccountInfo
}