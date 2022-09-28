import React, { useEffect, useState } from 'react'
import SplashPic1 from '../Picture/SplashPic1.jpg';
import SplashPic2 from '../Picture/SplashPic2.jpg';
import SplashPic3 from '../Picture/SplashPic3.jpg';

import "./Splash_Page.css";


function Splash_Page() {

  const listImage = [SplashPic1, SplashPic2, SplashPic3];
  const [image, setImage] = useState(listImage[0]);
  const [second, setSeconds] = useState(0);


  useEffect(() => {
    setImage(listImage[second]);
  }, [listImage, second]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((seconds) =>
        seconds === listImage.length - 1 ? 0 : seconds + 1
      );
    }, 5000);
    return () => clearInterval(interval);
  }, []);


  return (
    <div className='Splash_container'>
    
   
       <img className="splash_image" src={image} />
       <h1 className='Welcome_words'>Welcome to Eatlp</h1>
    </div>
  )
}

export default Splash_Page
