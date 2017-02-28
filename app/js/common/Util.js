var Base =require('./Base.js');

window.Util = function (opt){
    return new util(opt);
};

const util = function(o){
    this.opt = {};
    Base.extend(this.opt,o)
}

util.prototype= {
    //存当前对象状态到组件
    stateSave:function(obj){
        var _this = this.opt.that || this ;
        if( _this.state ){
            //合并对象
            var _state = Base.extend( _this.state , obj );
            //存储新对象到状态
            _this.setState(_state)
        }
    }
};

module.exports = Util ;

