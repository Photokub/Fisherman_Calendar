import React, {useContext} from "react";
import './DateContainer.css'
import {DateElement} from "../DateElement/DateElement";
import {SlideContext} from "../../context/SlideContext";

interface DateContainerPropsTypes {
    setStyleColor: any
}

export const DateContainer: React.FC<DateContainerPropsTypes> = ({setStyleColor}) => {

    const {selectedDay, daysArray} = useContext(SlideContext);

    return (
        <section
            className='date-container'
            style={
                {
                    transform: `translateX(-${selectedDay * 100}%)`,
                }
            }
        >
            {daysArray.map((date: any, index) =>
                <DateElement key={index}
                             day={date.date}
                             month={date.date}
                             setStyleColor={setStyleColor}
                />
            )}
        </section>
    )
}