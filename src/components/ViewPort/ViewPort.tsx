import React, {ReactNode} from "react";
import './ViewPort.css'
import DateContainer from "../DateContainer/DateContainer";

interface ViewPortPropsTypes {
    setStyleColor: any,
    setRusMonthName: (arg: string) => ReactNode
}

export const ViewPort: React.FC<ViewPortPropsTypes> = ({setStyleColor, setRusMonthName}) => {
    return (
        <section className='viewport'>
            <DateContainer
                setStyleColor={setStyleColor}
                setRusMonthName={setRusMonthName}
            />
        </section>
    )
}
