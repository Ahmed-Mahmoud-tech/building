'use client'
import React from 'react'
import Base from '../../components/Base/Base'
import { setPopStatus } from '@/store/slices/info'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentAreaNumber } from '@/store/slices/areas'
export default function Page() {
  const dispatch = useDispatch()
  dispatch(setCurrentAreaNumber(1))

  return (
    <Base>
      <a-scene cursor="rayOrigin: mouse">
        {/* <a-camera id="camera" position="0 2 0" look-controls="enabled:true" ></a-camera> */}
        <a-camera
          id="camera"
          position="5 7 -10"
          look-controls="enabled:true"
          wasd-controls
        ></a-camera>
        <a-box
          cursor-listener="true"
          position="-11.4503 6.47691 0"
          rotation=""
          side="double"
          opacity="0"
          id="room"
          color="red"
          geometry="width: 0.73; height: 6.39; depth: 104.22"
          // onClick={() => dispatch(setPopStatus(true))}
        ></a-box>

        <a-image
          src="/assets/images/bicycle/location.png"
          material="width: 511.62"
          geometry="height: 5; width: 3"
          position="23.08211 7 -19.56091"
          animation="property: rotation;
        dur: 2000; 
        easing: linear;
        loop: true; 
        to: 0 360 0"
        ></a-image>

        <a-image
          src="/assets/images/bicycle/location.png"
          material="width: 511.62"
          geometry="height: 5; width: 3"
          position="50.23914 7 -42.82118"
          animation="property: rotation;
        dur: 2000; 
        easing: linear;
        loop: true; 
        to: 0 360 0"
        ></a-image>

        <a-entity
          shadow="receive: false; cast:true"
          position="-19.536 0 4.262"
          gltf-model="url(/assets/3dModel/big_room_BICYCLE/scene.gltf)"
          cursor-listener
          rotation=" 0  0 0"
          scale="0.1 0.1 0.1"
        ></a-entity>
      </a-scene>
    </Base>
  )
}

// -30 , 10
//   ,

// { x: -19.536, y: 4.262 },
// { x: -30, y: 10 },
