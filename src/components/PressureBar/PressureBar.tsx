import React from 'react';
import './PressureBar.css'

interface PressureBarPropTypes{
    currentHourPressure: number,
    pressureIndex: number,
    pressureVerdict: string
}

export const PressureBar:React.FC<PressureBarPropTypes> = ({
                                                               currentHourPressure,
                                                               pressureIndex,
                                                               pressureVerdict
}) => {
    return(
        <section className='pressure-bar'>
            <p className='pressure-bar__paragraph'>Сейчас атмосферное давление: {currentHourPressure}мм/рт.ст</p>
            <p className='pressure-bar__paragraph'>Сейчас {pressureVerdict}</p>
            <p className='pressure-bar__paragraph'>В ближайший час давление будет расти</p>
        </section>
    )
}