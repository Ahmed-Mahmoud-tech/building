'use client'
import React from 'react'
import Base from '../../components/Base/Base'
import { setPopStatus } from '@/store/slices/info'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentAreaNumber } from '@/store/slices/areas'
export default function Page() {
  const dispatch = useDispatch()
  dispatch(setCurrentAreaNumber(2))

  return (
    <Base>
      <a-scene cursor="rayOrigin: mouse">
        {/* <a-camera id="camera" position="0 2 0" look-controls="enabled:true" ></a-camera> */}
        <a-camera
          id="camera"
          position="0 7 0"
          look-controls="enabled:true"
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
          shadow="receive: false; cast:true"
          position="-10 0 10"
          gltf-model="url(/assets/3dModel/new/111.glb)"
          cursor-listener
          rotation="0 0 0"
          scale="5 5 5"
        ></a-entity>
      </a-scene>
    </Base>
  )
}
