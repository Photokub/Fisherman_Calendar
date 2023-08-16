import React from "react";
import './DateContainer.css'
import {DateElement} from "../DateElement/DateElement";

export const DateContainer:React.FC = () => {
    return(
        <section className='date-container'>
            <DateElement/>
            <DateElement/>
            <DateElement/>
        </section>
    )
}