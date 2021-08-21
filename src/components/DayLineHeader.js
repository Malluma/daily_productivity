import React from 'react'
import {createEmptyDayLine} from '../utils/utils.js'

function DayLineHeader(props) {

	const emptyDayArray = createEmptyDayLine()
	
	return (<div className='dayline'>
		
		{emptyDayArray.map((el, index) => {

			if (index === 0) {
				return <div className="dateOnTheDaylineInputHeader">DATE/HOURS</div>
			}

			if (index === 49) {
				return ''
			}
			
			const className = `halfHour empty ${index%2 === 0 ? 'unevenSquare': 'evenSquare'}`
			return <div key={index} className={className} readOnly >{index%2 === 0 ? index/2 : ''}</div>
		})}

	</div>)
}

export default DayLineHeader