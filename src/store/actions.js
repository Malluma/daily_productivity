export const loadIntervalsFromDB = (intervalsFromDB) => {
    return {
        type: "LOAD_INTERVALS_FROM_DB",
        payload: intervalsFromDB
    }
}

export const addEmptyInterval = () => {
    return {
        type: "ADD_EMPTY_INTERVAL"
    }
}

export const addDelMarkedInterval = ({currentDay, index}) => {
    return {
        type: "ADD_DEL_MARKED_INTERVAL",
        payload: { currentDay, index }
    }
}

export const clearMarkedIntervals = () => {
    return {
        type: "CLEAR_MARKED_INTERVALS",
    }
}

export const addUpdatedIntervalsToState = () => {
    return {
        type: "ADD_UPDATED_INTERVALS_TO_STATE",
    }
}


//export default { loadIntervalsFromDB, addEmptyInterval, addDelMarkedInterval, clearMarkedIntervals }