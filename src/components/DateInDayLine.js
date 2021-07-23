import React, { useState } from 'react';

function DateInDayLine({ currentDay, emptyLine }) {
    let [day, setDay] = useState(currentDay);

    return (
        <input
            className="dateOnTheDaylineInput"
            type="date"
            value={day}
            onChange={(event) => {
                setDay(event.target.value);
            }}
            readOnly={!emptyLine}
        />
    );
}

export default DateInDayLine;
