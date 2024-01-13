'use client'
import React from 'react'
import Base from '../../components/Base/Base'
import { setPopStatus } from '@/store/slices/info'
import { useDispatch, useSelector } from 'react-redux'
import ModelRotation from '../../components/ModelRotation/ModelRotation'
import { setCurrentAreaNumber } from '@/store/slices/areas'
import { setKeyboardWalking } from '@/store/slices/controls'
export default function Page() {
  const dispatch = useDispatch()
  dispatch(setCurrentAreaNumber(2))
  dispatch(setKeyboardWalking(false))

  return (
    <>
      <Base>
        <span className="fixed w-screen h-screen top-0 left-0 bg-red z-10"></span>
        <a-scene cursor="rayOrigin: mouse">
          {/* <a-camera id="camera" position="0 2 0" look-controls="enabled:true" ></a-camera> */}
          <a-camera
            id="camera"
            position="0 7 0"
            look-controls="enabled:false"
            wasd-controls
          ></a-camera>
          <a-box
            cursor-listener="true"
            position="-11.4503 6.47691 -5.7"
            rotation=""
            side="double"
            opacity="0"
            scale=""
            id="room"
            material="roughness: 1; metalness: 1; emissive: transparent"
            geometry="width: 0.73; height: 6.39; depth: 4.22"
            onClick={() => dispatch(setPopStatus(true))}
          ></a-box>

          <a-entity
            id="model"
            shadow="receive: false; cast:true"
            position="-3 0 -45"
            gltf-model="url(/assets/3dModel/greenhouse_in_the_garden_OUTDOOR/scene.gltf)"
            cursor-listener
            rotation="0 100 0"
            scale="200 200 200"
          ></a-entity>

          {/* <a-sky src="url(/assets/images/morning.jpg)"></a-sky>

        <a-plane
          position="0 0.1 0"
          rotation="-90 0 0"
          width="1000"
          height="1000"
          src="url(/assets/images/grass.jpg)"
          repeat="100 100"
        ></a-plane> */}
        </a-scene>
      </Base>
      <span className="z-10">
        <ModelRotation rotationX={100} />
      </span>
    </>
  )
}
