const initialState = {
    days: [],
    isFetching: false
}

export function daysReducer(state = initialState, action: any){
    switch (action.type) {
        case 'SET DAYS ARRAY':
            return {...state, days: action.payload};

        default:
            return state;
    }
}