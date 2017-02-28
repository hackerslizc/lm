import React, {Component} from 'react';
import {connect} from 'react-redux';

/**
 * Loading 模块
 */
class Loading extends Component {
    render() {
        let showLoading = this.props.loading;
        return (
            <div>
            {this.props.loading &&
                <div className="g-tip g-tip-mask">
                    <div className="g-tip-inner">
                        <span className="g-loading"></span>
                    </div>
                </div>
            }
            </div>
        ) 
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.loading
    }
}

export default connect(mapStateToProps)(Loading);