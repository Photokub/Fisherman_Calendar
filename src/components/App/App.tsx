import React, {useEffect, useState} from 'react';
import './App.css';
import {Carousel} from "../Carousel/Carousel";
import data from '../data/data.json'
import {SlideContext} from '../../context/SlideContext'
import {forecastFeatherApi} from "../../api/ForecastWeatherApi";
import {astronomyApi} from "../../api/AstronomyApi";
import {IAstro} from "../../types/types"


function App() {

    const [astroData, setAstroData] = useState<IAstro>(
        {
            'is_moon_up': 0,
            'is_sun_up': 0,
            'moon_illumination': '',
            'moon_phase': '',
            'moonrise': '',
            'moonset': '',
            'sunrise': '',
            'sunset': ''
        }
    )
    const [forecastData, setForecastData] = useState({})
    const [daysArray, setDaysArray] = useState<[]>([])
    const [selectedDay, setSelectedDay] = useState(0)

    useEffect(() => {
        try {
            const fetchData = async () => {
                const forecastData = await forecastFeatherApi.getForecastData()
                const astronomyData = await astronomyApi.getAstroData()
                if (!forecastData) {
                    throw new Error('Не удалось получить данные')
                }
                setAstroData(astronomyData.astronomy.astro)
                setForecastData(forecastData.forecast)
                setDaysArray(forecastData.forecast.forecastday)
            }
            fetchData()
        } catch (err) {
            console.log(`Ошибка ${err}`)
        }
    }, [])

    useEffect(() => {
        const dataArray = data as []
        setDaysArray(dataArray)
        console.log(selectedDay)
    }, [])

    console.log(daysArray)
    console.log(astroData)
    console.log(forecastData)

    const clickForward = () => {
        setSelectedDay(selectedDay + 1)
        console.log('Нажата кнопка вперёд')
        console.log(selectedDay)
    }

    const clickBack = () => {
        setSelectedDay(selectedDay - 1)
        console.log('Нажата кнопка назад')
        console.log(selectedDay)
    }

    const setStyleColor = () => {
        const moonPhase = astroData.moon_phase
        if (moonPhase === 'New Moon') {
            return '#ff0000'
        }
        else if (moonPhase === 'Crescent') {
            return '#59cede'
        }
        else if (moonPhase === 'First Quater') {
            return '#59DE8E'
        }
        else if (moonPhase === 'Waxing Gibbous') {
            return '#ffae00'
        }
        else if (moonPhase === 'Full Moon') {
            return '#ff0000'
        }
        else if (moonPhase === 'Waning Gibbous') {
            return '#ffae00'
        }
        else if (moonPhase === 'Last Quater') {
            return '#59DE8E'
        }
        else {
            return '#8f8b8b'
        }
    }

    return (
        <SlideContext.Provider value={{
            clickForward,
            clickBack,
            daysArray,
            selectedDay,
            astroData,
        }}>
            <Carousel
                setStyleColor = {setStyleColor()}
            />
        </SlideContext.Provider>
    );
}

export default App;
