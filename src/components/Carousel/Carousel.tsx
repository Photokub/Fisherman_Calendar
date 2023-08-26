import React from "react";
import {DateElement} from "../DateElement/DateElement";
import {BackButton} from '../BackButton/BackButton'
import {ForwardButton} from '../ForwardButton/ForwardButton'
import {DateContainer} from '../DateContainer/DateContainer'
import './Carousel.css'
import {IDay} from "../../types/types";

interface CarouselPropsTypes {
    clickForward: any,
    clickBack: any,
    daysArray: [],
    activeCard: number;
    // todayCard: IDay,
    // tomorrowCard: IDay,
    // yesterdayCard: IDay,
}

export const Carousel: React.FC<CarouselPropsTypes> = ({
                                                           clickForward,
                                                           clickBack,
                                                           daysArray,
                                                           activeCard
                                                           //tomorrowCard,
                                                           // yesterdayCard
                                                       }) => {
    return (
        <section className='carousel'>
            <BackButton
                clickBack={clickBack}
            />
            <DateContainer
                daysArray={daysArray}
                activeCard={activeCard}
            />
            <ForwardButton
                clickForward={clickForward}
            />
        </section>
    )
}