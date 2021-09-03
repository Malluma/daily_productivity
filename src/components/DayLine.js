import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import DateInDayLine from './DateInDayLine.js'
import {addDelMarkedInterval} from '../store/actions';

function DayLine(props) {
	
	const currentDayObj = useSelector(state => state.intervals)[props.dayIndex];
	const currentDay = currentDayObj.date;

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
				<DateInDayLine dayIndex={props.dayIndex} currentDay={currentDay} emptyLine={currentDayObj.isEmpty} />
				
				{currentDayObj.dayIntervals.map((activityType, index) => {
					const className = `halfHour ${activityType ? activityType : ' empty'} ${markedIntervalsForDay.includes(index) ? ' marked' : ''} ${index%2 === 0 ? 'evenSquare': 'unevenSquare'}`
					return <div key={index} className={className} readOnly onClick={(e) => {
						dispatch(addDelMarkedInterval({ currentDay, index, activityType}))
					}
				}>
			</div>
		})}

	</div>)
}

export default DayLine