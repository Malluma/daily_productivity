/*export function createEmptyDayLine(isEmpty = true) {prev
    const emptyDayLine = [];
    for (let i = 0; i < 48; i++) {
        emptyDayLine.push({ 'value': '' });
    }
    emptyDayLine.push(isEmpty);
    return emptyDayLine;
}

export function SplitArrByDayLines(arr) {
    let result = [];

    if (arr.length) {
    let dayLine = [...createEmptyDayLine(false)]
    let prevDay = '';

    for (let i = 0; i < arr.length; i++) {
        const currentDay = arr[i].day
        console.log(currentDay)
        if (prevDay && currentDay !== prevDay) {
            result.push([prevDay, ...dayLine]);
            dayLine = [...createEmptyDayLine(false)]
        }
        dayLine[arr[i].minutes / 30].value = arr[i].activity_type;
        prevDay = currentDay
    }

    result.push([prevDay, ...dayLine]);
    }
    
    return result;
}*/

export function createEmptyDayLine() {
    const emptyDayLine = [];
    
    for (let i = 0; i < 48; i++) {
        emptyDayLine.push('');
    }
   
    return emptyDayLine;
}

export function createDayObj(currentDate, dayLine, isEmpty = false) {
    return {
        date: currentDate,
        dayIntervals: dayLine,
        isEmpty: isEmpty
    };
}

export function SplitArrByDayLines(arr) {
    let result = [];

    if (arr.length) {
        let dayLine = createEmptyDayLine()
        let prevDay = '';

        for (let i = 0; i < arr.length; i++) {
            const currentDay = arr[i].day
            if (prevDay && currentDay !== prevDay) {
                result.push(createDayObj(prevDay, dayLine))
                dayLine = createEmptyDayLine()
            }
            dayLine[arr[i].minutes / 30] = arr[i].activity_type;
            prevDay = currentDay
        }

        result.push(createDayObj(prevDay, dayLine))
    }

    return result;
}

export function toDateInputValue(date) {
    date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    return date.toJSON().slice(0, 10);
};

export function getDateStr(day, minutes) {
    let hoursStr = String(Math.trunc(minutes / 60));
    hoursStr = `${(hoursStr.length === 1) ? '0' : ''}${hoursStr}`
    let minStr = String(minutes % 60);
    minStr = `${(minStr.length === 1) ? '0' : ''}${minStr}`
    return `${day}%${hoursStr}:${minStr}:00`
}