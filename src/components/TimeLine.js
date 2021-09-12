import React from 'react';
import DayLine from './DayLine.js'
import DayLineHeader from './DayLineHeader.js'
import { useSelector, useDispatch } from 'react-redux'
import { addEmptyDay, loadProductivityDaysFromDB} from '../store/actions';

const TimeLine = function (props) {

	const productivityDays = useSelector(state => state.days);

	// console.log('TIMELINE! STORE.INTERVALS')
	// console.log(intervals)

	const dispatch = useDispatch();

	function getData() {
		fetch(
			'http://localhost:3001/intervals?user_id=000001',
			{ method: 'GET' }
		)
			.then(response => response.json())
			.then(json => dispatch(loadProductivityDaysFromDB(json)))
			.catch(error => console.error('error', error))
	}

	return (<div className='intervals'>
		<button className='btn getBtn' onClick={getData}>Update</button>
		<div className='IntervalsTable'>
			<DayLineHeader />
			{productivityDays.map((day, j) => {
			return <DayLine key={j} dayIndex={j} />
		}
		)}
		</div>
		< button className='btn addEmptyDayBtn' onClick={() => dispatch(addEmptyDay())} > +</button >
		
	</div>)
}

export default TimeLine