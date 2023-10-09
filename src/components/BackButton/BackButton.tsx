import React, {MouseEventHandler, useContext} from "react";
import './BackButton.css'
import {BiSolidLeftArrow} from 'react-icons/bi'

interface BackButtonPropsTypes{
    clickBack: (event: MouseEventHandler<HTMLButtonElement>) => {},
    disableBackBtn: boolean,
}

export const BackButton:React.FC<BackButtonPropsTypes> = ({
                                                              clickBack,
                                                              disableBackBtn
}) => {

    return(
        <button className='back-button'  type='button' onClick={() => clickBack(() => {})} disabled={disableBackBtn}>
            <BiSolidLeftArrow className='back-button__icon' style={disableBackBtn ? {opacity:'.4'} : {opacity:'1'} }/>
        </button>
    )
}