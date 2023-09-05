import React from "react";
import './DateElement.css';

interface CurrentDateContainerPropsTypes {
    day: any,
    month: any,
    style: any,
    setStyleColor: any,
}

export const DateElement: React.FC<CurrentDateContainerPropsTypes> = ({day, month, setStyleColor, style}) => {

    return (
        <section className='date-element'
                 style={{
                     color: setStyleColor(style),
                 }}
        >
            <h1 className='date-element__day'>{day?.slice(8)}</h1>
            <h2 className='date-element__month'>{month?.slice(5,7)}</h2>
        </section>
    )
}