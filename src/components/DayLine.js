import React, { useState } from 'react'
import DateInDayLine from './DateInDayLine.js'

function DayLine({ returnToTimeLineMarkedIntervals, returnToAppMarkedIntervals, currentDayArray }) {

    const [dayArray, setDayArray] = useState(currentDayArray)
    let [markedIntervals, setMarkedIntervals] = useState([])

    let newMarkedIntervals = []

    return (<div className='dayline'>
        {dayArray.map((el, i) => {

            if (i === 0) {
                return <DateInDayLine key={i} currentDay={el} emptyLine={dayArray[49]} />
            }

            const className = `halfHour ${el.value ? el.value : ' empty'} ${markedIntervals.includes(i) ? ' marked' : ''}`

            return <div key={i} className={className} readOnly onClick={(e) => {
                setMarkedIntervals(prev => {

                    if (prev.includes(i)) {
                        newMarkedIntervals = prev.filter(k => k !== i)
                    }
                    else {
                        newMarkedIntervals = [...prev, i];
                    }
                    console.log('DayLine')
                    console.log(newMarkedIntervals)
                    return newMarkedIntervals
                })

                console.log('current DAY!!!')
                console.log(dayArray[0])
                console.log(newMarkedIntervals)
                returnToTimeLineMarkedIntervals(dayArray[0], newMarkedIntervals);

            }}>
            </div>
        })}

    </div>)
}

export default DayLine