import React, {Component} from 'react';

import Head from './common/head';
require('../../css/reset.css');
require('../../css/global.css');
require('../../css/header.css');

class IndexPage extends Component {
    render (){
    	return <div>
	    	<Head>123213</Head>
        	HelloWorld!!!!!!
        </div>
    }
};

module.exports = IndexPage;