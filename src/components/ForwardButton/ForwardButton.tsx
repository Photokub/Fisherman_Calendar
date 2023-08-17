import React from "react";
import './ForwardButton.css'
import {BiSolidRightArrow} from 'react-icons/bi'

interface ForwardButtonPropsTypes{
    clickForward: any
}

export const ForwardButton:React.FC< ForwardButtonPropsTypes> = ({clickForward}) => {
    return(
        <button className='forward-button' type='button' onClick={clickForward}>
            <BiSolidRightArrow className='forward-button__icon'/>
        </button>
    )
}