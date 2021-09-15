import React from 'react';
import '../App.css';
import TimeLine from './TimeLine';
import SetIntervals from './SetInterval';
import { useDispatch } from 'react-redux'
import { clearMarkedIntervals } from '../store/actions';

function App(props) {

	const dispatch = useDispatch()

	function deselectIntervals(event) {
		
		if (!event.target.classList.contains('halfHour') && !event.target.classList.contains('intervalsTable')
			&& !event.target.classList.contains('dayline')) {

			dispatch(clearMarkedIntervals())	
		} 
	}

	return (
		<div className="container" onClick={deselectIntervals}>
			<SetIntervals />
			<TimeLine />
		</div>
	);
}

export default App;
