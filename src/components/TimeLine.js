import React, { useState, useEffect } from 'react';
import DayLine from './DayLine'
import { SplitArrByDayLines, createEmptyDayLine, toDateInputValue } from '../utils/utils.js'

const TimeLine = function ({ returnToAppMarkedIntervals }) {

	const [intervalsList, setIntervalsList] = useState([]);
	const [markedIntervalsTL, setMarkedIntervalsTL] = useState({})

	function getData() {
		fetch(
			'http://localhost:3001/intervals?user_id=000001',
			{ method: 'GET' }
		)
			.then(response => response.json())
			.then(json => setIntervalsList(SplitArrByDayLines(json)))
			.catch(error => console.error('error', error))
	}

	function addEmptyDay() {
		setIntervalsList(prev => {
			return [...prev, [toDateInputValue(new Date()), ...createEmptyDayLine()]]
		})
	}

	useEffect(() => {
		console.log('useEffect markedIntervalsTL')
		console.log(JSON.stringify(markedIntervalsTL))
		returnToAppMarkedIntervals(markedIntervalsTL);

	}, [markedIntervalsTL])

	function returnToTimeLineMarkedIntervals(day, markedIntervalsForDay) {
		setMarkedIntervalsTL({ ...markedIntervalsTL, [day]: [...markedIntervalsForDay] })
	}

	return (<div className='intervals'>
		<button className='btn getBtn' onClick={getData}>Update</button>
		<div className='IntervalsTable'>
			{intervalsList.map((day, j) => <DayLine key={j} lineIndex={j} currentDayArray={[...day]} returnToTimeLineMarkedIntervals={returnToTimeLineMarkedIntervals} returnToAppMarkedIntervals={returnToAppMarkedIntervals} />)}
		</div>
		<button className='btn addEmptyDayBtn' onClick={addEmptyDay}>+</button>
	</div>)
}

export default TimeLine