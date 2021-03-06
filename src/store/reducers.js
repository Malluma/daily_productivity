import { SplitArrByDayLines, createEmptyDayLine, createDayObj, toDateInputValue } from '../utils/utils.js'

function addMarkedIntervalsToDays(markedIntervals, newDays, activityType){

    for (const dayInMarkedIntervals in markedIntervals) {

        let dayObjInDays = {}
        let dayIntervalsInDays = []
        let dayIndexInDays = 0

        for (dayIndexInDays = 0; dayIndexInDays < newDays.length; dayIndexInDays++) {
          if (newDays[dayIndexInDays].date === dayInMarkedIntervals) {
                
                dayObjInDays = newDays[dayIndexInDays]
                dayIntervalsInDays = [...dayObjInDays.dayIntervals]
                break;
            }
        }
        
        const dayArrayInMarkedIntervals = markedIntervals[dayInMarkedIntervals]
        for (let i = 0; i < dayArrayInMarkedIntervals.length; i++) {
            for (let j = 0; j < dayIntervalsInDays.length; j++) {
                if (j === dayArrayInMarkedIntervals[i]) {
                    dayIntervalsInDays[j] = activityType

                }
            }
        }

        newDays[dayIndexInDays] = {...dayObjInDays, dayIntervals: dayIntervalsInDays}
    }
}

const reducer = (state = { days: [], markedIntervals_new: {}, markedIntervals_upd: {} }, action) => {
    switch (action.type) {
        case "LOAD_PRODUCTIVITY_DAYS_FROM_DB":
            return { ...state, days: SplitArrByDayLines(action.payload), markedIntervals_new: {}, markedIntervals_upd: {} }
        case "ADD_EMPTY_DAY":
            return { ...state, days: [...state.days, createDayObj(toDateInputValue(new Date()), createEmptyDayLine(), true)] }
        case "SET_SELECTED_DATE":
            let newDays = []
        
            for (let i=0; i<state.days.length; i++){
            
                if(i === action.payload.dayIndex) {
                    newDays.push({ ...state.days[i], date: action.payload.selectedDate })
                }else {
                    newDays.push({...state.days[i]})
                }
            }
            return { ...state, days: newDays }
        case "ADD_DEL_MARKED_INTERVAL"://for single selection
            {   
                const { index, currentDay, activityType, selectPairedIntervals } = action.payload
                let pairedIndex = 999;
                if (selectPairedIntervals) {
                    pairedIndex = (index%2 === 0) ? index + 1 : index - 1
                }
               
                let markedIntervalsForDay = []

                if (activityType) {
                    markedIntervalsForDay = state.markedIntervals_upd[currentDay]
                } else {
                    markedIntervalsForDay = state.markedIntervals_new[currentDay]
                }

                if (!markedIntervalsForDay) {
                    markedIntervalsForDay = [];
                }

                let newMarkedIntervals = [];
                if (markedIntervalsForDay.includes(index) || markedIntervalsForDay.includes(pairedIndex)) {
                    newMarkedIntervals = [...markedIntervalsForDay.filter(k => k !== index && k !== pairedIndex)]
                }
                else {        
                    newMarkedIntervals = [...markedIntervalsForDay, index, pairedIndex];
                }

                if (activityType) {
                    return { ...state, markedIntervals_upd: { ...state.markedIntervals_upd, [currentDay]: newMarkedIntervals } }
                } else {
                    return { ...state, markedIntervals_new: { ...state.markedIntervals_new, [currentDay]: newMarkedIntervals } }
                }      
            }
        case "ADD_MARKED_INTERVAL"://for multiple selection
            {
                const { index, currentDay, activityType } = action.payload
                console.log(`ADD_MARKED_INTERVAL ${index} ${activityType} ${currentDay}`)
    
                let markedIntervalsForDay = []

                if (activityType) {
                    markedIntervalsForDay = state.markedIntervals_upd[currentDay]
                } else {
                    markedIntervalsForDay = state.markedIntervals_new[currentDay]
                }

                if (!markedIntervalsForDay) {
                    markedIntervalsForDay = [];
                }

                console.log(`markedIntervalsForDay: ${markedIntervalsForDay}`)

                let newMarkedIntervals = [];
                if (markedIntervalsForDay.includes(index)) {
                    newMarkedIntervals = [...markedIntervalsForDay]
                }
                else {
                    newMarkedIntervals = [...markedIntervalsForDay, index];
                }

                if (activityType) {
                    console.log(`UPD:`)
                    console.log(newMarkedIntervals)
                    return { ...state, markedIntervals_upd: { ...state.markedIntervals_upd, [currentDay]: newMarkedIntervals } }
                } else {
                    console.log(`NEW:`)
                    console.log(newMarkedIntervals)
                    return { ...state, markedIntervals_new: { ...state.markedIntervals_new, [currentDay]: newMarkedIntervals } }
                }
            }
        case "CLEAR_MARKED_INTERVALS":
            return { ...state, markedIntervals_new: {}, markedIntervals_upd: {} }
        case "ADD_MARKED_INTERVALS_TO_DAYS":
            {
                const newDays = [...state.days]
                const activityType = action.payload

                addMarkedIntervalsToDays(state.markedIntervals_new, newDays, activityType)
                addMarkedIntervalsToDays(state.markedIntervals_upd, newDays, activityType)        

                return { ...state, days: newDays }
            }
        default: return state
    }
}

export default reducer