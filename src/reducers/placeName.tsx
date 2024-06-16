const initialState = {
    placeName: ""
};

export function setBrowserPlaceNameData(state = initialState, action: any) {
    switch (action.type) {
        case "SET BROWSER PLACE NAME":
            return { ...state, placeName: action.payload }
        default:
            return state
    }
}