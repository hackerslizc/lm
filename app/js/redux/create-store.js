import reducers from './reducers';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';


export default function(initialState={}) {
    let createStoreWithMiddleware = applyMiddleware(
        thunkMiddleware
        ,
        createLogger()
    )(createStore);

    return createStoreWithMiddleware(reducers, initialState)
}