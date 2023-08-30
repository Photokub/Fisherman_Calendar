import React, {MouseEventHandler, useContext} from "react";
import './BackButton.css'
import {BiSolidLeftArrow} from 'react-icons/bi'
import {SlideContext} from "../../context/SlideContext";

interface BackButtonPropsTypes{}

export const BackButton:React.FC<BackButtonPropsTypes> = () => {

    const { clickBack } = useContext(SlideContext);

    return(
        <button className='back-button' type='button' onClick={() => clickBack(event => {})}>
            <BiSolidLeftArrow className='back-button__icon'/>
        </button>
    )
}