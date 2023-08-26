import {createContext} from "react";

export const SlideContext = createContext({
    clickForward: () => void,
    clickBack: () => void,
    daysArray: [],
    activeCard: 0,
});