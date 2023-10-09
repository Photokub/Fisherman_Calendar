import React, {MouseEventHandler, useContext} from "react";
import './ForwardButton.css'
import {BiSolidRightArrow} from 'react-icons/bi'

interface ForwardButtonPropsTypes{
    clickForward: (event: MouseEventHandler<HTMLButtonElement>) => {},
    disableForwardBtn: boolean,
}

export const ForwardButton:React.FC< ForwardButtonPropsTypes> = ({
                                                                     clickForward,
                                                                     disableForwardBtn
}) => {

    return(
        <button className='forward-button' type='button' onClick={()=>clickForward(() => {})} disabled={disableForwardBtn}>
            <BiSolidRightArrow className='forward-button__icon' style={disableForwardBtn ? {opacity: '.4'} : {opacity: '1'}}/>
        </button>
    )
}