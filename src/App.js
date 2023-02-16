import React, { Component,useEffect } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import './css/yet-light-box-styles.css'
import { useNavigate,BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import CreateRoutes from './routes';
 
class App extends Component {
	
	render() {
	
		return (
			<React.Fragment>
				<ToastContainer />
				<CreateRoutes />
			</React.Fragment>
		);
	}
}

export default App;
