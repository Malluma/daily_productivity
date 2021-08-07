import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import DateInDayLine from './DateInDayLine.js'
import {addDelMarkedInterval} from '../store/actions';

function DayLine(props) {
	
	const currentDayArray = useSelector(state => state.intervals)[props.dayIndex];
	const currentDay = currentDayArray[0]
	let markedIntervalsForDay = useSelector(state => state.markedIntervals[currentDay])
	const dispatch = useDispatch()

	if (! markedIntervalsForDay) {
		markedIntervalsForDay = []
	}

	return (<div className='dayline'>
		{currentDayArray.map((el, index) => {

			if (index === 0) {
				return <DateInDayLine key={index} currentDay={el} emptyLine={currentDayArray[49]} />
			}

			if (index === 49) {
				return ''
			}

			const className = `halfHour ${el.value ? el.value : ' empty'} ${markedIntervalsForDay.includes(index) ? ' marked' : ''}`

			return <div key={index} className={className} readOnly onClick={(e) => {
				dispatch(addDelMarkedInterval({currentDay, index}))
			}}>
			</div>
		})}

	</div>)
}

export default DayLine