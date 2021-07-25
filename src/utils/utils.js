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