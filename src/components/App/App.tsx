import React, {useEffect, useState} from 'react';
import './App.css';
import {Carousel} from "../Carousel/Carousel";
import {SlideContext} from '../../context/SlideContext'
import {forecastFeatherApi} from "../../api/ForecastWeatherApi";
import {astronomyApi} from "../../api/AstronomyApi";
import {IAstro} from "../../types/types"
import { connect } from 'react-redux';
import {setDaysArray} from '../../actions/DaysArrayAction'

interface App {
    forecastData: any,
    daysArray: any,
    selectedDay: any,
    setDaysArray: ([]) => void
}

const App: React.FC<App> = (
    {
        setDaysArray,
    }
) => {

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

    const setStyleColor = (moonPhase: any) => {
        if (moonPhase === 'New Moon') {
            return '#ff0000'
        }
        else if (moonPhase === 'Waxing Crescent') {
            return '#59deb6'
        }
        else if (moonPhase === 'First Quarter') {
            return '#02ad4f'
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
        else if (moonPhase === 'Last Quarter') {
            return '#02ad4f'
        }
        else if (moonPhase === 'Waning Crescent') {
            return '#59deb6'
        }
        else {
            return '#8f8b8b'
        }
    }

    return (
        <SlideContext.Provider value={{
            clickForward,
            clickBack,
            selectedDay,
            astroData,
        }}>
            <Carousel
                setStyleColor = {setStyleColor}
            />
        </SlideContext.Provider>
    );
}

const mapStateToProps = (store: any) => {
    console.log(`Это стор: \n ${store}`)
    return {
        forecastData: store.forecastData,
        daysArray: store.daysArray,
        selectedDay: store.selectedDay,
        astroData: store.astroData
    }
}

const mapDispatchToProps = (dispatch: (arg0: { type: string; payload?: object; }) => object) => ({
    setDaysArray: (day: object) => dispatch(setDaysArray(day))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
