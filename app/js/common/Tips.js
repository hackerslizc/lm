require('../../css/tips.css');
var React = require('react');
var VelocityComponent = require('velocity-react').VelocityComponent;
/*
 *  tips opt = {name , conetnt , duration}
 *   name = loadingShow || loadingHide || text
 */

var Tips = React.createClass({
    getInitialState:function(){
      return{
        expanded:0,
        isShow:(function(){
          if(this.props.opt.name == 'loadingHide'){
            return false;
          }else{
            return true;
          }
        }.bind(this))()
      }
    },
    //接收到新 props 时调用 , 可以设置状态
    componentWillReceiveProps:function(nextProps){
      if(nextProps.opt.name == 'loadingHide'){
          clearTimeout(this.t)
          this.t = setTimeout(function(){
            Util({that:this}).stateSave({
              isShow:false
            });
          }.bind(this),this.props.opt||1500);
        }else{
          Util({that:this}).stateSave({
            isShow:true
          });
        }
    },
    isJq:function(){
      if( $ !== undefined && jQuery !== undefined ){
        return true;
      }
      return false;
    },
    checkClass:function(){
      var _opt = this.props.opt || {} ,
          _display = this.state.isShow ? "fadeIn" : "fadeOut" ,
          Animations = _display
       ;
      if( _opt.name == 'loadingShow' || _opt.name == 'loadingHide'){

        return (
          <div className="tipsWrapper">
            <VelocityComponent
              duration={this.state.duration}
              animation={Animations}
              id="loading-ball"
              ref="loadingbox"
              >
              <div className="loading-ball-box" >
                <div className="ball-clip-rotate-multiple">
                  <div></div><div></div>
                </div>
                <div className="loading-ball-layer"></div>
              </div>
            </VelocityComponent>
          </div>
        )
      }else if( _opt.name == 'text' ){
        if( this.state.isShow ){
          clearTimeout(this.t)
          this.t = setTimeout(function(){
            Util({that:this}).stateSave({
              isShow:false
            });
          }.bind(this),_opt.duration||1500);
        }

        return (
          <div className="tipsWrapper">
            <VelocityComponent
              duration={this.state.duration}
              animation={Animations}
              ref="tipsbox"
            >
              <div className="tipBox">
                <div className="tips_text">
                  {_opt.content}
                </div>
              </div>
            </VelocityComponent>
          </div>
        );
      }else{
        return '';
      }
    },
    render:function(){

      return(
        <div>
          {this.checkClass()}
        </div>
      )
    }
});

module.exports = Tips;
