import React from "react";
import './LocationBar.css'

interface LocationBarPropTypes{
    browserLocationName: string
}

export const LocationBar: React.FC<LocationBarPropTypes> = ({
    browserLocationName
}) =>{
    return (
        <div className="location-bar">
            <p className="location-bar__paragraph">Местоположение:</p>
            <p className="location-bar__paragraph">{browserLocationName}</p>
        </div>
    )
}