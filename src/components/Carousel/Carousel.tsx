import React, {MouseEventHandler, ReactNode} from "react";
import {BackButton} from '../BackButton/BackButton'
import {ForwardButton} from '../ForwardButton/ForwardButton'
import './Carousel.css'
import {ViewPort} from '../ViewPort/ViewPort'

interface CarouselPropsTypes {
    setStyleColor: any,
    setRusMonthName: (arg: string) => ReactNode,
    clickForward: any,
    clickBack: any,
}

export const Carousel: React.FC<CarouselPropsTypes> = ({setStyleColor, setRusMonthName, clickForward, clickBack}) => {
    return (
        <section className='carousel'>
            <BackButton
                clickBack={clickBack}
            />
            <ViewPort
                setStyleColor={setStyleColor}
                setRusMonthName={setRusMonthName}
            />
            <ForwardButton
                clickForward={clickForward}
            />
        </section>
    )
}