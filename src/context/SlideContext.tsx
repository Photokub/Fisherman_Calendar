import {createContext, MouseEventHandler} from "react";

export const SlideContext = createContext({
    clickForward: (event: MouseEventHandler<HTMLButtonElement>) => {},
    clickBack: (event: MouseEventHandler<HTMLButtonElement>) => {},
    daysArray: [],
    selectedDay: 0,
    astroData: {
        'is_moon_up': 0,
        'is_sun_up': 0,
        'moon_illumination': '',
        'moon_phase': '',
        'moonrise': '',
        'moonset': '',
        'sunrise': '',
        'sunset': ''
    },
});