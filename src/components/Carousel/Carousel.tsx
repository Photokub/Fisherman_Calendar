import React, {MouseEventHandler} from "react";
import {DateElement} from "../DateElement/DateElement";
import {BackButton} from '../BackButton/BackButton'
import {ForwardButton} from '../ForwardButton/ForwardButton'
import {DateContainer} from '../DateContainer/DateContainer'
import './Carousel.css'
import '../DateContainer/DateContainer.css'
import {IDay} from "../../types/types";

interface CarouselPropsTypes {
    //clickForward: any,
    //clickBack: any,
    daysArray: [],
    activeCard: number,
    changeSlide: any
    //changeSlide: (direction?: number) => MouseEventHandler<HTMLButtonElement> | undefined,
    //changeSlide: (event: MouseEvent) => void,
    // todayCard: IDay,
    // tomorrowCard: IDay,
    // yesterdayCard: IDay,
}

export const Carousel: React.FC<CarouselPropsTypes> = ({
                                                           //clickForward,
                                                           //clickBack,
                                                           daysArray,
                                                           activeCard,
                                                           changeSlide
                                                           //tomorrowCard,
                                                           // yesterdayCard
                                                       }) => {
    return (
        <section className='carousel'>
            <BackButton
                //clickBack={clickBack}
                changeSlide={changeSlide}
            />
            {/*<div className='carousel__view-port'></div>*/}

            {/*здесь нужен родительский контейнер под вьюпорт*/}

            <DateContainer
                //daysArray={daysArray}
                //activeCard={activeCard}
            />
            <ForwardButton
                //clickForward={clickForward}
                changeSlide={changeSlide}
            />
        </section>
    )
}