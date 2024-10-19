import React from 'react';
import './Preloader.css'

interface PreloaderPropTypes { }

const Preloader: React.FC<PreloaderPropTypes> = () => {
    return (
        <div className="preloader">
            <div id="preloader-element">
                <span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span>
            </div>
            {/* <div className="preloader__background"></div> */}
        </div>
    )
}

export { Preloader };