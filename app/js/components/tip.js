import React, {Component} from 'react';
import {connect} from 'react-redux';

/**
 * Loading 模块
 */
class Tip extends Component {
    render() {
        // let tip = this.props.toastTip;
        let tip = this.props.toastTip;
        // console.log(this.props.toastTip)
        return (
            <div>
            {tip &&
                <div className="g-tip g-tip-mask">
                    <div className="g-tip-inner">
                        {tip}
                    </div>
                </div>
            }
            </div>
        ) 
    }
}

const mapStateToProps = (state) => {
    return {
        toastTip: state.toastTip
    }
}

export default connect(mapStateToProps)(Tip);