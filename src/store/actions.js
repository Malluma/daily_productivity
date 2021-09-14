export const loadProductivityDaysFromDB = (productivityDaysFromDB) => {
    return {
        type: "LOAD_PRODUCTIVITY_DAYS_FROM_DB",
        payload: productivityDaysFromDB
    }
}

export const addEmptyDay = () => {
    return {
        type: "ADD_EMPTY_DAY"
    }
}

export const setSelectedDate = (payload) => {
    return {
        type: "SET_SELECTED_DATE",
        payload: payload

    }
}

export const addDelMarkedInterval = ({ currentDay, index, activityType}) => {
    return {
        type: "ADD_DEL_MARKED_INTERVAL",
        payload: { currentDay, index, activityType }
    }
}

export const addMarkedInterval = ({ currentDay, index, activityType }) => {
    return {
        type: "ADD_MARKED_INTERVAL",
        payload: { currentDay, index, activityType }
    }
}

export const clearMarkedIntervals = () => {
    return {
        type: "CLEAR_MARKED_INTERVALS",
    }
}

export const addMarkedIntervalsToDays = (activityType) => {
    return {
        type: "ADD_MARKED_INTERVALS_TO_DAYS",
        payload: activityType
    }
}