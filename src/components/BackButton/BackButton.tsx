import React, {MouseEventHandler, useContext} from "react";
import './BackButton.css'
import {BiSolidLeftArrow} from 'react-icons/bi'
import {SlideContext} from "../../context/SlideContext";

interface BackButtonPropsTypes{
    clickBack: (event: MouseEventHandler<HTMLButtonElement>) => {},
}

export const BackButton:React.FC<BackButtonPropsTypes> = ({clickBack}) => {

    // const { clickBack } = useContext(SlideContext);

    return(
        <button className='back-button' type='button' onClick={() => clickBack(() => {})}>
            <BiSolidLeftArrow className='back-button__icon'/>
        </button>
    )
}