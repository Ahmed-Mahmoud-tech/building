'use client'
//https://sketchfab.com/3d-models/mira-573a125189704a7685389ca6a13d7350
import React, { useState } from 'react'

import Info from '../Info/Info'
import Controls from '../Controls/Controls'
import { useSelector, useDispatch } from 'react-redux'
import { setPopStatus } from '@/store/slices/info'
import Gid from '../Gid/Gid'

export default function Base({ children }) {
  const dispatch = useDispatch()
  const popStatus = useSelector((state) => state.info.popStatus)
  const infoTitle = useSelector((state) => state.info.infoTitle)
  const infoDesc = useSelector((state) => state.info.infoDesc)

  return (
    <>
      <Controls modelEnv={children} />
      {popStatus && (
        <Info
          setPopStatus={() => dispatch(setPopStatus(false))}
          title={infoTitle}
          desc={infoDesc}
        />
      )}
      <button
        className="font-bold text-sm text-orange-400 absolute bottom-0 left-[50%] z-50 translate-x-[-50%]"
        style={{ textShadow: '0px 0px 2px black' }}
      >
        Create 3D Website
      </button>
      <Gid />
    </>
  )
}
