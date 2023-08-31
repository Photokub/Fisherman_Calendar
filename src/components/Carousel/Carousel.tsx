import React, {MouseEventHandler} from "react";
import {BackButton} from '../BackButton/BackButton'
import {ForwardButton} from '../ForwardButton/ForwardButton'
import './Carousel.css'
import {ViewPort} from '../ViewPort/ViewPort'

interface CarouselPropsTypes {
    setStyleColor: any,
}

export const Carousel: React.FC<CarouselPropsTypes> = ({setStyleColor}) => {
    return (
        <section className='carousel'>
            <BackButton/>
            <ViewPort
                setStyleColor={setStyleColor}
            />
            <ForwardButton/>
        </section>
    )
}