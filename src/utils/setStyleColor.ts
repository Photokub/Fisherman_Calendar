import {handleHueValue} from "./handleHueValue";
import {indexPressureConv} from "./indexPressureConv";
import {handleHueParam} from "./handleHueParam";

export const setStyleColor = (moonPhase: string, day: number, pressAvr: number, pressPrv: number) => {
    switch (moonPhase) {
        case 'New Moon':
            return `hsl(${handleHueValue(0, indexPressureConv(handleHueParam(day, pressAvr, pressPrv))!)}, 90%, 45%)`;
        case 'Waxing Crescent':
            return `hsl(${handleHueValue(80, indexPressureConv(handleHueParam(day, pressAvr, pressPrv))!)}, 90%, 45%)`;
        case 'First Quarter':
            return `hsl(${handleHueValue(120, indexPressureConv(handleHueParam(day, pressAvr, pressPrv))!)}, 90%, 45%)`;
        case 'Waxing Gibbous':
            return `hsl(${handleHueValue(40, indexPressureConv(handleHueParam(day, pressAvr, pressPrv))!)}, 90%, 45%)`;
        case 'Full Moon':
            return `hsl(${handleHueValue(0, indexPressureConv(handleHueParam(day, pressAvr, pressPrv))!)}, 90%, 45%)`;
        case 'Waning Gibbous':
            return `hsl(${handleHueValue(40, indexPressureConv(handleHueParam(day, pressAvr, pressPrv))!)}, 90%, 45%)`;
        case 'Last Quarter' :
            return `hsl(${handleHueValue(120, indexPressureConv(handleHueParam(day, pressAvr, pressPrv))!)}, 90%, 45%)`
        case 'Waning Crescent':
            return `hsl(${handleHueValue(80, indexPressureConv(handleHueParam(day, pressAvr, pressPrv))!)}, 90%, 45%)`;
        default:
            return '#8f8b8b'
    }
}