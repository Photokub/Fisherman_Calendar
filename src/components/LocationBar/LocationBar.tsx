import React from "react";
import './LocationBar.css'

interface LocationBarPropTypes{

}

export const LocationBar: React.FC<LocationBarPropTypes> = () =>{
    return (
        <div className="location-bar">
            <p className="location-bar__paragraph">Местоположение:</p>
        </div>
    )
}