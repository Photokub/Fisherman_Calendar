import React from "react";
import './TomorrowDateContainer.css'
import {DateElement} from "../DateElement/DateElement";

export const TomorrowDateContainer: React.FC = () => {
    return (
        <section className='tomorrow-container'>
            <DateElement/>
        </section>
    )
}