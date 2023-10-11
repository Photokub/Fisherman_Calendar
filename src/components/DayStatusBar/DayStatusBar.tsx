import React, {useRef, useState} from "react"
import "./DayStatusBar.css"
import {connect} from "react-redux";
import {CSSTransition} from 'react-transition-group';

interface DayStatusBarPropTypes {
    dayStatus: any,
}

const DayStatusBar: React.FC<DayStatusBarPropTypes> = ({
                                                           dayStatus
                                                       }) => {

    return (
        <section className='day-status-bar'>
            <p className='day-status-bar__title'>{dayStatus}</p>
        </section>
    )
}

function mapStateToProps(store: any) {
    return {
        daysArrayObject: store.daysArray,
    }
}

export default connect(mapStateToProps)(DayStatusBar);


