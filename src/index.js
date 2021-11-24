import React from 'react';
import { render } from "react-dom";

import {
	BrowserRouter,
	Routes,
	Route
} from "react-router-dom";

import { Container } from 'react-bootstrap';
// Pages
import Homepage from './Pages/Homepage'

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css'

import reportWebVitals from './reportWebVitals';

const rootElement = document.getElementById("root");
render(
	<BrowserRouter>
		<Container className="main-container">
			<Routes>
				<Route path="/" element={<Homepage />} />

			</Routes>
		</Container>
	</BrowserRouter>,
	rootElement
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
