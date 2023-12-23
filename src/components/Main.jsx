"use client" 
//https://sketchfab.com/3d-models/mira-573a125189704a7685389ca6a13d7350  
import React, { useEffect, useState } from 'react';
import { Joystick } from 'react-joystick-component';

let rotationInterval;
let x;
let y;


let camRotationX = 0;
let camRotationY = 0;


const Main = () => {
  const [loaded, setLoaded] = useState(false)
  
  const setX = (value) => x = value
  const setY = (value) => y = value
 
  
  
const [moveType, setMoveType] = useState("stop")
const [animation, setAnimation] = useState("Static Pose")

  useEffect(() => {
    setLoaded(true)
    setTimeout(() => {
      setAnimation("Take 001")
    }, 15000);
  }, [loaded])

  const camRotation = () => {

      document.querySelector('a-camera').setAttribute("look-controls" , 'enabled:true');

    let aCamEl = document.querySelector('a-camera');
      rotationInterval = setInterval(changeRotation, 50);
      function changeRotation () {
        camRotationX += x ? x/50 : 0 
        camRotationY += y ? y/50 : 0 
        
       aCamEl.components['look-controls'].pitchObject.rotation.set(camRotationY, 0, 0);
      aCamEl.components['look-controls'].yawObject.rotation.set(0, -camRotationX, 0);
 
        
    };
 
  }
  
  return (
    <>
      <div style={{zIndex:"10000",     position: "absolute"}}>
        
        <Joystick size={100} sticky={false} baseColor="red" stickColor="blue" start={(e) => { setMoveType("start"), camRotation() }} move={(e) => { setX(e.x); setY(e.y) }} stop={() => { setMoveType("stop");   clearInterval(rotationInterval) ; document.querySelector('a-camera').setAttribute("look-controls" , 'enabled:false')}   
 }></Joystick>
    </div>

     {loaded && <a-scene cursor="rayOrigin: mouse">
  
<a-camera id="camera" position="0 2 0" look-controls="enabled:false" ></a-camera>

        <a-box cursor-listener position="0 1 0" rotation="0 0 0" color="gray" width="1" height="1" onClick={() => alert("Camera")}
                            depth="40" side="double" scale="1 1 1" id="room"
                            material="roughness: 1; metalness: 1;shader: standard; emissiveIntensity:1; dithering:true; emissive:black" />

            <a-entity  shadow="receive: false; cast:true"  gltf-model="url(/assets/3dModel/wallace_wells_and_scott_pilgrims_apartment/scene.gltf)" cursor-listener rotation="0 0 0" scale="5 5 5"  ></a-entity>
        

   </a-scene>}
     </>

  );
};

export default Main;
 