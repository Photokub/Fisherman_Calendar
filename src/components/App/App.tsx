import React, {useEffect, useState, createContext, MouseEventHandler} from 'react';
import './App.css';
import {Carousel} from "../Carousel/Carousel";
import data from '../data/data.json'
import {SlideContext} from '../../context/SlideContext'

function App() {

    const [daysArray, setDaysArray] = useState<[]>([])
    const [selectedDay, setSelectedDay] = useState(0)

    useEffect(()=>{
        const dataArray = data as []
        setDaysArray(dataArray)
        console.log(selectedDay)
    }, [])

    console.log(daysArray)

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
