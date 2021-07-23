import React, { useState } from 'react';
import '../App.css';
import TimeLine from './TimeLine';
import SetIntervals from './SetInterval';

function App() {
	const [intervalsForUpdate, setIntervalsForUpdate] = useState([]);

	function returnToAppMarkedIntervals(value) {
		setIntervalsForUpdate(value);
		console.log('APP');
		console.log(intervalsForUpdate);
	}

	return (
		<div className="app">
			<main>
				<div className="container">
					<SetIntervals value={intervalsForUpdate} />
					<TimeLine callback={returnToAppMarkedIntervals} />
				</div>
			</main>
		</div>
	);
}

export default App;
