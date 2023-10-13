import React from 'react';
import './PressureBar.css'

interface PressureBarPropTypes{
    currentHourPressure: number,
    pressureIndexPrv: number,
    pressureVerdictPrv: string,
    pressureVerdictNext: string
}

export const PressureBar:React.FC<PressureBarPropTypes> = ({
                                                               currentHourPressure,
                                                               pressureVerdictPrv,
                                                               pressureVerdictNext
}) => {
    return(
        <section className='pressure-bar'>
            <p className='pressure-bar__paragraph'>Сейчас атмосферное давление: {currentHourPressure}мм/рт.ст</p>
            <p className='pressure-bar__paragraph'>Сейчас {pressureVerdictPrv}</p>
            <p className='pressure-bar__paragraph'>В следующий час {pressureVerdictNext}</p>
        </section>
    )
}