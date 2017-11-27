import { createStore } from 'redux'

import rootReducer from './reducers';

const configureStore = (initialState) => {
    try{
        return createStore(
            rootReducer,
            initialState,
        );
    }catch(err){
        alert ('configureStore: '+err)
        console.error(err)
    }
}

export default configureStore;