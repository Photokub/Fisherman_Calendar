import React from "react";
import './TomorrowDateContainer.css'
import {DateElement} from "../DateElement/DateElement";
import {IDay} from "../../types/types";

interface TomorrowDateContainerPropsTypes {
    todayCard: IDay,
    tomorrowCard: IDay,
    yesterdayCard: IDay
}

export const TomorrowDateContainer: React.FC<TomorrowDateContainerPropsTypes> = ({tomorrowCard, todayCard, yesterdayCard}) => {
    return (
        <section className='tomorrow-container'>
            <DateElement
                yesterdayCard={yesterdayCard}
                todayCard={todayCard}
                tomorrowCard={tomorrowCard}
            />
        </section>
    )
}