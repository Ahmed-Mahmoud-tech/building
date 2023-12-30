"use client" 
//https://sketchfab.com/3d-models/mira-573a125189704a7685389ca6a13d7350  
import React, { useEffect, useState } from 'react';
import { Joystick } from 'react-joystick-component';
import Script from 'next/script'
import { IoFootstepsSharp } from "react-icons/io5";
import { Wrapper } from './Main.styled';
import feet from '../assets/images/step.png';
import Image from 'next/image'
import { GiFootprint } from "react-icons/gi";
import PreLoader from './PreLoader/PreLoader';
import Info from './Info/Info';


let rotationInterval;
let walkingInterval;
let x;
let y;
let keyboardInterval;
let keyboardMoveStatus = false

let camRotationX = 0;
// you can get this value from ===>  document.querySelector('a-camera').components['look-controls'].yawObject.rotation
let camRotationY = 0;
// you can get this value from ===>  document.querySelector('a-camera').components['look-controls'].pitchObject.rotation


const Main = () => {
  const [loaded, setLoaded] = useState(false)
  const [popStatus, setPopStatus] = useState(false)
  
  const setX = (value) => x = value
  const setY = (value) => y = value
 
  
  
const [moveType, setMoveType] = useState("stop")
const [infoTitle, setInfoTitle] = useState("this pop title")
  const [infoDesc, setInfoDesc] = useState("Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam explicabo doloremque reiciendis voluptas tenetur. Earum inventore architecto iusto, dolores similique, quas ex expedita fuga eum ratione molestiae voluptas reiciendis id?")
const [rotateMessage, setRotateMessage] = useState(false)
const [sliderValue, setSliderValue] = useState(10)
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

      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('keyup', handleKeyUp);
    return () => { removeEventListener('keydown', handleKeyDown); removeEventListener('keydown', handleKeyUp); };
     
  }, [loaded])


  const handleKeyUp = (e) => {
    if (e.key === "ArrowUp" || e.key === "w") {
      keyboardMoveStatus = false
      stopWalking()
    }
  }

  const handleKeyDown = (e) => {

    
    if ((e.key === "ArrowUp" || e.key === "w")&& keyboardMoveStatus == false) {


       keyboardMoveStatus = true

 walking()
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
//   const areaCoordinates  =[ {x: -10.970871301620058, y: -10.865329391448569},
//  {x: -11.196972657316351, y: 8.333762118151268},
//  {x: 9.979590438309618, y: 8.433775027620971},
//  {x: 9.697692295570505, y: 2.772998814291648},
//   {x: 17.34473396545014, y: 2.8586764296087344},
//  {x: 18.402054516505572, y: 2.883651195979124},
//  {x: 19.19047903615063, y: -10.703518170603038},
//  {x: 14.84181786316003, y: -10.86619914845188},
//  {x: 13.795215412131279, y: -1.5664123736432107},
//  {x: 10.842595319164209, y: -1.7154511948505653},
//   {x: 11.119043874873501, y: -10.136962958546814},
//  {x: -10.970871301620058, y: -10.865329391448569}]


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

    // if (isPointInPolygon(areaCoordinates,  { x: newPosition.x, y: newPosition.z })) {
      
      camera.setAttribute('animation', {
      property: 'position',
      to: `${newPosition.x} ${newPosition.y} ${newPosition.z}`,
      dur: 100,  // Duration in milliseconds
      easing: 'linear',  // Easing function
      });
    // }
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
          <input type="range" min="1" max="50" value={sliderValue} id="myRange" className='slider m-2 slider' onChange={(e) => { setSliderValue(e.target.value); walking(e.target.value)  } }  />
           <span className=' text-3xl text-orange-400  '><GiFootprint /></span>
        </div>}
        
        {rotateMessage && <div className="rotationMessage text-center font-bold p-5 z-50 h-screen w-screen fixed top-0 left-0 flex justify-center items-center bg-black text-orange-400 text-2xl">Rotate your device for better experience</div> }

        <div className=' absolute z-20 left-0 bottom-0 m-10 '>
          <Joystick size={75} sticky={false} baseColor="black" stickColor="orange" start={(e) => { camRotation() }} move={(e) => { setX(e.x); setY(e.y) }} stop={() => {clearInterval(rotationInterval); document.querySelector('a-camera').setAttribute("look-controls", 'enabled:false') } }></Joystick>
        </div>
        
        <button className='absolute bottom-0 right-0 p-4 z-20  text-5xl m-10 feet' onClick={()=> moveType == "stop" ? walking() : stopWalking()}> <IoFootstepsSharp /> </button>

        <a-scene cursor="rayOrigin: mouse">
  
          {/* <a-camera id="camera" position="0 2 0" look-controls="enabled:true" ></a-camera> */}
          <a-camera id="camera" position="0 9 0" look-controls="enabled:true" wasd-controls ></a-camera>
          {/* <a-box cursor-listener="true" position="-11.4503 6.47691 -5.7" rotation=""  side="double" opacity="0" scale="" id="room" material="roughness: 1; metalness: 1; emissive: transparent" geometry="width: 0.73; height: 6.39; depth: 4.22" onClick={() => setPopStatus(true)} ></a-box> */}
          <a-box   position="-11.4503 6.47691 -5.7"   side="double"    material="  color:red"  geometry="width: 1; height: 1; depth: 1"></a-box>
          <a-entity shadow="receive: false; cast:true" gltf-model="url(/assets/3dModel/the_big_bang_theory_virtual_apartment/scene.gltf)" cursor-listener rotation="0 0 0" scale="5 5 5" position="-80 0 50" ></a-entity>
          {/* <a-entity shadow="receive: false; cast:true" gltf-model="url(/assets/3dModel/the_big_bang_theory_virtual_apartment/scene.gltf)" cursor-listener rotation="0 0 0" scale="5 5 5" position="-80 0 50" ></a-entity> */}
      
        </a-scene>

        {popStatus && <Info setPopStatus={setPopStatus} title={infoTitle} desc={infoDesc}  />}
      </Wrapper>
        
     :  <PreLoader /> }
     
  <button className='font-bold text-sm text-orange-400 absolute bottom-0 left-[50%] z-50 translate-x-[-50%]' style={{textShadow: "0px 0px 2px black"}}> Create 3D Website </button>

     </>

  );
};

export default Main;
 