import {
    ALL_BOOK_REQUEST,
    ALL_BOOK_SUCCESS,
    ALL_BOOK_FAIL,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    RESET,
    ADD_BOOK_REQUEST,
    ADD_BOOK_SUCCESS,
    ADD_BOOK_FAIL,
    ADD_BOOK_RESET,
    RATE_BOOK_REQUEST,
    RATE_BOOK_SUCCESS,
    RATE_BOOK_FAIL,
    RATE_BOOK_RESET,
} from '../actions/actionTypes'

export const allBookReducer = (state = {}, action) => {
    switch (action.type) {
        case ALL_BOOK_REQUEST:
            return {
                loading: true
            }
        case ALL_BOOK_SUCCESS:
            return {
                loading: false,
                books: action.payload,
            }
        case ALL_BOOK_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default: return state
    }
}

export const addBookReducer = (state = {}, action) => {
    switch (action.type) {
        case ADD_BOOK_REQUEST:
            return {
                loading: true
            }
        case ADD_BOOK_SUCCESS:
            return {
                loading: false,
                message: action.payload.message,
                bookId: action.payload.bookId
            }
        case ADD_BOOK_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case ADD_BOOK_RESET:
            return {
                message: false,
                error: false
            }
        default: return state
    }
}

export const rateBookReducer = (state = {}, action) => {
    switch (action.type) {
        case RATE_BOOK_REQUEST:
            return {
                loading: true
            }
        case RATE_BOOK_SUCCESS:
            return {
                loading: false,
                message: action.payload
            }
        case RATE_BOOK_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case RATE_BOOK_RESET:
            return {
                message: false,
                error: false
            }
        default: return state
    }
}


export const authReducer = (state = {}, action) => {
    switch (action.type) {

        case REGISTER_REQUEST:
        case LOGIN_REQUEST:
            return {
                loading: true,
                isAuthenticated: false
            }


        case LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: action.payload.success,
                userId: action.payload.userId,
                token: action.payload.token
            }

        case REGISTER_SUCCESS:
            return {
                loading: false,
                message: action.payload
            }

        case LOGOUT_SUCCESS:
            return {
                isAuthenticated: false,
                userId: false,
                token: null,
            }

        case REGISTER_FAIL:
        case LOGIN_FAIL:
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload
            }

        case RESET:
            return {
                ...state,
                error: false,
                message: false
            }

        default: return state
    }

}

