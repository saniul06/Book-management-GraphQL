import axios from 'axios'
import setAuthHeader from '../utils/setAuthHeader'
import {
    ALL_BOOK_REQUEST,
    ALL_BOOK_SUCCESS,
    ALL_BOOK_FAIL,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGOUT_SUCCESS,
    ADD_BOOK_REQUEST,
    ADD_BOOK_SUCCESS,
    ADD_BOOK_FAIL,
    RATE_BOOK_REQUEST,
    RATE_BOOK_SUCCESS,
    RATE_BOOK_FAIL,
} from './actionTypes'

const config = {
    headers: {
        'Content-Type': 'application/json'
    }
}

export const getAllBooks = () => async dispatch => {
    try {
        dispatch({ type: ALL_BOOK_REQUEST })
        const requestBody = {
            query: `
            query{
                books{
                  _id
                  bookName
                  author
                  publishedYear
                  category
                  ratings{
                      userId
                      value
                  }
                  user{
                      _id
                  }
                }
              }`
        }

        const fetch = await axios.post('http://localhost:4000/graphql', JSON.stringify(requestBody), config)
        const result = fetch.data.data.books

        dispatch({ type: ALL_BOOK_SUCCESS, payload: result })
    } catch (errors) {
        if (errors.response) {
            dispatch({ type: ALL_BOOK_FAIL, payload: errors.response.data.errors[0].message })
        } else {
            dispatch({ type: ALL_BOOK_FAIL, payload: "Internal server error" })
        }
    }
}

export const addBook = (bookName, author, publishedYear, category, handleClose, setAllBooks, allBooks) => async dispatch => {
    try {
        dispatch({ type: ADD_BOOK_REQUEST })
        const requestBody = {
            query: `
            mutation{
                addBook(bookInput: {bookName: "${bookName}", author:"${author}", publishedYear:"${publishedYear}", category:"${category}"}){
                  message
                  bookId
                }
              }`
        }

        const fetch = await axios.post('http://localhost:4000/graphql', JSON.stringify(requestBody), config)
        handleClose()
        const newBook = { _id: fetch.data.data.addBook.bookId, bookName, author, publishedYear, category, ratings: [] }

        setAllBooks(prev => ([newBook, ...prev]))

        dispatch({ type: ADD_BOOK_SUCCESS, payload: fetch.data.data.addBook })


    } catch (errors) {
        if (errors.response) {
            dispatch({ type: ADD_BOOK_FAIL, payload: errors.response.data.errors[0].message })
        } else {
            dispatch({ type: ADD_BOOK_FAIL, payload: "Internal server error" })
        }
    }
}

export const rateBook = (bookId, value, book, setAvgRating, setNumOfRating) => async (dispatch, getState) => {
    try {
        let avg;
        if (book.ratings && book.ratings.length > 0) {
            avg = book.ratings.reduce((acc, item) => item.value + acc, value)
            setAvgRating(avg / (book.ratings.length + 1))
            setNumOfRating(prev => prev + 1)
            book.ratings.push({ userId: getState().auth.userId, value })

        } else {
            setAvgRating(value)
            setNumOfRating(1)
            book.ratings.push({ userId: getState().auth.userId, value })
        }
        dispatch({ type: RATE_BOOK_REQUEST })
        const requestBody = {
            query: `
            mutation{
                addRating(bookId:"${bookId}",rating:${value}){
                  message
                }
              }`
        }

        const fetch = await axios.post('http://localhost:4000/graphql', JSON.stringify(requestBody), config)

        dispatch({ type: RATE_BOOK_SUCCESS, payload: fetch.data.data.addRating.message })





    } catch (errors) {
        if (errors.response) {
            dispatch({ type: RATE_BOOK_FAIL, payload: errors.response.data.errors[0].message })
        } else {
            dispatch({ type: RATE_BOOK_FAIL, payload: "Internal server error" })
        }
    }
}


export const register = (email, password, history) => async dispatch => {

    try {
        dispatch({ type: REGISTER_REQUEST })
        const requestBody = {
            query: `
            mutation{
                register(userInput: {email: "${email}", password: "${password}"}) {
                  message
                }
              }`
        }
        const fetch = await axios.post('http://localhost:4000/graphql', JSON.stringify(requestBody), config)
        dispatch({ type: REGISTER_SUCCESS, payload: fetch.data.data.register.message })
        history.push('/login')

    } catch (errors) {
        if (errors.response) {
            dispatch({ type: REGISTER_FAIL, payload: errors.response.data.errors[0].message })
        } else {
            dispatch({ type: REGISTER_FAIL, payload: "Internal server error" })
        }

    }
}

export const login = (email, password, history) => async dispatch => {

    try {
        dispatch({ type: LOGIN_REQUEST })
        const requestBody = {
            query: `
            mutation{
                login(email: "${email}", password: "${password}"){
                  success,
                  userId,
                  token
                }
              }`
        }
        const fetch = await axios.post('http://localhost:4000/graphql', JSON.stringify(requestBody), config)
        dispatch({ type: LOGIN_SUCCESS, payload: fetch.data.data.login })
        const token = fetch.data.data.login.token
        setAuthHeader(token)
        localStorage.setItem('auth-token', token)
        history.push('/')

    } catch (errors) {
        if (errors.response) {
            dispatch({ type: LOGIN_FAIL, payload: errors.response.data.errors[0].message })
        } else {
            dispatch({ type: LOGIN_FAIL, payload: "Internal server error" })
        }

    }
}

export const logout = () => async dispatch => {

    localStorage.removeItem("auth-token");
    let token = localStorage.getItem('auth-token')
    setAuthHeader(token)
    dispatch({ type: LOGOUT_SUCCESS })
}