import React, {Component} from 'react';
import {connect} from 'react-redux';

/**
 * LoadingBottom 模块
 */
class LoadingBottom extends Component {
    render() {
        let showLoading = this.props.dataloading;
        return (
            <div>
            {!this.props.dataloading &&
                <span className="g-data-loading"></span>
            }
            </div>
        ) 
    }
}

const mapStateToProps = (state) => {
    return {
        dataloading:state.dataloading
    }
}

export default connect(mapStateToProps)(LoadingBottom);