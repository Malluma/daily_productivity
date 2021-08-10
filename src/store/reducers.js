import { SplitArrByDayLines, createEmptyDayLine, toDateInputValue } from '../utils/utils.js'

function addMarkedIntervalsToIntervals(markedIntervals, newIntervals, activityType){

    for (const dayInMarkedIntervals in markedIntervals) {

        let dayArrayInIntervals = []
        let dayIndexInIntervals = 0;

        for (dayIndexInIntervals = 0; dayIndexInIntervals < newIntervals.length; dayIndexInIntervals++) {
            if (newIntervals[dayIndexInIntervals][0] === dayInMarkedIntervals) {
                //dayArrayInIntervals = [...state.intervals[dayIndexInIntervals]]
                dayArrayInIntervals = [...newIntervals[dayIndexInIntervals]]
                break;
            }
        }
        
        const dayArrayInMarkedIntervals = markedIntervals[dayInMarkedIntervals]
        for (let i = 0; i < dayArrayInMarkedIntervals.length; i++) {
            for (let j = 0; j < dayArrayInIntervals.length; j++) {
                if (j === dayArrayInMarkedIntervals[i]) {
                    dayArrayInIntervals[j] = { value: activityType };
                }
            }
        }

        newIntervals[dayIndexInIntervals] = dayArrayInIntervals
    }
}

const reducer = (state = { intervals: [], markedIntervals_new: {}, markedIntervals_upd: {} }, action) => {
    switch (action.type) {
        case "LOAD_INTERVALS_FROM_DB":
            return { ...state, intervals: SplitArrByDayLines(action.payload) }
        case "ADD_EMPTY_INTERVAL":
            return { ...state, intervals: [...state.intervals, [toDateInputValue(new Date()), ...createEmptyDayLine()]] }
        case "ADD_DEL_MARKED_INTERVAL":
            {   
                const { index, currentDay, value } = action.payload   
                let markedIntervalsForDay = []

                if (value) {
                    markedIntervalsForDay = state.markedIntervals_upd[currentDay]
                } else {
                    markedIntervalsForDay = state.markedIntervals_new[currentDay]
                }

                if (!markedIntervalsForDay) {
                    markedIntervalsForDay = [];
                }

                let newMarkedIntervals = [];
                if (markedIntervalsForDay.includes(index)) {                   
                    newMarkedIntervals = [...markedIntervalsForDay.filter(k => k !== index)]
                }
                else {        
                    newMarkedIntervals = [...markedIntervalsForDay, index];
                }

                if (value) {
                    return { ...state, markedIntervals_upd: { ...state.markedIntervals_upd, [currentDay]: newMarkedIntervals } }
                } else {
                    return { ...state, markedIntervals_new: { ...state.markedIntervals_new, [currentDay]: newMarkedIntervals } }
                }      
            }
        case "CLEAR_MARKED_INTERVALS":
            return { ...state, markedIntervals_new: {}, markedIntervals_upd: {} }

        case "ADD_MARKED_INTERVALS_TO_STATE_INTERVALS":
            {
                const newIntervals = [...state.intervals]
                const activityType = action.payload

                addMarkedIntervalsToIntervals(state.markedIntervals_new, newIntervals, activityType)
                addMarkedIntervalsToIntervals(state.markedIntervals_upd, newIntervals, activityType)        

                return { ...state, intervals: newIntervals }
            }
        default: return state
    }
}

export default reducer