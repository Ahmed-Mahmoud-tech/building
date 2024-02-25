'use client'
import React from 'react'
import Base from '../../components/Base/Base'
import { setInfoDesc, setInfoTitle, setPopStatus } from '@/store/slices/info'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentAreaNumber } from '@/store/slices/areas'
import { setWalkingButton } from '@/store/slices/controls'
export default function Page() {
  const dispatch = useDispatch()
  dispatch(setCurrentAreaNumber(1))

  const camMove = (position) => {
    const camera = document.querySelector('#camera')
    camera.setAttribute(`animation__move${Math.random()}`, {
      property: 'position',
      to: `${position.x} 7 ${position.y}`, // Target position
      dur: 1000, // Duration in milliseconds
      easing: 'linear',
    })
  }

  return (
    <Base>
      <a-scene cursor="rayOrigin: mouse">
        {/* <a-camera id="camera" position="0 2 0" look-controls="enabled:true" ></a-camera> */}
        <a-camera
          limit-my-distance
          id="camera"
          position="5 7 -10"
          look-controls="enabled:true"
          // wasd-controls
        ></a-camera>

        <a-image
          src="/assets/images/bicycle/location.png"
          material="width: 511.62"
          geometry="height: 3; width:1.8"
          position="23.08211 10 -19.56091"
          animation="property: rotation;
        dur: 2000; 
        easing: linear;
        loop: true; 
        to: 0 360 0"
          onClick={() => camMove({ x: 23.08211, y: -19.56091 })}
        ></a-image>

        <a-image
          src="/assets/images/bicycle/location.png"
          material="width: 511.62"
          geometry="height: 5; width: 3"
          position="50.23914 10 -42.82118"
          animation="property: rotation;
        dur: 2000; 
        easing: linear;
        loop: true; 
        to: 0 360 0"
          onClick={() => camMove({ x: 50.23914, y: -42.82118 })}
        ></a-image>

        <a-entity
          shadow="receive: false; cast:true"
          position="-19.536 0 4.262"
          gltf-model="url(/assets/3dModel/big_room_BICYCLE/scene.gltf)"
          cursor-listener
          rotation=" 0  0 0"
          scale="0.1 0.1 0.1"
        ></a-entity>
        <a-box
          cursor-listener="true"
          position="31 10 -0.5"
          // position="25 10 -2"
          side="double"
          width="2"
          id="room"
          color="red"
          geometry="width:1; height: 1; depth:1"
          rotation="0 180 0"
          onClick={() => {
            dispatch(setPopStatus(true))
            dispatch(setInfoTitle('Luxurious Villa'))
            dispatch(
              setInfoDesc(
                'Welcome to our exquisite villa, a sanctuary of opulence nestled in the heart of tranquility. This luxurious retreat offers an unparalleled blend of elegance and comfort, providing an idyllic escape for those seeking the epitome of indulgence.'
              )
            )
          }}
        >
          <a-text
            value="INFO"
            align="center"
            color="white"
            width="6"
            wrap-count="20"
            position="0 0 0.6"
          ></a-text>
        </a-box>
      </a-scene>
    </Base>
  )
}

// -30 , 10
//   ,

// { x: -19.536, y: 4.262 },
// { x: -30, y: 10 },
