import React, { useEffect, useState } from 'react'
import SplashPic1 from '../Picture/SplashPic1.jpg';
import SplashPic2 from '../Picture/SplashPic2.jpg';
import SplashPic3 from '../Picture/SplashPic3.jpg';
import LoadingPic from '../Picture/pizzaLoadingPage.gif'
import "./Splash_Page.css";


function Splash_Page() {

  const listImage = [SplashPic1, SplashPic2, SplashPic3];
  const [image, setImage] = useState(listImage[0]);
  const [second, setSeconds] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const dev =
  {
    name: "David Ting",
    pic: "https://avatars.githubusercontent.com/u/101853690?s=400&u=a7e10d2fbf72be60ea52c673f6d42487603651c6&v=4",
    linkedIn: "https://www.linkedin.com/in/da-wei-ting-cpa-a929b5102/",
    gitHubLink: "https://github.com/dwting0322",
    ins: "https://www.instagram.com/applebee0520/",
    fb: "https://www.facebook.com/da.w.ting/"
  }

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


  useEffect(() => {
    const LoadingTimeOut = setTimeout(() => {
        setLoaded(true);
    }, 500);
    return () => clearTimeout(LoadingTimeOut);
}, []);


  return (
    <div className='Splash_container'>
      {!loaded ? (<img className='loading_page' src={LoadingPic} alt='loading page'/>) : 
      (<>
      <img className="splash_image" src={image} />
      <div className='Welcome_words'>Welcome to Eatlp</div>
      <div className='EatlpLink_div'> <a className='EatlpLink' href="https://github.com/dwting0322/Eatlp"> Eatlp Github </a></div>
      <div className='FollowMe_div'>Follow Me: </div>
      <div className='followMe' >
        <div><a className='linkedIn' href={dev.linkedIn}> <i className="fa-brands fa-linkedin" /></a> </div>
        <div><a className='gitHub' href={dev.gitHubLink}> <i className="fa-brands fa-github" /></a> </div>
        <div><a className='ins' href={dev.ins}> <i className="fa-brands fa-square-instagram" /></a> </div>
        <div><a className='fb' href={dev.fb}> <i className="fa-brands fa-facebook" /></a> </div>
      </div>
      </>
      )}
    </div>
  )
}

export default Splash_Page
