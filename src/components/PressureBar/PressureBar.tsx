import React from 'react';
import './PressureBar.css'
import {TodayPressureState} from "../TodayPressureState/TodayPressureState";
import {FuturePressureState} from "../FuturePressureState/FuturePressureState";

interface PressureBarPropTypes {
    currentHourPressure: number,
    pressureVerdictPrv: string,
    pressureVerdictNext: string,
    selectedDay: any,
    averagePressure: number,
}

export const PressureBar: React.FC<PressureBarPropTypes> = ({
                                                                currentHourPressure,
                                                                pressureVerdictPrv,
                                                                pressureVerdictNext,
                                                                selectedDay,
                                                                averagePressure
                                                            }) => {
    return (
        <section className='pressure-bar'>
            {selectedDay === 0 ?
                <TodayPressureState
                    currentHourPressure={currentHourPressure}
                    pressureVerdictPrv={pressureVerdictPrv}
                    pressureVerdictNext={pressureVerdictNext}
                />
                :
                <FuturePressureState
                    averagePressure={averagePressure}
                />
            }
        </section>
    )
}