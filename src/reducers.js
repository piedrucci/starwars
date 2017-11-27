import { combineReducers } from 'redux'
import * as appActions from './actions'

const initialState = {
    peopleData: [],
    peopleInfo: {},
    characters: []
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

       default:
          return state;
    }
}

const rootReducer = combineReducers({
    appInfo: appReducer,
})

export default rootReducer