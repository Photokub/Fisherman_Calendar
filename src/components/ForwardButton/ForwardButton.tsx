import React, {MouseEventHandler, useContext} from "react";
import './ForwardButton.css'
import {BiSolidRightArrow} from 'react-icons/bi'
import {SlideContext} from "../../context/SlideContext";

interface ForwardButtonPropsTypes{
    //clickForward: any,
    changeSlide: any
    //changeSlide: (direction?: number) => MouseEventHandler<HTMLButtonElement> | undefined
}

export const ForwardButton:React.FC< ForwardButtonPropsTypes> = ({
                                                                     //clickForward,
                                                                     changeSlide
}) => {

    const { clickForward } = useContext(SlideContext);

    return(
        <button className='forward-button' type='button' onClick={()=>clickForward(event => {})}>
            <BiSolidRightArrow className='forward-button__icon'/>
        </button>
    )
}