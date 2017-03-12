import React, {Component} from 'react';


/**
 * 倒计时按钮
 */
class CountDownBtn extends Component {
    constructor (props) {
        super(props);

        let options = this.props.options || {};

        this.options = options;
        this.time = options.time || 59;
        this.timmer = null;
        this.onCounting = false;

        this.state = {
            btnTxt: options.btnTxt || '发送验证码'
        }

        this.start = this.start.bind(this);
    }

    componentDidMount () {
        this.mounted = true;
    }

    start () {        

        let before = this.options.before;
        if (isFuc(before) && before.call(this) === false) {
            return;
        }

        this.onCounting = true;
        this.countdown();
    }

    countdown() {
        let me = this;
        function count(){
            me.mounted && me.setState({
                btnTxt: me.time + '秒'
            });

            if ( me.time === 0 ) {
                me.reset();
                me.mounted && me.setState({
                    btnTxt: '重新获取'
                })
                isFuc(me.options.end) && me.options.end.call(this);
                return;
            }
            me.time--;
        }

        count();

        me.timmer = setInterval(function(){
            count();
        }, 1000);

    }

    reset () {
        clearInterval(this.timmer);
        this.time = this.options.time || 59;
        this.onCounting = false;
        // btn.removeClass(disabledCLS);
        this.mounted && this.setState({
            btnTxt: '发送验证码'
        })
    }

    componentWillUnmount () {
        this.reset();
        // state = this.state;
        // this.isMounted = false;
    }

    render () {
        let disabled = this.onCounting,
            btnTxt = this.state.btnTxt || '发送验证码';
        return (
            <button 
                ref="btn"
                type="button"
                disabled={disabled}
                className={this.props.className}
                onClick={this.start}>
            {btnTxt}
            </button>
        ) 
    }
}

function isFuc(fn) {
    return fn && (typeof fn === 'function');
}

export default CountDownBtn;