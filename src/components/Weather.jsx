/* eslint-disable no-unused-vars */
import React from "react";
import IMAGES from "../assets/Images";




export default function Weather(){
    return (
        <section className="weather">
            <div className="date-day utils">
                <p className="day">Thursday, &nbsp;</p>
                <p className="date">25th Jan</p>
            </div>

            <time className="time">3:13pm</time>

            <p className="city utils">London</p>


            <img src={IMAGES.cloudy} alt="" className="img-season" />

            <p className="temperature utils">19°</p>
        </section>
    )
}