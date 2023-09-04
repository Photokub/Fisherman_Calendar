import React, {useContext} from "react";
import './DateContainer.css'
import {DateElement} from "../DateElement/DateElement";
import {SlideContext} from "../../context/SlideContext";
import {connect} from "react-redux";


interface DateContainerPropsTypes {
    setStyleColor: any,
    daysArrayObject: any,
}

const DateContainer: React.FC<DateContainerPropsTypes> = ({
                                                              setStyleColor,
                                                              daysArrayObject
                                                          }) => {
    const {
        selectedDay,
    } = useContext(SlideContext);


    const daysArray = Array.from(daysArrayObject.days)
    console.log(daysArray)
    console.log(daysArrayObject)

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
                             setStyleColor={setStyleColor}
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