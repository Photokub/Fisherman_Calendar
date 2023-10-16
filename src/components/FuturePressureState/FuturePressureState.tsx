import React from 'react';
import './FuturePressureState.css'

interface TomorrowPressureStatePropTypes{
    averagePressure: number,
}

export const FuturePressureState:React.FC<TomorrowPressureStatePropTypes> = ({
                                                                                   averagePressure
                                                                               }) =>{
    return (
        <>
            <p className='pressure-bar__paragraph'>Среднее атмосферное давление за сутки: {averagePressure} мм/рт.ст</p>
        </>
    )
}