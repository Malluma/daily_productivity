import React from 'react';
import '../App.css';
import TimeLine from './TimeLine';
import SetIntervals from './SetInterval';


function App(props) {

	return (
			<div className="container">
				<SetIntervals />
				<TimeLine />
			</div>
	);
}

export default App;
