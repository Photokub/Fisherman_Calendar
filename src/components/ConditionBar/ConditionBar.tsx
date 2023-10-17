import React from 'react'
import './ConditionBar.css'

interface ConditionBarPropTypes{

}

export const ConditionBar:React.FC<ConditionBarPropTypes> = ({}) => {
    let weatherIcon = 'https://cdn.weatherapi.com/weather/64x64/night/368.png';
    return(
        <section className='condition-bar'>
            <p className='pressure-bar__paragraph'>УУУУУУУУ</p>
            <p className='pressure-bar__paragraph'>ЗАРЯДИЛ!</p>
            <img src={weatherIcon}/>
        </section>
    )
}