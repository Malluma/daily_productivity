import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import DateInDayLine from './DateInDayLine.js'
import {addDelMarkedInterval} from '../store/actions';

function DayLine(props) {
	
	const currentDayArray = useSelector(state => state.intervals)[props.dayIndex];
	const currentDay = currentDayArray[0]

	let markedIntervalsForDay_new = useSelector(state => state.markedIntervals_new[currentDay])
	if (!markedIntervalsForDay_new) {
		markedIntervalsForDay_new = []
	}
	let markedIntervalsForDay_upd = useSelector(state => state.markedIntervals_upd[currentDay])
	if (!markedIntervalsForDay_upd) {
		markedIntervalsForDay_upd= []
	}
	const markedIntervalsForDay = markedIntervalsForDay_new.concat(markedIntervalsForDay_upd)
	const dispatch = useDispatch()

	return (<div className='dayline'>
		{currentDayArray.map((el, index) => {

			if (index === 0) {
				return <DateInDayLine key={index} dayIndex={props.dayIndex} currentDay={el} emptyLine={currentDayArray[49]} />
			}

			if (index === 49) {
				return ''
			}

			const className = `halfHour ${el.value ? el.value : ' empty'} ${markedIntervalsForDay.includes(index) ? ' marked' : ''} ${index%2 === 0 ? 'unevenSquare': 'evenSquare'}`

			return <div key={index} className={className} readOnly onClick={(e) => {
				dispatch(addDelMarkedInterval({currentDay, index, value: el.value}))
			}}>
			</div>
		})}

	</div>)
}

export default DayLine