import React, { Component, PropTypes } from 'react';
import {hashHistory,Link} from 'react-router';
import { connect } from 'react-redux';
import {Promise} from 'es6-promise';

import Tappable from 'react-tappable';


import Header from '../header';
import Banner from './banner';
import IconList from './iconList';
import Discount from './discount';
import Choosy from './choosy';
import Finance from './finance';

/**
 *
 * @param  {首页}
 *
 **/
class Home extends Component{

    constructor (props) {
        super(props);
    }
    componentDidMount(){
        document.getElementsByTagName('body')[0].style.paddingBottom = '80px;'
    }
    render(){

        let _this = this,
             headerOpt = {
                title:'邻米',
                name:"index",
                pathname:'index'
             },
             IconOpt = {
                list:[]
             },
             bannerOpt = {
                 bannerList:[],
                 height:90
             },
             discountList = {
                list:[]
             },
             choosyList = {
                list:[]
             },
             financeList = {
                list:[]
             },
             indexConfig = this.props.indexConfig;
        if(indexConfig){
            bannerOpt.bannerList = indexConfig.wamHomeBanner ? indexConfig.wamHomeBanner.mhtDetailList : [];
            IconOpt.list = indexConfig.wamDiscovery ? indexConfig.wamDiscovery.mhtDetailList : [];
            discountList.list = indexConfig.wamBigDiscount ? indexConfig.wamBigDiscount.mhtDetailList : [];
            choosyList.list = indexConfig.wamSelective ? indexConfig.wamSelective.mhtDetailList : [];
            financeList.list = indexConfig.profitInfos;
        }
        return (
            <div className="clearfix">
                <Header 
                    opt={headerOpt}>
                </Header>
                <div className="clearfix main">
                    {
                        bannerOpt.bannerList.length > 0 && (<Banner
                            opt={bannerOpt}>
                        </Banner>)
                    }
                    {
                        IconOpt.list.length > 0 && (<IconList
                            opt={IconOpt}>
                        </IconList>)
                    }
                    {
                        discountList.list.length > 0 && (<Discount
                            opt={discountList}>
                        </Discount>)
                    }

                    {
                        choosyList.list.length > 0 && (<Choosy
                            opt={choosyList}>
                        </Choosy>)
                    }
                    {
                        !!financeList.list && financeList.list.length > 0 && (<Finance
                            opt={financeList}>
                        </Finance>)
                    }
                </div>
            </div>
        )
    }
};


const mapStateToProps = (state) => {
    // console.log(state.indexConfig)
    return {
        // ...state.indexConfig
    }
};

export default connect(mapStateToProps)(Home);