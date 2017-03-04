import reducers from './reducers';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';


export default function(initialState={}) {
    let createStoreWithMiddleware = applyMiddleware(
        thunkMiddleware
        ,
        // 控制台输出action
        // createLogger()
    )(createStore);

    return createStoreWithMiddleware(reducers, initialState)
}