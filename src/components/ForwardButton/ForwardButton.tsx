import React from "react";
import './ForwardButton.css'
import {BiSolidRightArrow} from 'react-icons/bi'

export const ForwardButton:React.FC = () => {
    return(
        <button className='forward-button' type='button'>
            <BiSolidRightArrow className='forward-button__icon'/>
        </button>
    )
}