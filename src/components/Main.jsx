"use client" 
//https://sketchfab.com/3d-models/mira-573a125189704a7685389ca6a13d7350  
import React, { useEffect, useState } from 'react';
import { Joystick } from 'react-joystick-component';
import Script from 'next/script'
import { IoFootstepsSharp } from "react-icons/io5";
import { Wrapper } from './Main.styled';
import feet from '../assets/images/feet.jpg';
import Image from 'next/image'


let rotationInterval;
let walkingInterval;
let WalkingStatus = "stop"
let x;
let y;


let camRotationX = 0;
let camRotationY = 0;


const Main = () => {
  const [loaded, setLoaded] = useState(false)
  
  const setX = (value) => x = value
  const setY = (value) => y = value
 
  
  
const [moveType, setMoveType] = useState("stop")
const [sliderValue, setSliderValue] = useState(50)
const [animation, setAnimation] = useState("Static Pose")

  useEffect(() => {
    setLoaded(true)
    setTimeout(() => {
      setAnimation("Take 001")
    }, 15000);
 

  }, [loaded])


    function moveCameraForward() {
      // Get the camera entity
       const camera =  document.querySelector('a-camera');
      // Get the current position and rotation of the camera
      const currentPosition = camera.getAttribute('position');
      const currentRotation = camera.getAttribute('rotation');

      // Convert rotation to radians
      const radians = currentRotation.y * (Math.PI / 180);

      // Calculate the new position based on rotation
      const newPosition = {
        x: currentPosition.x - Math.sin(radians) / 50 * sliderValue,  // Adjust based on the desired distance
        y: currentPosition.y,
        z: currentPosition.z - Math.cos(radians) / 50 * sliderValue,  // Adjust based on the desired distance
      };

      // Update the camera position
      // camera.setAttribute('position', newPosition);

        camera.setAttribute('animation', {
        property: 'position',
        to: `${newPosition.x} ${newPosition.y} ${newPosition.z}`,
        dur: 100,  // Duration in milliseconds
        easing: 'linear',  // Easing function
        });
      
  }
  
  const walking = () => {

    if (WalkingStatus == "stop") {
      WalkingStatus = "start";
   
    walkingInterval = setInterval(() => { 

moveCameraForward()

    }, 100)

    } else {
       WalkingStatus = "stop";
      clearInterval(walkingInterval)
       }
  }


  const camRotation = () => {

    let aCamEl = document.querySelector('a-camera');

      aCamEl.setAttribute("look-controls" , 'enabled:true');

      rotationInterval = setInterval(changeRotation, 50);
      function changeRotation () {
        camRotationX += x ? x/50 : 0 
        camRotationY += y ? y/50 : 0 
        
       aCamEl.components['look-controls'].pitchObject.rotation.set(camRotationY, 0, 0);
      aCamEl.components['look-controls'].yawObject.rotation.set(0, -camRotationX, 0);
    };
 
  }

  const toggleWalk = () => {

    walking();
    setTimeout(() => {
      walking()
    }, 100);

  }
    
  
  return (
    <>
      
      <Script src={'/assets/aframe.min.js'} strategy="beforeInteractive" />
      <Script src={'/assets/aframe-extras.js'} strategy="beforeInteractive" />
      
      {loaded && <Wrapper feetColor={"orange"}>

        <div className="sliderContainer z-20 absolute flex left-[50%] top-4 translate-x-[-50%] items-center w-1/2">
            <Image src={feet} alt="" className='w-6' />
          <input type="range" min="0" max="100" value={sliderValue} id="myRange" className='slider m-2 slider' onChange={(e) => { setSliderValue(e.target.value); toggleWalk(); console.log(e.target.value)}}  />
            <Image src={feet} alt=""  className='w-10'/>
        </div>

        <div className=' absolute z-20 left-0 bottom-0  m-10 '>
          <Joystick size={75} sticky={false} baseColor="black" stickColor="orange" start={(e) => { setMoveType("start"), camRotation() }} move={(e) => { setX(e.x); setY(e.y) }} stop={() => { setMoveType("stop"); clearInterval(rotationInterval); document.querySelector('a-camera').setAttribute("look-controls", 'enabled:false') } }></Joystick>
        </div>
        
        <button className=' absolute bottom-0 right-0 p-4 z-20  text-5xl m-10 feet' onClick={walking}> <IoFootstepsSharp /> </button>

        <a-scene cursor="rayOrigin: mouse">
  
          <a-camera id="camera" position="0 2 0" look-controls="enabled:true" ></a-camera>

          <a-box cursor-listener position="0 1 0" rotation="0 0 0" color="gray" width="1" height="1" onClick={() => alert("Camera")}
            depth="40" side="double" scale="1 1 1" id="room"
            material="roughness: 1; metalness: 1;shader: standard; emissiveIntensity:1; dithering:true; emissive:black" />

          <a-entity shadow="receive: false; cast:true" gltf-model="url(/assets/3dModel/wallace_wells_and_scott_pilgrims_apartment/scene.gltf)" cursor-listener rotation="0 0 0" scale="5 5 5"  ></a-entity>
      
        </a-scene>
      </Wrapper>
      }
     </>

  );
};

export default Main;
 