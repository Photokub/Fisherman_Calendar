import React from "react";
import './DateContainer.css'
import {DateElement} from "../DateElement/DateElement";
import {TomorrowDateContainer} from "../TomorrowDateContainer/TomorrowDateContainer";
import {CurrentDateContainer} from "../CurrentDateContainer/CurrentDateContainer";
import {YesterdayDateContainer} from "../YesterdayDateContainer/YesterdayDateContainer";
import {IDay} from "../../types/types";

interface DateContainerPropsTypes {
    todayCard: IDay,
    tomorrowCard: IDay,
    yesterdayCard: IDay,
}

export const DateContainer:React.FC<DateContainerPropsTypes> = ({todayCard, tomorrowCard, yesterdayCard}) => {
    return(
        <section className='date-container'>
            <YesterdayDateContainer
                yesterdayCard={yesterdayCard}
                todayCard={todayCard}
                tomorrowCard={tomorrowCard}
            />
            <CurrentDateContainer
                yesterdayCard={yesterdayCard}
                todayCard={todayCard}
                tomorrowCard={tomorrowCard}
            />
            <TomorrowDateContainer
                yesterdayCard={yesterdayCard}
                tomorrowCard={tomorrowCard}
                todayCard={todayCard}
            />
        </section>
    )
}