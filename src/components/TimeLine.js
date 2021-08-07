import React from 'react';
import DayLine from './DayLine.js'
import { useSelector, useDispatch } from 'react-redux'
import {addEmptyInterval, loadIntervalsFromDB} from '../store/actions';

const TimeLine = function (props) {

	const intervals = useSelector(state => state.intervals);
	let markedIntervalsForDay = useSelector(state => state.markedIntervals)

	console.log('TIMELINE! STORE.INTERVALS')
	console.log(markedIntervalsForDay)
	console.log(intervals)

	const dispatch = useDispatch();

	function getData() {
		fetch(
			'http://localhost:3001/intervals?user_id=000001',
			{ method: 'GET' }
		)
			.then(response => response.json())
			.then(json => 
			{
				console.log('dispatch');
				dispatch(loadIntervalsFromDB(json))
				})
			.catch(error => console.error('error', error))
	}

	return (<div className='intervals'>
		<button className='btn getBtn' onClick={getData}>Update</button>
		<div className='IntervalsTable'>{intervals.map((day, j) => {
			//return <DayLine key={j}  currentDayArray={[...day]} dayIndex={j}/>}
			return <DayLine key={j} dayIndex={j} />
		}
		)}
		</div>
		< button className='btn addEmptyDayBtn' onClick={() => dispatch(addEmptyInterval())} > +</button >
		
	</div>)
}

export default TimeLine