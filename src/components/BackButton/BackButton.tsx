import React from "react";
import './BackButton.css'
import {BiSolidLeftArrow} from 'react-icons/bi'

export const BackButton:React.FC = () => {
    return(
        <button className='back-button' type='button'>
            <BiSolidLeftArrow className='back-button__icon'/>
        </button>
    )
}