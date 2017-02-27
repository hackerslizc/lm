import React, {Component} from 'react';
import Tappable from 'react-tappable';


class Head extends Component {
	TapHandler(tap){
		console.log(tap)
	}

    render (){
        return <header className="header">
	        <Tappable component="a" onTap={this.TapHandler.bind(this)}>12321</Tappable>
        </header>
    }
};

module.exports = Head;