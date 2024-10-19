import React, {ReactNode} from "react";
import './Interface.css'
import DayStatusBar from "../DayStatusBar/DayStatusBar";
import { Carousel } from "../Carousel/Carousel";
import { PressureBar } from "../PressureBar/PressureBar";
import { LocationBar } from "../LocationBar/LocationBar";

interface InterfacePropTypes {
    dayStatus: any,
    setStyleColor: any,
    setRusMonthName: (arg: string) => ReactNode,
    clickForward: any,
    clickBack: any,
    disableBackBtn: boolean,
    disableForwardBtn: boolean,
    currentHourPressure: number,
    pressureVerdictPrv: string,
    pressureVerdictNext: string,
    selectedDay: any,
    averagePressure: number,
    pressureVerdictAverage: any
}

export const Interface: React.FC<InterfacePropTypes> = ({
    dayStatus,
    setStyleColor,
    setRusMonthName,
    clickForward,
    clickBack,
    disableBackBtn,
    disableForwardBtn,
    currentHourPressure,
    pressureVerdictPrv,
    pressureVerdictNext,
    selectedDay,
    averagePressure,
    pressureVerdictAverage
}) => {
    return (
        <div className="interface">
            <DayStatusBar
                dayStatus={dayStatus}
            />
            <Carousel
                clickForward={clickForward}
                clickBack={clickBack}
                setStyleColor={setStyleColor}
                setRusMonthName={setRusMonthName}
                disableBackBtn={disableBackBtn}
                disableForwardBtn={disableForwardBtn}
            />
            <PressureBar
                currentHourPressure={currentHourPressure}
                pressureVerdictPrv={pressureVerdictPrv}
                pressureVerdictNext={pressureVerdictNext}
                selectedDay={selectedDay}
                averagePressure={averagePressure}
                pressureVerdictAverage={pressureVerdictAverage}
            />
            <LocationBar />
        </div>
    )
}