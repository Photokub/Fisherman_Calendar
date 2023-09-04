import React from "react";
import './ViewPort.css'
import DateContainer from "../DateContainer/DateContainer";

interface ViewPortPropsTypes {
    setStyleColor: any
}

export const ViewPort: React.FC<ViewPortPropsTypes> = ({setStyleColor}) => {
    return (
        <section className='viewport'>
            <DateContainer
                setStyleColor={setStyleColor}
            />
        </section>
    )
}
