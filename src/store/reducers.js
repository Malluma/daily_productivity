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

                 if (! markedIntervalsForDay) {
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
            return {...state, markedIntervals: {}}
        case "ADD_UPDATED_INTERVALS_TO_STATE":
            {
                //state.markedIntervals
                return { ...state, intervals: {} }
            }
        default:
            return state
    }
}

export default reducer
