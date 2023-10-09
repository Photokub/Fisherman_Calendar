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
    disableBackBtn: boolean,
    disableForwardBtn: boolean,
}

export const Carousel: React.FC<CarouselPropsTypes> = ({
                                                           setStyleColor,
                                                           setRusMonthName,
                                                           clickForward,
                                                           clickBack,
                                                           disableBackBtn,
                                                           disableForwardBtn
}) => {
    return (
        <section className='carousel'>
            <BackButton
                clickBack={clickBack}
                disableBackBtn={disableBackBtn}
            />
            <ViewPort
                setStyleColor={setStyleColor}
                setRusMonthName={setRusMonthName}
            />
            <ForwardButton
                clickForward={clickForward}
                disableForwardBtn={disableForwardBtn}
            />
        </section>
    )
}