import React, { useEffect, useState } from 'react'
import { Joystick } from 'react-joystick-component'
import { FaHandPointLeft, FaHandPointRight } from 'react-icons/fa6'
import { Wrapper } from './ModelRotation..styled'
import { useDispatch } from 'react-redux'
import {
  setKeyboardWalking,
  setRotationNavigation,
  setWalkingButton,
} from '@/store/slices/controls'
let movingStatus = false
let rotationInterval
let x = 0
let y = 0
let camRotationY = 0
let modelRotationX
export default function ModelRotation({ rotationX }) {
  const dispatch = useDispatch()

  dispatch(setKeyboardWalking(false))
  dispatch(setRotationNavigation(false))
  dispatch(setWalkingButton(false))

  if (!modelRotationX) modelRotationX = rotationX
  const [sliderValue, setSliderValue] = useState(0)
  function changeRotation() {
    modelRotationX += x / 2
    camRotationY += y ? y / 50 : 0

    document
      .querySelector('#model')
      .setAttribute('rotation', `0 ${modelRotationX} 0`)
  }

  const camRotation = () => {
    let aCamEl = document.querySelector('a-camera')
    aCamEl.setAttribute('look-controls', 'enabled:true')
    rotationInterval = setInterval(changeRotation, 30)
  }

  const stopCamRotation = () => {
    movingStatus = false
    clearInterval(rotationInterval)
    document
      .querySelector('a-camera')
      .setAttribute('look-controls', 'enabled:false')
  }

  const changeModelRotation = (value) => {
    setSliderValue(value)
    x = parseInt(value)
    if (x == 0) {
      stopCamRotation()
    } else {
      if (movingStatus == false) {
        movingStatus = true
        camRotation()
      }
    }
  }

  return (
    <Wrapper>
      <div className="sliderContainer z-0 absolute flex left-[50%] top-4 translate-x-[-50%] items-center w-1/2 max-w-[30rem]">
        <button
          className="text-3xl text-orange-400"
          onClick={() => x > -5 && changeModelRotation(x - 1)}
        >
          <FaHandPointLeft />
        </button>
        <input
          type="range"
          min="-5"
          max="5"
          step="1"
          value={sliderValue}
          id="myRange"
          className="slider m-2  "
          onChange={(e) => {
            changeModelRotation(e.target.value)
          }}
        />
        <button className=" text-3xl text-orange-400  ">
          <FaHandPointRight
            onClick={() => x < 5 && changeModelRotation(x + 1)}
          />
        </button>
      </div>
    </Wrapper>
  )
}
