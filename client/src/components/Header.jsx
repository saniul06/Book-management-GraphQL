import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../actions/userActions'
import BookModal from './BookModal'

const Header = ({ setAllBooks, allBooks }) => {

    const dispatch = useDispatch()

    const { isAuthenticated, loading } = useSelector(state => state.auth)

    const handleLogout = () => {
        dispatch(logout())
    }

    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    return (
        <>
            <nav className="navbar row">
                <div className="col-12 col-md-3">
                    <div className="navbar-brand">
                        <Link to='/'><h2 className="text-light">Lemonhive</h2></Link>
                    </div>
                </div>

                <div className="col-12 col-md-6 mt-2 mt-md-0">
                    <div className="input-group">
                        <input
                            type="text"
                            id="search_field"
                            className="form-control"
                            placeholder="Enter Product Name ..."
                        />
                        <div className="input-group-append">
                            <button id="search_btn" className="btn">
                                <i className="fa fa-search" aria-hidden="true"></i>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
                    {isAuthenticated ? (
                        <div className="ml-4 dropdown d-inline">
                            <Link
                                to="#"
                                id="login_btn"
                                className="btn"
                                type="button"
                                data-toggle="dropdown"
                                aria-haspopup="true"

                                aria-expanded="false">
                                Menu
                            </Link>
                            <div
                                className="dropdown-menu"
                                aria-labelledby="dropDownMenuButton">
                                <Link
                                    to="#"
                                    onClick={handleOpen}
                                    className="dropdown-item">
                                    Add Book
                                </Link>
                                <Link
                                    to="/"
                                    className="dropdown-item text-danger"
                                    onClick={handleLogout}>
                                    Logout
                                </Link>
                            </div>
                        </div>
                    ) : (
                        !loading && (
                            <Link
                                to="/login"
                                className="btn ml-4"
                                id="login_btn">
                                Login
                            </Link>
                        )
                    )}

                </div>
            </nav>
            <BookModal
                open={open}
                handleOpen={handleOpen}
                handleClose={handleClose}
                setAllBooks={setAllBooks}
                allBooks={allBooks}
            />
        </>
    )
}

export default Header
