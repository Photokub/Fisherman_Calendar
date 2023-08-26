import React from "react";
import './CurrentDateContainer.css'
import {DateElement} from "../DateElement/DateElement";
import {IDay} from "../../types/types";

interface CurrentDateContainerPropsTypes {
    // todayCard: IDay,
    // tomorrowCard: IDay,
    // yesterdayCard: IDay
}

export const CurrentDateContainer:React.FC<CurrentDateContainerPropsTypes> = ({
                                                                                  // todayCard,
                                                                                  // tomorrowCard,
                                                                                  // yesterdayCard
}) => {
    return(
        <section className='CurrentDateContainer'>
            {/*<DateElement*/}
            {/*    // yesterdayCard={yesterdayCard}*/}
            {/*    // todayCard={todayCard}*/}
            {/*    // tomorrowCard={tomorrowCard}*/}
            {/*/>*/}
        </section>
    )
}