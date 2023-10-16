import React from "react";
import './TodayPressureState.css'

interface TodayPressureStatePropTypes {
    currentHourPressure: number,
    pressureVerdictPrv: string,
    pressureVerdictNext: string
}

export const TodayPressureState: React.FC<TodayPressureStatePropTypes> = ({
                                                                              currentHourPressure,
                                                                              pressureVerdictPrv,
                                                                              pressureVerdictNext
                                                                          }) => {
    return (
        <>
            <p className='pressure-bar__paragraph'>Сейчас атмосферное давление: {currentHourPressure}мм/рт.ст</p>
            <p className='pressure-bar__paragraph'>Сейчас {pressureVerdictPrv}</p>
            <p className='pressure-bar__paragraph'>В следующий час {pressureVerdictNext}</p>
        </>
    )
}