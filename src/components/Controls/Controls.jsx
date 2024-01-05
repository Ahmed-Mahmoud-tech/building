"use client"
//https://sketchfab.com/3d-models/mira-573a125189704a7685389ca6a13d7350  
import React, { useEffect, useState } from 'react';
import { Joystick } from 'react-joystick-component';
import Script from 'next/script'
import { IoFootstepsSharp } from "react-icons/io5";
import { Wrapper } from './Controls.styled';
 
import { GiFootprint } from "react-icons/gi";
import PreLoader from '../PreLoader/PreLoader';
import Info from '../Info/Info';



let rotationInterval;
let walkingInterval;
let x;
let y;
let keyboardInterval;
let keyboardMoveStatus = false
let accelerator = 10;
let camRotationX = 0;
let camRotationY = 0;
// you can get this value from ===>  document.querySelector('a-camera').components['look-controls'].pitchObject.rotation



export default function Controls({modelEnv}) {


  const [loaded, setLoaded] = useState(false)
  const [popStatus, setPopStatus] = useState(false)
  
  const setX = (value) => x = value
  const setY = (value) => y = value
 
  
  
const [moveType, setMoveType] = useState("stop")
const [rotateMessage, setRotateMessage] = useState(false)
const [sliderValue, setSliderValue] = useState(accelerator)
const [animation, setAnimation] = useState("Static Pose")
 
  
  
  const rotationMessageCheck = () => {
              if (window.innerHeight > window.innerWidth && window.innerWidth <= 800) {
          setRotateMessage(true)
        } else {
            setRotateMessage(false)
          }
      }
  useEffect(() => {      
      setLoaded(true)
    setTimeout(() => {
      setAnimation("Take 001")
    }, 15000);


    setTimeout(() => {
      
      if (window.innerWidth <= 800) {

        camRotationX = 0.03199999999999996;
        camRotationY = 89.65493333333306;

        let aCamEl = document.querySelector('a-camera');
        aCamEl.components['look-controls'].pitchObject.rotation.set(camRotationY, 0, 0);
        aCamEl.components['look-controls'].yawObject.rotation.set(0, -camRotationX, 0);
  
      }


rotationMessageCheck()

      window.addEventListener('resize', rotationMessageCheck)
    
      return () => {
        window.removeEventListener('scroll', rotationMessageCheck);
      };
      
  }, 10);

  
     
  }, [loaded])


  useEffect(() => {
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('keyup', handleKeyUp);
    return () => { removeEventListener('keydown', handleKeyDown); removeEventListener('keydown', handleKeyUp); };
  }, [])
  

  const handleKeyUp = (e) => {
    if (e.key === "ArrowUp" || e.key === "w") {
      keyboardMoveStatus = false
      stopWalking()
    }
  }

  const handleKeyDown = (e) => {

    
    if ((e.key === "ArrowUp" || e.key === "w")&& keyboardMoveStatus == false) {


       keyboardMoveStatus = true

      
 walking(accelerator)
   } 
  }

function isPointInPolygon(vertices, point) {
  // Assuming vertices is an array of objects with 'x' and 'y' properties
  // and point is an object with 'x' and 'y' properties

  let inside = false;

  for (let i = 0, j = vertices.length - 1; i < vertices.length; j = i++) {
    const xi = vertices[i].x;
    const yi = vertices[i].y;
    const xj = vertices[j].x;
    const yj = vertices[j].y;

    const intersect =
      yi > point.y !== yj > point.y &&
      point.x <
        ((xj - xi) * (point.y - yi)) / (yj - yi) + xi;

    if (intersect) {
      inside = !inside;
    }
  }

  return inside;
}

  

  const areaCoordinates = [
    {x: -11.1, y: -11},
    {x: 11.2, y: -11.408},
    {x: 11.5, y: -1.9},
    {x: 13.5, y: -1.9},
    {x: 13.5, y: -11 },
    {x: 19.3, y: -11 },
    {x: 19.3, y: 3.8},
    {x: 11.5, y: 3.8},
    {x: 11.5, y: 9.4},
    {x: -11.1, y: 9.4},
    {x: -11.1, y: -11.2},
  ]
 

  function moveCameraForward(step = sliderValue) {

    // Get the camera entity
       const camera =  document.querySelector('a-camera');
      // Get the current position and rotation of the camera
      const currentPosition = camera.getAttribute('position');
      const currentRotation = camera.getAttribute('rotation');

      // Convert rotation to radians
      const radians = currentRotation.y * (Math.PI / 180);

      // Calculate the new position based on rotation
      const newPosition = {
        x: currentPosition.x - Math.sin(radians) / 50 * step,  // Adjust based on the desired distance
        y: currentPosition.y,
        z: currentPosition.z - Math.cos(radians) / 50 * step,  // Adjust based on the desired distance
      };

      // Update the camera position
      // camera.setAttribute('position', newPosition);

    if (isPointInPolygon(areaCoordinates,  { x: newPosition.x, y: newPosition.z })) {
      
      camera.setAttribute('animation', {
      property: 'position',
      to: `${newPosition.x} ${newPosition.y} ${newPosition.z}`,
      dur: 100,  // Duration in milliseconds
      easing: 'linear',  // Easing function
      });
    }
  }



  
  const walking = (step) => {

    clearInterval(walkingInterval)
    
    setMoveType("start");
    walkingInterval = setInterval(() => { 

    moveCameraForward(step)

        }, 100)

 
  }

 

  const stopWalking = () => {
       setMoveType("stop");
      clearInterval(walkingInterval)
  }


  const camRotation = () => {

    let aCamEl = document.querySelector('a-camera');
      aCamEl.setAttribute("look-controls" , 'enabled:true');
      rotationInterval = setInterval(changeRotation, 30);
      function changeRotation () {
        camRotationX += x ? x/50 : 0 
        camRotationY += y ? y/50 : 0 
        
       aCamEl.components['look-controls'].pitchObject.rotation.set(camRotationY, 0, 0);
      aCamEl.components['look-controls'].yawObject.rotation.set(0, -camRotationX, 0);
    };
 
  }

  

    
    
  return (
     <>
      
      <Script src={'/assets/aframe.min.js'} strategy="beforeInteractive" />
      <Script src={'/assets/aframe-extras.js'} strategy="beforeInteractive" />
      
      {loaded ? <Wrapper feetColor={ moveType == "stop" ? "#ddd" : "orange"}>

        {moveType == "start" && <div className="sliderContainer z-20 absolute flex left-[50%] top-4 translate-x-[-50%] items-center w-1/2">
           <span className='text-2xl text-orange-400 '><GiFootprint /></span>
          <input type="range" min="1" max="80" value={sliderValue} id="myRange" className='slider m-2 slider' onChange={(e) => { setSliderValue(e.target.value); accelerator = e.target.value; walking(e.target.value)  } }  />
           <span className=' text-3xl text-orange-400  '><GiFootprint /></span>
        </div>}
        
        {rotateMessage && <div className="rotationMessage text-center font-bold p-5 z-50 h-screen w-screen fixed top-0 left-0 flex justify-center items-center bg-black text-orange-400 text-2xl">Rotate your device for better experience</div> }

        <div className=' absolute z-20 left-0 bottom-0 m-10 '>
          <Joystick size={75} sticky={false} baseColor="radial-gradient(black, #414141)" stickColor="radial-gradient(#331700, orange)" start={(e) => { camRotation() }} move={(e) => { setX(e.x); setY(e.y) }} stop={() => {clearInterval(rotationInterval); document.querySelector('a-camera').setAttribute("look-controls", 'enabled:false') } }></Joystick>
        </div>
         <button className='absolute bottom-0 right-0 p-4 z-20  text-5xl m-10 feet' onClick={()=> moveType == "stop" ? walking() : stopWalking()}> <IoFootstepsSharp /> </button>

        {modelEnv}

      </Wrapper>
        
     :  <PreLoader /> }
     
 
     </>

  )
}
