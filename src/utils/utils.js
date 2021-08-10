export function createEmptyDayLine(isEmpty = true) {
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
        dayLine[arr[i].minutes / 30].value = arr[i].value_;
        prevDay = currentDay
    }

    result.push([prevDay, ...dayLine]);
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