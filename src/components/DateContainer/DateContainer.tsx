import React, {useContext} from "react";
import './DateContainer.css'
import {DateElement} from "../DateElement/DateElement";
import {TomorrowDateContainer} from "../TomorrowDateContainer/TomorrowDateContainer";
import {CurrentDateContainer} from "../CurrentDateContainer/CurrentDateContainer";
import {YesterdayDateContainer} from "../YesterdayDateContainer/YesterdayDateContainer";
import {IDay} from "../../types/types";
import {SlideContext} from "../../context/SlideContext";

interface DateContainerPropsTypes {
    // todayCard: IDay,
    // tomorrowCard: IDay,
    // yesterdayCard: IDay,
    //daysArray: any,
    //activeCard: number;
}

export const DateContainer: React.FC<DateContainerPropsTypes> = ({
                                                                     // todayCard,
                                                                     // tomorrowCard,
                                                                     // yesterdayCard
                                                                     //daysArray,
                                                                     //activeCard
                                                                 }) => {

    const {activeCard, daysArray} = useContext(SlideContext);

    return (
        <section
            className='date-container'
            style={{transform: `translateX(-${activeCard * 100}%)`}}
        >
            {daysArray.map((date: any, index) =>
                <DateElement key={index}
                             day={date.day}
                             month={date.month}
                />
            )}
        </section>
    )
}