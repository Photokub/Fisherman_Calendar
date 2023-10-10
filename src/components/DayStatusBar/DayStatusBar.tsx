import React from "react"
import "./DayStatusBar.css"
import {connect} from "react-redux";
import { Transition } from 'react-transition-group';

interface DayStatusBarPropTypes {
    dayStatus: any,
}

const DayStatusBar: React.FC<DayStatusBarPropTypes> = ({
                                                           dayStatus
                                                       }) => {
    return (
        <section className='day-status-bar'>
            <Transition
                transitionName="day-status-bar__title"
            >
                <p className='day-status-bar__title'>{dayStatus}</p>
            </Transition>
        </section>
    )
}

function mapStateToProps(store: any) {
    return {
        daysArrayObject: store.daysArray,
    }
}

export default connect(mapStateToProps)(DayStatusBar);


