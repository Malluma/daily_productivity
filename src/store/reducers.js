import { SplitArrByDayLines, createEmptyDayLine, toDateInputValue } from '../utils/utils.js'

const reducer = (state = { intervals: [], markedIntervals: {} }, action) => {
    switch (action.type) {
        case "LOAD_INTERVALS_FROM_DB":
            return { ...state, intervals: SplitArrByDayLines(action.payload) }
        case "ADD_EMPTY_INTERVAL":
            return { ...state, intervals: [...state.intervals, [toDateInputValue(new Date()), ...createEmptyDayLine()]] }
        case "ADD_DEL_MARKED_INTERVAL":
            {
                const { index, currentDay } = action.payload
                let markedIntervalsForDay = state.markedIntervals[currentDay]

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

                return { ...state, markedIntervals: { ...state.markedIntervals, [currentDay]: newMarkedIntervals } }
            }
        case "CLEAR_MARKED_INTERVALS":
            return { ...state, markedIntervals: {} }

        case "ADD_UPDATED_INTERVALS_TO_STATE":
            {
                const newIntervals = [...state.intervals]

                for (const dayInMarkedIntervals in state.markedIntervals) {

                    let dayArrayInIntervals = []
                    let dayIndexInIntervals = 0;

                    for (dayIndexInIntervals = 0; dayIndexInIntervals < state.intervals.length; dayIndexInIntervals++) {
                        if (state.intervals[dayIndexInIntervals][0] === dayInMarkedIntervals) {
                            dayArrayInIntervals = [...state.intervals[dayIndexInIntervals]]
                            break;
                        }
                    }
                    const dayArrayInMarkedIntervals = state.markedIntervals[dayInMarkedIntervals]
                    for (let i = 0; i < dayArrayInMarkedIntervals.length; i++) {
                        for (let j = 0; j < dayArrayInIntervals.length; j++) {
                            if (j === dayArrayInMarkedIntervals[i]) {
                                dayArrayInIntervals[j] = { value: action.payload };
                            }
                        }
                    }
                    newIntervals[dayIndexInIntervals] = dayArrayInIntervals
                }

                return { ...state, intervals: newIntervals }
            }
        default: return state
    }
}

export default reducer