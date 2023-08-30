import React, {MouseEventHandler} from "react";
import {BackButton} from '../BackButton/BackButton'
import {ForwardButton} from '../ForwardButton/ForwardButton'
import './Carousel.css'
import {ViewPort} from '../ViewPort/ViewPort'

interface CarouselPropsTypes {}

export const Carousel: React.FC<CarouselPropsTypes> = () => {
    return (
        <section className='carousel'>
            <BackButton/>
            <ViewPort/>
            <ForwardButton/>
        </section>
    )
}