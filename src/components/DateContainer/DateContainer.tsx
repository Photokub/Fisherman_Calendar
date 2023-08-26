import React from "react";
import './DateContainer.css'
import {DateElement} from "../DateElement/DateElement";
import {TomorrowDateContainer} from "../TomorrowDateContainer/TomorrowDateContainer";
import {CurrentDateContainer} from "../CurrentDateContainer/CurrentDateContainer";
import {YesterdayDateContainer} from "../YesterdayDateContainer/YesterdayDateContainer";
import {IDay} from "../../types/types";

interface DateContainerPropsTypes {
    // todayCard: IDay,
    // tomorrowCard: IDay,
    // yesterdayCard: IDay,
    daysArray: any,
    activeCard: number;
}

export const DateContainer: React.FC<DateContainerPropsTypes> = ({
                                                                     // todayCard,
                                                                     // tomorrowCard,
                                                                     // yesterdayCard
                                                                     daysArray,
                                                                     activeCard
                                                                 }) => {
    return (
        <section className='date-container'>
            {daysArray.map((date: any) =>

                <DateElement key={date.day}
                             day={date.day}
                             month={date.month}
                />
            )}
            {/*<YesterdayDateContainer*/}
            {/*    yesterdayCard={yesterdayCard}*/}
            {/*    todayCard={todayCard}*/}
            {/*    tomorrowCard={tomorrowCard}*/}
            {/*/>*/}
            {/*<CurrentDateContainer*/}
            {/*    yesterdayCard={yesterdayCard}*/}
            {/*    todayCard={todayCard}*/}
            {/*    tomorrowCard={tomorrowCard}*/}
            {/*/>*/}
            {/*<TomorrowDateContainer*/}
            {/*    yesterdayCard={yesterdayCard}*/}
            {/*    tomorrowCard={tomorrowCard}*/}
            {/*    todayCard={todayCard}*/}
            {/*/>*/}
        </section>
    )
}