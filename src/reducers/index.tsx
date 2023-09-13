import {combineReducers} from "redux";
import {daysReducer} from "./days";
import {forecastReducer} from "./forecast";
import {selectedDayReducer} from "./selectedDay";
//import {astroDataReducer} from "./astroData";

console.log(forecastReducer)

export const rootReducer = combineReducers({
    forecastData: forecastReducer,
    daysArray: daysReducer,
    selectedDay: selectedDayReducer,
    //astroData: astroDataReducer,
})