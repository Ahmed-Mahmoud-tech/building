"use client"
//https://sketchfab.com/3d-models/mira-573a125189704a7685389ca6a13d7350  
import React, { useState } from 'react';
 
import Info from '../Info/Info';
import Controls from '../Controls/Controls';
 

export default function Base({children}) {


  const [popStatus, setPopStatus] = useState(false)
  const [infoTitle, setInfoTitle] = useState("this pop title")
  const [infoDesc, setInfoDesc] = useState("Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam explicabo doloremque reiciendis voluptas tenetur. Earum inventore architecto iusto, dolores similique, quas ex expedita fuga eum ratione molestiae voluptas reiciendis id?")
 
 
  
    
  return (
     <>
      
     <Controls modelEnv={children} />
     {popStatus && <Info setPopStatus={setPopStatus} title={infoTitle} desc={infoDesc}  />}
     <button className='font-bold text-sm text-orange-400 absolute bottom-0 left-[50%] z-50 translate-x-[-50%]' style={{textShadow: "0px 0px 2px black"}}> Create 3D Website </button>

     </>

  )
}
