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

export const addDelMarkedInterval = ({currentDay, index, value}) => {
    return {
        type: "ADD_DEL_MARKED_INTERVAL",
        payload: { currentDay, index, value }
    }
}

export const clearMarkedIntervals = () => {
    return {
        type: "CLEAR_MARKED_INTERVALS",
    }
}

export const addMarkedIntervalsToStateIntervals = (activityType) => {
    return {
        type: "ADD_MARKED_INTERVALS_TO_STATE_INTERVALS",
        payload: activityType
    }
}