import React, {useEffect, useState, createContext} from 'react';
import './App.css';
import {Carousel} from "../Carousel/Carousel";
import {IDay} from "../../types/types";
import data from '../data/data.json'
import {SlideContext} from '../../context/SlideContext'

function App() {

    //1. создать три пирзмы-вьюпорта для дат. правая и левая искажены. центральный вьюпорт не искажен
    //2. получить массив данных
    //3. Создать 3 состояния: сегодня, вчера и завтра
    //4. Создать кнопки вперед/назад.
    // При нажатии назад: сегодня переходит в левую призму, завтра - в центральную. Из левой призмы исчезает вчера, а в правую призму приходит следующий сосед от завтра
    // При нажатии вперед: сегодня переходит в правую призму, завтра - исчезает. Вчера переходит в правую призму, а в левую призму приходит предыдущий сосед от вчера

    const [daysArray, setDaysArray] = useState<[]>([])
    const [activeCard, setActiveCard] = useState(0)
    const [currentCard, setCurrentCard] = useState<IDay>({})
    const [yesterdayCard, setYesterdayCard] = useState<IDay>({})
    const [todayCard, setTodayCard] = useState<IDay>({})
    const [tomorrowCard, setTomorrowCard] = useState<IDay>({})



    useEffect(()=>{
        const dataArray = data as []
        setDaysArray(dataArray)
    })

    // function handleCard(card: any){
    //     if (daysArray.find()){
    //         setCurrentCard(card)
    //         console.log(card)
    //     }
    // }

    console.log(daysArray)

    // function clickForward() {
    //     setActiveCard(activeCard + 1)
    //     console.log('Нажата кнопка вперёд')
    //     console.log(activeCard)
    //
    // }

    // function clickBack() {
    //     setActiveCard(activeCard - 1)
    //     console.log('Нажата кнопка назад')
    //     console.log(activeCard)
    // }

    const clickForward = (): any => {
        setActiveCard(activeCard + 1)
        console.log('Нажата кнопка вперёд')
        console.log(activeCard)
    }

    const clickBack = (): any => {
        setActiveCard(activeCard - 1)
        console.log('Нажата кнопка назад')
        console.log(activeCard)
    }

    return (
        <SlideContext.Provider value={{
            clickForward,
            clickBack,
            daysArray,
            activeCard
        }}>
        <Carousel
            clickForward={clickForward}
            clickBack={clickBack}
            daysArray={daysArray}
            activeCard={activeCard}
        />
        </SlideContext.Provider>
    );
}

export default App;
