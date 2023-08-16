import React, {useState} from 'react';
import './App.css';
import {Carousel} from "../Carousel/Carousel";

function App() {

    const [activeCard, setActiveCard] = useState(true)
    const [yesterdayCard, setYesterdayCard] = useState({day:'1', month: 'D'})
    const [todayCard, setTodayCard] = useState({day:'2', month: 'D'})
    const [tomorrowCard, setTomorrowCard] = useState({day:'3', month: 'D'})

    function clickFroward() {
        setTodayCard(yesterdayCard)
        setTomorrowCard(todayCard)
        //в yesterdayCard пойдёт ближайший сосед массива слева
    }

    function clickBack() {
        setTodayCard(tomorrowCard)
        setYesterdayCard(todayCard)
        //в tomorrowCard пойдёт ближайший сосед массива справа
    }

    return (
        <Carousel/>
    );
}

export default App;
