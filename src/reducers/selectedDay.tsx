const initialState = {
    day: 0
};
//const initialState = 0

export function selectedDayReducer(state = initialState, action: any) {
    switch (action.type) {
        case 'SET SELECTED DAY':
            return {...state, day: action.payload}
        default:
            return state
    }
}

console.log(selectedDayReducer)