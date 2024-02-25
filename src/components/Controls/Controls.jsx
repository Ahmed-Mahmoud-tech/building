/* eslint-disable no-undef */
'use client'
//https://sketchfab.com/3d-models/mira-573a125189704a7685389ca6a13d7350
import React, { useEffect, useState } from 'react'
import { Joystick } from 'react-joystick-component'
import Script from 'next/script'
import { IoFootstepsSharp } from 'react-icons/io5'
import { Wrapper } from './Controls.styled'

import { GiFootprint } from 'react-icons/gi'
import PreLoader from '../PreLoader/PreLoader'
import { useSelector, useDispatch } from 'react-redux'
import {
  setRotationNavigation,
  setWalkingButton,
} from '@/store/slices/controls'
import Menu from './Menu/Menu'

let x
let y
let accelerator = 10
let camRotationX = 0
let camRotationY = 0
let firstLoad = 0
let rotationStatus = false
let allowedCamPositionX
let allowedCamPositionZ
let walkingVariable
let cameraEvent
let moveTypeVariable
let sliderValueVariable

export default function Controls({ modelEnv }) {
  const dispatch = useDispatch()
  // const [allowedCamPositionX, setAllowedCamPositionX] = useState(0)
  // const [allowedCamPositionZ, setAllowedCamPositionZ] = useState(0)
  const [updatePosition, setUpdatePosition] = useState(0)
  const [rotateMessage, setRotateMessage] = useState(false)
  const [sliderValue, setSliderValue] = useState(accelerator)
  const [moveType, setMoveType] = useState('stop')
  const areaCoordinates = useSelector((state) => state.areas.areas)
  const rotationNavigation = useSelector(
    (state) => state.controls.rotationNavigation
  )
  const walkingButton = useSelector((state) => state.controls.walkingButton)

  useEffect(() => {
    moveTypeVariable = moveType
  }, [moveType])
  useEffect(() => {
    walkingVariable = walkingButton
  }, [walkingButton])
  useEffect(() => {
    walkingVariable = walkingButton
  }, [walkingButton])
  useEffect(() => {
    sliderValueVariable = sliderValue
  }, [sliderValue])

  const currentAreaNumber = useSelector(
    (state) => state.areas.currentAreaNumber
  )

  const [loaded, setLoaded] = useState(false)

  const setX = (value) => (x = value)
  const setY = (value) => (y = value)

  // const [animation, setAnimation] = useState('Static Pose')

  const rotationMessageCheck = () => {
    if (window.innerHeight > window.innerWidth && window.innerWidth <= 800) {
      setRotateMessage(true)
    } else {
      setRotateMessage(false)
    }
  }

  useEffect(() => {
    setLoaded(true)

    if (window.innerWidth > 800) {
      dispatch(setWalkingButton(false))
      dispatch(setRotationNavigation(false))
      // } else {
      //   dispatch(setWalkingButton(true))
    }
    setTimeout(() => {
      let aCamEl = document.querySelector('a-camera')
      if (window.innerWidth <= 800) {
        camRotationX = 0.03199999999999996
        camRotationY = 89.65493333333306

        aCamEl.setAttribute('look-controls', 'enabled:false')
        aCamEl.components['look-controls'].pitchObject.rotation.set(
          camRotationY,
          0,
          0
        )
        aCamEl.components['look-controls'].yawObject.rotation.set(
          0,
          -camRotationX,
          0
        )
      } else {
        aCamEl.setAttribute('look-controls', 'enabled:true')
      }

      rotationMessageCheck()

      window.addEventListener('resize', rotationMessageCheck)

      return () => {
        window.removeEventListener('scroll', rotationMessageCheck)
      }
    }, 10)
  }, [loaded])

  function isPointInPolygon(vertices, point) {
    // Assuming vertices is an array of objects with 'x' and 'y' properties
    // and point is an object with 'x' and 'y' properties

    let inside = false

    for (let i = 0, j = vertices.length - 1; i < vertices.length; j = i++) {
      const xi = vertices[i].x
      const yi = vertices[i].y
      const xj = vertices[j].x
      const yj = vertices[j].y

      const intersect =
        yi > point.y !== yj > point.y &&
        point.x < ((xj - xi) * (point.y - yi)) / (yj - yi) + xi

      if (intersect) {
        inside = !inside
      }
    }

    return inside
  }

  function moveCameraForward(step = sliderValueVariable) {
    let aCamEl = document.querySelector('a-camera')

    const currentPosition = cameraEvent.position
    // const currentRotation = cameraEvent.rotation
    const currentRotation = aCamEl.getAttribute('rotation')

    // Convert rotation to radians
    const radians = currentRotation.y * (Math.PI / 180)

    const newPosition = {
      x: currentPosition.x - (Math.sin(radians) / 50) * step * 0.1, // Adjust based on the desired distance
      y: currentPosition.y,
      z: currentPosition.z - (Math.cos(radians) / 50) * step * 0.1, // Adjust based on the desired distance
    }

    if (
      !areaCoordinates[currentAreaNumber] ||
      isPointInPolygon(areaCoordinates[currentAreaNumber], {
        x: newPosition.x,
        y: newPosition.z,
      })
    ) {
      currentPosition.x = newPosition.x
      currentPosition.z = newPosition.z
    }
  }

  const camRotation = () => {
    let aCamEl = document.querySelector('a-camera')

    camRotationX += x ? x / 50 : 0
    camRotationY += y ? y / 50 : 0

    aCamEl.components['look-controls'].pitchObject.rotation.set(
      camRotationY,
      0,
      0
    )
    aCamEl.components['look-controls'].yawObject.rotation.set(
      0,
      -camRotationX,
      0
    )
  }

  const handleResize = () => {
    window.location.reload()
  }

  useEffect(() => {
    if (firstLoad == 0) {
      AFRAME.registerComponent('limit-my-distance', {
        tick: function () {
          cameraEvent = this.el.object3D

          if (walkingVariable) {
            if (moveTypeVariable == 'start') {
              moveCameraForward()
            }
          } else {
            if (
              !areaCoordinates[currentAreaNumber] ||
              isPointInPolygon(areaCoordinates[currentAreaNumber], {
                x: this.el.object3D.position.x,
                y: this.el.object3D.position.z,
              })
            ) {
              allowedCamPositionX = this.el.object3D.position.x
              allowedCamPositionZ = this.el.object3D.position.z
              // setAllowedCamPositionX(this.el.object3D.position.x)
              // setAllowedCamPositionZ(this.el.object3D.position.z)
            } else {
              this.el.object3D.position.z = allowedCamPositionZ
              this.el.object3D.position.x = allowedCamPositionX
            }
          }

          if (rotationStatus) {
            document
              .querySelector('a-camera')
              .setAttribute('look-controls', 'enabled:true')

            camRotation()
          }
        },
      })
    }
    firstLoad++
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <>
      <Script src={'/assets/aframe.min.js'} strategy="beforeInteractive" />
      <Script src={'/assets/aframe-extras.js'} strategy="beforeInteractive" />
      {loaded ? (
        <Wrapper feetColor={moveType == 'stop' ? '#ddd' : 'orange'}>
          {moveType == 'start' && (
            <div className="sliderContainer z-20 absolute flex left-[50%] top-4 translate-x-[-50%] items-center w-1/2">
              <span className="text-2xl text-orange-400 ">
                <GiFootprint />
              </span>
              <input
                type="range"
                min="1"
                max="80"
                value={sliderValue}
                id="myRange"
                className="slider m-2 slider"
                onChange={(e) => {
                  setSliderValue(e.target.value)
                  accelerator = e.target.value
                }}
              />
              <span className=" text-3xl text-orange-400  ">
                <GiFootprint />
              </span>
            </div>
          )}

          {rotateMessage && (
            <div className="rotationMessage text-center font-bold p-5 z-50 h-screen w-screen fixed top-0 left-0 flex justify-center items-center bg-black text-orange-400 text-2xl">
              Rotate your device for better experience
            </div>
          )}

          {rotationNavigation && (
            <div className=" absolute z-20 left-0 bottom-0 m-10 ">
              <Joystick
                size={75}
                sticky={false}
                baseColor="radial-gradient(#0000007a, #414141)"
                stickColor="radial-gradient(#331700, orange)"
                start={(e) => {
                  rotationStatus = true
                }}
                move={(e) => {
                  setX(e.x)
                  setY(e.y)
                }}
                stop={() => {
                  rotationStatus = false
                  document
                    .querySelector('a-camera')
                    .setAttribute('look-controls', 'enabled:false')
                }}
              ></Joystick>
            </div>
          )}
          {walkingButton == true && (
            <button
              className="absolute bottom-0 right-0 p-4 z-20  text-5xl m-10 feet"
              onClick={() => {
                moveType == 'stop' ? setMoveType('start') : setMoveType('stop')
              }}
            >
              <IoFootstepsSharp />
            </button>
          )}

          {modelEnv}
          <Menu
            camPosition={{ x: allowedCamPositionX, y: allowedCamPositionZ }}
          />
        </Wrapper>
      ) : (
        <PreLoader />
      )}
    </>
  )
}
