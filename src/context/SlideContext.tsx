import {createContext, MouseEventHandler} from "react";

export const SlideContext = createContext({
    clickForward: (event: MouseEventHandler<HTMLButtonElement>) => {},
    clickBack: (event: MouseEventHandler<HTMLButtonElement>) => {},
    daysArray: [],
    selectedDay: 0,
});