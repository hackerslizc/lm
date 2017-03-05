import { combineReducers } from 'redux'
import {
    TOGGLE_LOADING,
    TOGGLE_DATA_LOADING,
    SET_RUNTIME,

    GET_ACCOUNT_INFO,

    SET_CONFIG_STATES,
    GET_PACKAGE_LIST,
    GET_ADDRESS_LIST
} from '../actions';

function loading(state={}, action) {
    switch (action.type) {
        case 'TOGGLE_LOADING':
            return action.showLoading;
        break;
        default:
            return state
    }
}

function dataloading(state={}, action) {
    switch (action.type) {
        case 'TOGGLE_DATA_LOADING':
            return action.showLoading;
        break;
        default:
            return state
    }
}


function toastTip(state={}, action) {
    switch (action.type) {
        case 'TOAST_TIP':
            return action.msg;
        break;
        default:
            return state
    }
}

/*
 *  设置用户信息
 */
function setAccountInfo(state={}, action) {
    switch (action.type) {
        case 'GET_ACCOUNT_INFO':
            return Object.assign({}, state, {accountinfo: action.data});
        break;
        default:
            return state
    }
}

/*
 *  设置包裹列表
 */
function setPackageList(state={}, action) {
    switch (action.type) {
        case 'GET_PACKAGE_LIST':
            return action.data;
        break;
        default:
            return state
    }
}

/*
 *  设置地址列表
 */
function setAddressList(state={}, action) {
    switch (action.type) {
        case 'GET_ADDRESS_LIST':
            return action.data;
        break;
        default:
            return state
    }
}




export default combineReducers({
    loading,
    dataloading,
    toastTip,
    // indexConfig,
    setAccountInfo,
    setPackageList,
    setAddressList
});