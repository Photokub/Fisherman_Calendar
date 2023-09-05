import React, {MouseEventHandler, ReactNode} from "react";
import {BackButton} from '../BackButton/BackButton'
import {ForwardButton} from '../ForwardButton/ForwardButton'
import './Carousel.css'
import {ViewPort} from '../ViewPort/ViewPort'

interface CarouselPropsTypes {
    setStyleColor: any,
    setRusMonthName: (arg: string) => ReactNode
}

export const Carousel: React.FC<CarouselPropsTypes> = ({setStyleColor, setRusMonthName}) => {
    return (
        <section className='carousel'>
            <BackButton/>
            <ViewPort
                setStyleColor={setStyleColor}
                setRusMonthName={setRusMonthName}
            />
            <ForwardButton/>
        </section>
    )
}