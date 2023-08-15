import React from "react";
import {DateElement} from "../DateElement/DateElement";
import './Carousel.css'


export const Carousel:React.FC = () => {
    return(
        <section className='carousel'>
            <DateElement/>
            <DateElement/>
            <DateElement/>
        </section>
    )
}