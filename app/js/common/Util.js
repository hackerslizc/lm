import CONSTS from '../const';
import {
    toast
} from '../redux/actions';
function returnAddr(str) {
    if (!str) return {};
    var proloc = (str.search('省') !== -1 ? str.search('省') + 1 : str.search('自治区') + 3),
        province = str.substring(0, proloc),
        city = str.substring(proloc, str.search('市') + 1),
        area = str.substring(str.search('市') + 1, str.length);
    return {
        provn: province,
        cityn: city,
        distn: area
    };
}

/* 封装ajax函数
 * @param {string}opt.type http连接的方式，包括POST和GET两种方式
 * @param {string}opt.url 发送请求的url
 * @param {boolean}opt.async 是否为异步请求，true为异步的，false为同步的
 * @param {object}opt.data 发送的参数，格式为对象类型
 * @param {function}opt.success ajax发送并接收成功调用的回调函数
 */
function Ajax(opt) {
    opt = opt || {};
    opt.method = opt.method.toUpperCase() || 'POST';
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
            var responseText = xmlHttp.responseText;
            if(responseText.err === 0){
                opt.success(responseText)
            } else {

            }
        }
    };
}

function params(data) {
    var arr = [];
    for (var i in data) {
        //特殊字符传参产生的问题可以使用encodeURIComponent()进行编码处理
        arr.push(encodeURIComponent(i) + '=' + encodeURIComponent(data[i]));
    }
    return arr.join('&');
}
export {
    returnAddr,
    Ajax
};
