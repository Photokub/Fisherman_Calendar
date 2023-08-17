import React from "react";
import './DateElement.css';
import {IDay} from "../../types/types";

interface CurrentDateContainerPropsTypes {
    todayCard: IDay,
    tomorrowCard: IDay,
    yesterdayCard: IDay
}

export const DateElement: React.FC<CurrentDateContainerPropsTypes> = ({todayCard}) => {
    return (
        <section className='date-element'>
            <h1 className='date-element__number'>{todayCard.day}</h1>
            <h2 className='date-element__month'>{todayCard.month}</h2>
        </section>
    )
}