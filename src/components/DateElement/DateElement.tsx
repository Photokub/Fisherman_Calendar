import React from "react";
import './DateElement.css';

export const DateElement: React.FC = () => {
    return (
        <section className='date-element'>
            <h1 className='date-element__number'>24</h1>
            <h2 className='date-element__month'>Декабря</h2>
        </section>
    )
}