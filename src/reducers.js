import { combineReducers } from 'redux'
import * as appActions from './actions'

const initialState = {
    peopleData: [],
    peopleInfo: {},
    characters: [],
    pagination: {
        count: 0,
        pages: 1,
        current: 1,
        next: 2,
        previous: null,
    }
}

const appReducer = ( state = initialState, action ) => {
    switch (action.type) {

    case appActions.FILL_PROFILE:
    // console.log(action.payload)
        return {...state, peopleInfo: action.payload}

      case appActions.FILL_PEOPLE:
         return {...state, peopleData: action.payload}

      case appActions.FILL_ROWS:
        return {...state, characters: action.payload}

    
    case appActions.SET_PAGINATION:
        return {...state, pagination: action.payload}

       default:
          return state;
    }
}

const rootReducer = combineReducers({
    appInfo: appReducer,
})

export default rootReducer