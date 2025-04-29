import React from 'react'
import {SliderBanner} from '../../components/index'
import slides from '../../utils/sliders'
const Homepage = () => {
    return (
        <div className="w-full border border-red-500">
             <SliderBanner slides={slides} />
             Homepage
        </div>
    )
}

export default Homepage
