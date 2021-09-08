import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { register } from '../actions/userActions'
import { RESET } from '../actions/actionTypes'

const Register = ({ history }) => {

    const dispatch = useDispatch()
    const alert = useAlert()

    const { loading, message, error } = useSelector(state => state.auth)
    const [data, setData] = useState({
        email: "",
        password: ""
    })

    useEffect(() => {
        if (message) {
            alert.success(message)
            dispatch({ type: RESET })
        }
    }, [message, dispatch, alert])

    const handleChange = e => {
        setData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = e => {
        e.preventDefault()
        dispatch({ type: RESET })
        dispatch(register(data.email, data.password, history))
    }

    return (
        <>
            <div className="container container-fluid">
                <div className="row wrapper">
                    <div className="col-10 col-lg-5">
                        <form className="shadow-lg" onSubmit={handleSubmit}>
                            <h1 className="mb-3">Register</h1>
                            <p className="text-danger">{error}</p>
                            <div className="form-group">
                                <label htmlFor="email_field">Email</label>
                                <input
                                    type="email"
                                    id="email_field"
                                    className="form-control"
                                    value={data.email}
                                    name="email"
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="password_field">Password</label>
                                <input
                                    type="password"
                                    id="password_field"
                                    className="form-control"
                                    value={data.password}
                                    name="password"
                                    onChange={handleChange}
                                />
                            </div>

                            <button
                                id="register_button"
                                type="submit"
                                className="btn btn-block py-3"
                                disabled={loading ? true : false}
                            >
                                REGISTER
                            </button>
                            <Link to='/login' className="float-right mt-3">Login</Link>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register
