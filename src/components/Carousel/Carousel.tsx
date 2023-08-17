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
    todayCard: IDay,
    tomorrowCard: IDay,
    yesterdayCard: IDay,
}

export const Carousel: React.FC<CarouselPropsTypes> = ({
                                                           clickForward,
                                                           clickBack,
                                                           todayCard,
                                                           tomorrowCard,
                                                           yesterdayCard
                                                       }) => {
    return (
        <section className='carousel'>
            <BackButton
                clickBack={clickBack}
            />
            <DateContainer
                todayCard={todayCard}
                tomorrowCard={tomorrowCard}
                yesterdayCard={yesterdayCard}
            />
            <ForwardButton
                clickForward={clickForward}
            />
        </section>
    )
}