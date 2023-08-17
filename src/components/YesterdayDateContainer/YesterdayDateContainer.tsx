import React from "react";
import './YestardayDateContainer.css'
import {DateElement} from "../DateElement/DateElement";

export const YesterdayDateContainer: React.FC = () => {
    return (
        <section className='yesterday-container' >
            <DateElement/>
        </section>
    )
}