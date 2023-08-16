import React from "react";
import {DateElement} from "../DateElement/DateElement";
import {BackButton} from '../BackButton/BackButton'
import {ForwardButton} from '../ForwardButton/ForwardButton'
import './Carousel.css'


export const Carousel:React.FC = () => {
    return(
        <section className='carousel'>
            <BackButton/>
            <DateElement/>
            <DateElement/>
            <DateElement/>
            <ForwardButton/>
        </section>
    )
}