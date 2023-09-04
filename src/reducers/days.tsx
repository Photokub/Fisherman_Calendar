const initialState: never[] = []

export function daysReducer(state = initialState, action: any){
    switch (action.type) {
        case 'SET DAYS ARRAY':
            return {...state, days: action.payload};

        // case CLEAR_DATA:
        //     return initialState;

        default:
            return state;
    }
}