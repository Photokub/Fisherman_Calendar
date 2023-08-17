import React, {useEffect, useState} from 'react';
import './App.css';
import {Carousel} from "../Carousel/Carousel";
import {IDay} from "../../types/types";
import data from '../data/data.json'

function App() {

    //1. создать три пирзмы-вьюпорта для дат. правая и левая искажены. центральный вьюпорт не искажен
    //2. получить массив данных
    //3. Создать 3 состояния: сегодня, вчера и завтра
    //4. Создать кнопки вперед/назад.
    // При нажатии назад: сегодня переходит в левую призму, завтра - в центральную. Из левой призмы исчезает вчера, а в правую призму приходит следующий сосед от завтра
    // При нажатии вперед: сегодня переходит в правую призму, завтра - исчезает. Вчера переходит в правую призму, а в левую призму приходит предыдущий сосед от вчера

    const [daysArray, setDaysArray] = useState([])
    const [activeCard, setActiveCard] = useState(true)
    const [yesterdayCard, setYesterdayCard] = useState<IDay>({})
    const [todayCard, setTodayCard] = useState<IDay>({})
    const [tomorrowCard, setTomorrowCard] = useState<IDay>({})

    useEffect(()=>{
        const dataArray = data as []
        setDaysArray(dataArray)
    })

    console.log(daysArray)

    function clickForward() {
        setTodayCard(yesterdayCard)
        setTomorrowCard(todayCard)
        console.log('Нажата кнопка вперёд')
        //в yesterdayCard пойдёт ближайший сосед массива слева
    }

    function clickBack() {
        setTodayCard(tomorrowCard)
        setYesterdayCard(todayCard)
        console.log('Нажата кнопка назад')
        //в tomorrowCard пойдёт ближайший сосед массива справа
    }

    return (
        <Carousel
            todayCard={todayCard}
            tomorrowCard={tomorrowCard}
            yesterdayCard={yesterdayCard}
            clickForward={clickForward}
            clickBack={clickBack}
        />
    );
}

export default App;
