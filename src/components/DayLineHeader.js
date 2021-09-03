import React from 'react'
import {createEmptyDayLine} from '../utils/utils.js'

function DayLineHeader(props) {

	const emptyDayArray = createEmptyDayLine()
	
	return (<div className='dayline'>
				
				<div className="dateOnTheDaylineInputHeader">DATE/HOURS</div>
		
				{emptyDayArray.map((el, index) => {
					const className = `halfHour empty ${index%2 === 0 ? 'evenSquare': 'unevenSquare'}`
					return <div key={index} className={className} readOnly >{index%2 === 0 ? '' : index/2+0.5 }</div>
				})}
				
			</div>)
}

export default DayLineHeader