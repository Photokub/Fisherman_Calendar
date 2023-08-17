import React from "react";
import './YestardayDateContainer.css'
import {DateElement} from "../DateElement/DateElement";
import {IDay} from "../../types/types";

interface YesterdayDateContainerPropsTypes {
    todayCard: IDay,
    tomorrowCard: IDay,
    yesterdayCard: IDay,
}

export const YesterdayDateContainer: React.FC<YesterdayDateContainerPropsTypes> = ({yesterdayCard,tomorrowCard,todayCard}) => {
    return (
        <section className='yesterday-container' >
            <DateElement
                yesterdayCard={yesterdayCard}
                todayCard={todayCard}
                tomorrowCard={tomorrowCard}
            />
        </section>
    )
}