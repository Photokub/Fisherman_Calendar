import React from "react";
import './DateContainer.css'
import {DateElement} from "../DateElement/DateElement";
import {TomorrowDateContainer} from "../TomorrowDateContainer/TomorrowDateContainer";
import {CurrentDateContainer} from "../CurrentDateContainer/CurrentDateContainer";
import {YesterdayDateContainer} from "../YesterdayDateContainer/YesterdayDateContainer";

export const DateContainer:React.FC = () => {
    return(
        <section className='date-container'>
            <YesterdayDateContainer/>
            <CurrentDateContainer/>
            <TomorrowDateContainer/>
        </section>
    )
}