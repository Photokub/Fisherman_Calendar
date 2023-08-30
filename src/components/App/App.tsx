import React, {useEffect, useState, createContext, MouseEventHandler} from 'react';
import './App.css';
import {Carousel} from "../Carousel/Carousel";
import data from '../data/data.json'
import {SlideContext} from '../../context/SlideContext'
import {api} from "../../api/Api";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;

function App() {

    const [astroData, setAstroData] = useState({})
    const [locationData, setLocationData] = useState({})
    const [daysArray, setDaysArray] = useState<[]>([])
    const [selectedDay, setSelectedDay] = useState(0)

    useEffect(() => {
        try {
            const fetchData = async () => {
                const data = await api.getAstroData()
                if(!data){
                    throw new Error('Не удалось получить данные')
                }
                setAstroData(data.astronomy.astro)
                setLocationData(data.location)
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
    console.log(locationData)

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

    return (
        <SlideContext.Provider value={{
            clickForward,
            clickBack,
            daysArray,
            selectedDay,
        }}>
            <Carousel/>
        </SlideContext.Provider>
    );
}

export default App;
