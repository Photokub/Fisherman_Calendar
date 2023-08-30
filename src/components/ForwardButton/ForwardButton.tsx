import React, {MouseEventHandler, useContext} from "react";
import './ForwardButton.css'
import {BiSolidRightArrow} from 'react-icons/bi'
import {SlideContext} from "../../context/SlideContext";

interface ForwardButtonPropsTypes{}

export const ForwardButton:React.FC< ForwardButtonPropsTypes> = () => {

    const { clickForward } = useContext(SlideContext);

    return(
        <button className='forward-button' type='button' onClick={()=>clickForward(event => {})}>
            <BiSolidRightArrow className='forward-button__icon'/>
        </button>
    )
}