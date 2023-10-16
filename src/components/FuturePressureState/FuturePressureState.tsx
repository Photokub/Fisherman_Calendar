import React from 'react';
import './FuturePressureState.css'

interface TomorrowPressureStatePropTypes {
    averagePressure: number,
    pressureVerdictAverage: any
}

export const FuturePressureState: React.FC<TomorrowPressureStatePropTypes> = ({
                                                                                  averagePressure,
                                                                                  pressureVerdictAverage
                                                                              }) => {
    return (
        <>
            <p className='pressure-bar__paragraph'>Среднее атмосферное давление за сутки: {averagePressure} мм/рт.ст</p>
            <p className='pressure-bar__paragraph'>{pressureVerdictAverage}</p>
        </>
    )
}