import React, {ReactNode} from "react";
import './DateElement.css';

interface CurrentDateContainerPropsTypes {
    day: any,
    month: any,
    style: any,
    setStyleColor: any,
    setRusMonthName: (arg: string) => ReactNode,
}

export const DateElement: React.FC<CurrentDateContainerPropsTypes> = ({day, month, setStyleColor, style, setRusMonthName}) => {

    return (
        <section className='date-element'
                 style={{
                     color: setStyleColor(style),
                 }}
        >
            <h1 className='date-element__day'>{day?.slice(8)}</h1>
            <h2 className='date-element__month'>{setRusMonthName(month?.slice(5,7))}</h2>
        </section>
    )
}