import React, { useState} from 'react';
import '../App.css';
import TimeLine from './TimeLine';
import SetIntervals from './SetInterval';

function App() {
	const [intervalsForUpdate, setIntervalsForUpdate] = useState([]);

	function returnToAppMarkedIntervals(value) {
		setIntervalsForUpdate(value);
	}

	return (
		<div className="app">
			<main>
				<div className="container">
					<SetIntervals intervalsForUpdate={intervalsForUpdate} />
          			<TimeLine returnToAppMarkedIntervals={returnToAppMarkedIntervals} />
				</div>
			</main>
		</div>
	);
}

export default App;
