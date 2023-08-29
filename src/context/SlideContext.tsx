import {createContext, MouseEventHandler} from "react";

export const SlideContext = createContext({
    //clickForward: (direction?: number) => void {},
    clickForward: (event: MouseEventHandler<HTMLButtonElement>) => {},
    //clickForward: (MouseEventHandler<HTMLButtonElement>) => {},
    //clickBack: (direction?: number) => void {},
    clickBack: (event: MouseEventHandler<HTMLButtonElement>) => {},
    daysArray: [],
    activeCard: 0,
    changeSlide: (direction?: number) => void {}
});