import React from 'react'
import {SliderBanner} from '../../components/index'
import avatarImg from "../../assets/avatar.jpg";
import onepieceImg from "../../assets/onepiece.jpg";
import pussInBootsImg from "../../assets/pussInBoots.jpg";
import timxacImg from "../../assets/timxac-banner.jpg";
import banner_cgv from "../../assets/banner-cgv.png";
const Homepage = () => {
    const slides = [
        {
            image: avatarImg,
        },
        {
            image:timxacImg,
        },
        {
            image: onepieceImg,

        },
        {
            image:pussInBootsImg,
        },
        {
            image:banner_cgv,
        },
    ];

    return (
        <div className="w-full border border-red-500">
             <SliderBanner slides={slides} />
             Homepage
        </div>
    )
}

export default Homepage
