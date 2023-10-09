import React, {MouseEventHandler, useContext} from "react";
import './ForwardButton.css'
import {BiSolidRightArrow} from 'react-icons/bi'
import {SlideContext} from "../../context/SlideContext";

interface ForwardButtonPropsTypes{
    clickForward: (event: MouseEventHandler<HTMLButtonElement>) => {}
}

export const ForwardButton:React.FC< ForwardButtonPropsTypes> = ({clickForward}) => {

    // const { clickForward } = useContext(SlideContext);

    return(
        <button className='forward-button' type='button' onClick={()=>clickForward(() => {})}>
            <BiSolidRightArrow className='forward-button__icon'/>
        </button>
    )
}