import React, { useState, useCallback } from 'react';
import DayLine from './DayLine'
import Simple from './Simple'

const TimeLine = function ({ returnToAppMarkedIntervals }) {

    const [intervalsList, setIntervalsList] = useState([]);
    const [markedIntervalsTL, setMarkedIntervalsTL] = useState({})
    const [num_TL, setNum_TL] = useState(555);

    function createEmptyDayLine(isEmpty = true) {
        const emptyDayLine = [];

        for (let i = 0; i < 48; i++) {
            emptyDayLine.push({ 'value': '' });
        }

        emptyDayLine.push(isEmpty);

        return emptyDayLine;
    }

    function SplitArrByDayLines(arr) {

        let result = [];
        let dayLine = [...createEmptyDayLine(false)]
        let prevDay = '';

        for (let i = 0; i < arr.length; i++) {

            const currentDay = arr[i].day
            console.log(currentDay)

            if (prevDay && currentDay !== prevDay) {
                result.push([prevDay, ...dayLine]);
                dayLine = [...createEmptyDayLine(false)]
            }

            dayLine[arr[i].minutes / 30].value = arr[i].value_;
            prevDay = currentDay
        }

        result.push([prevDay, ...dayLine]);

        return result;
    }

    function getData() {
        fetch(
            'http://localhost:3001/intervals?user_id=000001',
            { method: 'GET' }
        )
            .then(response => response.json())
            .then(json => setIntervalsList(SplitArrByDayLines(json)))
            .catch(error => console.error('error', error))

    }

    function formatDateToStr_ddmmyy(date) {
        let curDay = String(date.getDate())
        let curMonth = String(date.getMonth())
        let curYear = String(date.getFullYear()).slice(2, 4)
        return `${(curDay.length === 1) ? '0' + curDay : curDay}.${(curMonth.length === 1) ? '0' + curMonth : curMonth}.${curYear}`
    }

    Date.prototype.toDateInputValue = (function () {
        var local = new Date(this);
        local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
        return local.toJSON().slice(0, 10);
    });

    function addEmptyDay() {
        setIntervalsList(prev => {
            return [...prev, [(new Date).toDateInputValue(), ...createEmptyDayLine()]]
        })
    }

    function returnToTimeLineMarkedIntervals(day, markedIntervalsForDay) {

        setMarkedIntervalsTL({ ...markedIntervalsTL, [day]: [...markedIntervalsForDay] })
        console.log('markedIntervalsTL')
        console.log(day)
        console.log(markedIntervalsForDay)
        console.log(JSON.stringify(markedIntervalsTL))

        //returnToAppMarkedIntervals(markedIntervals);
    }

    const returnToTimeLine = useCallback((numFromSimple) => {
        setNum_TL(numFromSimple)
    })

    return (<div className='intervals'>
        <button className='btn getBtn' onClick={getData}>Update</button>
        <div className='IntervalsTable'>
            {intervalsList.map((day, j) => <DayLine key={j} lineIndex={j} currentDayArray={[...day]} returnToTimeLineMarkedIntervals={returnToTimeLineMarkedIntervals} returnToAppMarkedIntervals={returnToAppMarkedIntervals} />)}
        </div>
        <button className='btn addEmptyDayBtn' onClick={addEmptyDay}>+</button>
        <Simple returnToTimeLine={returnToTimeLine} />
        <div className='simpleTL'>{num_TL}</div>
    </div>)
}

export default TimeLine