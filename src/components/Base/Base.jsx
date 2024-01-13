'use client'
//https://sketchfab.com/3d-models/mira-573a125189704a7685389ca6a13d7350
import React, { useEffect, useState } from 'react'

import Info from '../Info/Info'
import Controls from '../Controls/Controls'
import { useSelector, useDispatch } from 'react-redux'
import { setPopStatus } from '@/store/slices/info'
import { toast } from 'react-toastify'

let isFirstLoad = 0

export default function Base({ children }) {
  const dispatch = useDispatch()
  const popStatus = useSelector((state) => state.info.popStatus)
  const infoTitle = useSelector((state) => state.info.infoTitle)
  const infoDesc = useSelector((state) => state.info.infoDesc)

  const keyboardWalking = useSelector((state) => state.controls.keyboardWalking)
  useEffect(() => {
    if (window.innerWidth > 800 && isFirstLoad === 0 && keyboardWalking) {
      isFirstLoad += 1
      toast(
        <>
          <div className="text-xl font-bold text-center">
            For move forward press <br /> [ W or
            <span className=" rotate-[-90deg] inline-block">➔</span> ]
          </div>
          <br />
          <hr />
          <br />
          <div className=" text-center text-xl font-bold">
            You can rotate with mouse dragging
          </div>
        </>,
        {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        }
      )
    }
  }, [])

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
    </>
  )
}
