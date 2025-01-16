import React from 'react';
import Navbar from '../Navbar/Navbar';
import Herobackground from "../Herobackground/Herobackground";
import Productgallery from '../Productgallery/Productgallery';

export default function Home() {
  return (
    <div>

        <Navbar/>
        <Herobackground/>
       <Productgallery/>
    </div>
  )
}
