import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
    allBookReducer,
    authReducer,
    addBookReducer,
    rateBookReducer
} from './reducers/userReducers'


const reducers = combineReducers({
    allBooks: allBookReducer,
    addBook: addBookReducer,
    auth: authReducer,
    rateBook: rateBookReducer
})

const initialState = {

}

const middlewares = [thunk]

const store = createStore(reducers, initialState, composeWithDevTools(applyMiddleware(...middlewares)))

export default store