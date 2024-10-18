import React from 'react';
import './Preloader.css'

interface PreloaderPropTypes { }

const Preloader: React.FC<PreloaderPropTypes> = () => {
    return (
        <div id="preloader">
            <span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span>
        </div>
    )
}

export {Preloader};