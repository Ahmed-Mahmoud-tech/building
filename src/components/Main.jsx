'use client'

import { setPopStatus, setInfoTitle, setInfoDesc } from '@/store/slices/info'
import Controls from './Base/Base'
import { useDispatch } from 'react-redux'
import { setCurrentAreaNumber } from '@/store/slices/areas'
const Main = () => {
  const dispatch = useDispatch()
  // dispatch(setCurrentAreaNumber(1))
  const picture = () => {
    dispatch(setPopStatus(true))
    dispatch(setInfoTitle('this is the picture title'))
    dispatch(setInfoDesc('lorem ipsum dolor sit amet, consectetur adipiscing'))
  }
  return (
    <Controls>
      <a-scene cursor="rayOrigin: mouse">
        {/* <a-camera id="camera" position="0 2 0" look-controls="enabled:true" ></a-camera> */}
        <a-camera
          id="camera"
          position="0 2 0"
          look-controls="enabled:true"
          wasd-controls
        ></a-camera>
        <a-box
          cursor-listener="true"
          position="-11.4503 6.47691 -5.7"
          rotation=""
          onClick={picture}
          side="double"
          opacity="0"
          scale=""
          id="room"
          material="roughness: 1; metalness: 1; emissive: transparent"
          geometry="width: 0.73; height: 6.39; depth: 4.22"
        ></a-box>
        <a-box
          position="-11.4503 6.47691 -5.7"
          side="double"
          material="  color:red"
          geometry="width: 1; height: 1; depth: 1"
        ></a-box>
        <a-entity
          shadow="receive: false; cast:true"
          gltf-model="url(/assets/3dModel/wallace_wells_and_scott_pilgrims_apartment/scene.gltf)"
          cursor-listener
          rotation="0 0 0"
          scale="5 5 5"
        ></a-entity>
      </a-scene>
    </Controls>
  )
}

export default Main
