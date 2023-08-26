import React from "react";
import './DateElement.css';
import {IDay} from "../../types/types";

interface CurrentDateContainerPropsTypes {
    // todayCard: IDay,
    // tomorrowCard: IDay,
    // yesterdayCard: IDay
    day: any,
    month: any,
}

export const DateElement: React.FC<CurrentDateContainerPropsTypes> = ({day, month}) => {
    return (
        <section className='date-element'>
            <h1 className='date-element__day'>{day}</h1>
            <h2 className='date-element__month'>{month}</h2>
        </section>
    )
}