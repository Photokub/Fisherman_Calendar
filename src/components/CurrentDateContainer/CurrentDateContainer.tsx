import React from "react";
import './CurrentDateContainer.css'
import {DateElement} from "../DateElement/DateElement";

export const CurrentDateContainer:React.FC = () => {
    return(
        <section className='CurrentDateContainer'>
            <DateElement/>
        </section>
    )
}