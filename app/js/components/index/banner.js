import React, { Component, PropTypes } from 'react';
import Slider from 'react-slick';
import Tappable from 'react-tappable';

/**
 *
 * @param  {首页}
 *
 **/
class Banner extends Component{

    constructor (props) {
        super(props);
        this.renderImgFn = this.renderImgFn.bind(this);
    }

    renderImgFn(){
        let imgArr = [],
             imgList = this.props.opt.bannerList;
        imgList.map((item,idx)=>{
            imgArr.push(
                <Tappable
                key={idx}
                component="a"
                href={item.redirectUrl}>
                    <img className='banner' src={item.normalImageUrl}/>
                </Tappable>
            );
        })
        return imgArr;
    }
    render(){
        let length = this.props.opt.bannerList.length;
        let _height = this.props.opt.height+'px';
        let settings = {
            dots: true,
            infinite: true,
            speed: 500,
            arrows:false,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay:true,
            autoplaySpeed:3000,
            adaptiveHeight:true
        };

        return (
            <div className="warp">
                {
                    this.props.opt.bannerList && (
                        <Slider {...settings}
                            className="J-banner banner-warp" 
                            >
                            {
                                this.renderImgFn()
                            }
                        </Slider>
                    )
                }
            </div>
        )
    }
};

export default Banner;