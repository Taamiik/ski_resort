import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import { rootSaga } from './rootSaga';
import { rootReducers } from './rootReducers';


const sagaMiddleware = createSagaMiddleware();


export const store = createStore(rootReducers, applyMiddleware(sagaMiddleware));


sagaMiddleware.run(rootSaga);