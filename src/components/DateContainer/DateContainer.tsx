import React, {ReactNode, useContext} from "react";
import './DateContainer.css'
import {DateElement} from "../DateElement/DateElement";
import {SlideContext} from "../../context/SlideContext";
import {connect} from "react-redux";


interface DateContainerPropsTypes {
    setStyleColor: any,
    setRusMonthName: (arg: string) => ReactNode,
    daysArrayObject: any,
}

const DateContainer: React.FC<DateContainerPropsTypes> = ({
                                                              setStyleColor,
                                                              daysArrayObject,
                                                              setRusMonthName
                                                          }) => {
    const {
        selectedDay,
    } = useContext(SlideContext);

    const daysArray = daysArrayObject.days

    return (
        <section
            className='date-container'
            style={
                {
                    transform: `translateX(-${selectedDay * 100}%)`,
                }
            }
        >
            {daysArray.map((date: any, index: React.Key | null | undefined) =>
                <DateElement key={index}
                             day={date.date}
                             month={date.date}
                             style={date.astro.moon_phase}
                             setStyleColor={setStyleColor}
                             setRusMonthName={setRusMonthName}
                />
            )}
        </section>
    )
}

const mapStateToProps = (store: any) => {
    return {
        daysArrayObject: store.daysArray,
    }
}

export default connect(mapStateToProps)(DateContainer);