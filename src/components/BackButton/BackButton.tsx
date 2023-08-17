import React from "react";
import './BackButton.css'
import {BiSolidLeftArrow} from 'react-icons/bi'

interface BackButtonPropsTypes{
    clickBack: any
}

export const BackButton:React.FC<BackButtonPropsTypes> = ({
                                                              clickBack
                                                          }) => {
    return(
        <button className='back-button' type='button' onClick={clickBack}>
            <BiSolidLeftArrow className='back-button__icon'/>
        </button>
    )
}