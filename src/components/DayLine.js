import React, { useState, useEffect } from 'react'
import DateInDayLine from './DateInDayLine.js'

function DayLine({ returnToTimeLineMarkedIntervals, returnToAppMarkedIntervals, currentDayArray }) {

	const [dayArray, setDayArray] = useState(currentDayArray)
	let [markedIntervals, setMarkedIntervals] = useState([])

    const currentDay = dayArray[0]

    useEffect(() => {
        console.log('useEffect DayLine')
        console.log(currentDay)
        console.log(markedIntervals)
        returnToTimeLineMarkedIntervals(currentDay, markedIntervals);
       
    }, [markedIntervals, currentDay])


	return (<div className='dayline'>
		{dayArray.map((el, i) => {

			if (i === 0) {
				return <DateInDayLine key={i} currentDay={el} emptyLine={dayArray[49]} />
			}

			const className = `halfHour ${el.value ? el.value : ' empty'} ${markedIntervals.includes(i) ? ' marked' : ''}`

			return <div key={i} className={className} readOnly onClick={(e) => {
				setMarkedIntervals(prev => {

					if (prev.includes(i)) {
						return prev.filter(k => k !== i)
					}
					else {
						return [...prev, i];
					}

				})		
			}}>
			</div>
		})}

	</div>)
}

export default DayLine