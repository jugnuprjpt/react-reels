import React, { useEffect } from 'react'
import vid1 from '../Component/Assets/Videoes/vid1.mp4';
import vid2 from '../Component/Assets/Videoes/vid2.mp4';
import vid3 from '../Component/Assets/Videoes/vid3.mp4';
import vid4 from '../Component/Assets/Videoes/vid4.mp4';
import vid5 from '../Component/Assets/Videoes/vid5.mp4';


function Ioa() {

    const callback = (entries) => {
        entries.forEach((entry)=>{
            let ele = entry.target.childNodes[0];
            console.log(ele)
            ele.play().then(()=>{
                if (!ele.paused && !entry.isIntersecting) {
                    ele.paused()
                    
                }
            })

        })
    }
      
      let observer = new IntersectionObserver(callback, {threshold: 0.6});
      useEffect(()=>{
        const elements = document.querySelectorAll(".videos")
        elements.forEach((element)=>{
            observer.observe(element)
        })
      },[])
   
  return (
    <>
    <div className="video-conatinerss">
        <div className="videos">
             <video src={vid1} muted="muted"style={{height:'85vh'}}/>
        </div>
        <div className="videos">
             <video src={vid2} muted="muted"style={{height:'85vh'}}/>
        </div>
        <div className="videos">
             <video src={vid3} muted="muted"style={{height:'85vh'}}/>
        </div>
        <div className="videos">
             <video src={vid4} style={{height:'85vh'}}/>
        </div>
        <div className="videos">
             <video src={vid5} style={{height:'85vh'}}/>
        </div>
    </div>
    </>
  )
}

export default Ioa