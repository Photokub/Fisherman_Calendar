import React from "react";
import {DateElement} from "../DateElement/DateElement";
import {BackButton} from '../BackButton/BackButton'
import {ForwardButton} from '../ForwardButton/ForwardButton'
import {DateContainer} from '../DateContainer/DateContainer'
import './Carousel.css'

interface CarouselPropsTypes {
    clickForward: any,
    clickBack: any
}

export const Carousel: React.FC<CarouselPropsTypes> = ({
                                                           clickForward,
                                                           clickBack
                                                       }) => {
    return (
        <section className='carousel'>
            <BackButton
                clickBack={clickBack}
            />
            <DateContainer/>
            <ForwardButton
                clickForward={clickForward}
            />
        </section>
    )
}