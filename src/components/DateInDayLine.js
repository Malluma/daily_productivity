import React from 'react';
import { useDispatch } from 'react-redux'
import { setSelectedDate } from '../store/actions';

function DateInDayLine({ dayIndex, currentDay, emptyLine }) {
    
    const dispatch = useDispatch()

    return (
        <input
            className="dateOnTheDaylineInput"
            type="date"
            value={currentDay}
            onChange={(event) => {
                dispatch(setSelectedDate({ dayIndex: dayIndex, selectedDate: event.target.value }))     
            }}
            readOnly={!emptyLine}
        />
    );
}

export default DateInDayLine;
