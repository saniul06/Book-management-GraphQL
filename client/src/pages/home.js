import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useAlert } from 'react-alert'
import Header from '../components/Header'
import Footer from '../components/Footer'
import MetaData from '../components/MetaData'
import Loader from '../components/Loader'
import Book from '../components/Book'
import { getAllBooks } from '../actions/userActions'
import { ADD_BOOK_RESET, RATE_BOOK_RESET } from '../actions/actionTypes'

const Home = () => {

    const dispatch = useDispatch()
    const alert = useAlert()

    const { loading, books } = useSelector(state => state.allBooks)

    const [allBooks, setAllBooks] = useState([])

    const { message: bookMessage, error: bookError } = useSelector(state => state.addBook)
    const { message: rateMessage, error: rateError } = useSelector(state => state.rateBook)



    useEffect(() => {
        if (bookMessage) {
            alert.success(bookMessage)
            dispatch({ type: ADD_BOOK_RESET })
        }
        if (bookError) {
            alert.error(bookError)
            dispatch({ type: ADD_BOOK_RESET })
        }
        if (rateMessage) {
            alert.success(rateMessage)
            dispatch({ type: RATE_BOOK_RESET })
        }
        if (rateError) {
            alert.error(rateError)
            dispatch({ type: RATE_BOOK_RESET })
        }
    }, [bookMessage, rateMessage, bookError, rateError, dispatch, alert])


    useEffect(() => {
        dispatch(getAllBooks())
    }, [dispatch])

    useEffect(() => {
        if (books && books.length > 0) {
            setAllBooks(books)
        }
    }, [books])

    useEffect(() => {
    }, [allBooks])



    return (
        <>
            <MetaData title='home' />
            <Header setAllBooks={setAllBooks} allBooks={allBooks} />

            <section id="products" className="container mt-5">
                <div className="row">

                    {loading ? <Loader /> : allBooks.length > 0 ? (
                        allBooks.map((book, index) => (
                            <Book
                                key={index}
                                book={book}
                            />
                        ))
                    ) : <h2 style={{ position: 'absolute', top: "50%", left: "40%" }}>No Book Found</h2>}






                </div>
            </section>

            <Footer />

        </>
    )
}

export default Home
