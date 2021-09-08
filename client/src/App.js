import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import store from './store'
import './design.css'
import Home from './pages/home.js'
import Login from './pages/login'
import Register from './pages/register'
import jwtDecode from 'jwt-decode'
import setAuthHeader from './utils/setAuthHeader'
import { LOGIN_SUCCESS } from './actions/actionTypes'
import AuthRoute from './components/AuthRoute'

let token = localStorage.getItem('auth-token')
if (token) {
	const decode = jwtDecode(token);
	setAuthHeader(token)

	store.dispatch({
		type: LOGIN_SUCCESS,
		payload: {
			success: true,
			userId: decode.userId,
			token
		}
	})
}

function App() {
	return (
		<Router>
			<div className="App">
				<Route path='/' component={Home} exact />
				<AuthRoute path='/login' component={Login} exact />
				<AuthRoute path='/register' component={Register} exact />

			</div>
		</Router>
	);
}

export default App;
