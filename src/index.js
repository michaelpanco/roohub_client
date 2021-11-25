import React from 'react';
import { render } from "react-dom";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import {
	BrowserRouter,
	Routes,
	Route
} from "react-router-dom";

import { Container } from 'react-bootstrap';

import rootReducer from "./reducers/index";

// Pages
import Homepage from './pages/homepage'

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css'

import reportWebVitals from './reportWebVitals';

const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
);

// Support Environment variables
require('dotenv').config()

const rootElement = document.getElementById("root");

render(
	<BrowserRouter>
		<Provider store={store}>
			<Container className="main-container">
				<Routes>
					<Route path="/" element={<Homepage />} />
				</Routes>
			</Container>
		</Provider>
	</BrowserRouter>,
	rootElement
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
