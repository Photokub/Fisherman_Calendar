import React from "react";
import './ViewPort.css'
import {DateContainer} from "../DateContainer/DateContainer";

interface ViewPortPropsTypes {}

export const ViewPort: React.FC<ViewPortPropsTypes> = () => {
    return (
        <section className='viewport'>
            <DateContainer/>
        </section>
    )
}
