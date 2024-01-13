import React, { useEffect, useState } from 'react'
import { Joystick } from 'react-joystick-component'
import { FaHandPointLeft, FaHandPointRight } from 'react-icons/fa6'

export default function ModelRotation({ rotationX }) {
  let movingStatus = false
  let rotationInterval
  let x = 1
  let y = 0
  let modelRotationX = rotationX
  let camRotationY = 0

  const [sliderValue, setSliderValue] = useState(0)
  function changeRotation() {
    modelRotationX += x
    camRotationY += y ? y / 50 : 0

    document
      .querySelector('#model')
      .setAttribute('rotation', `0 ${modelRotationX} 0`)
  }

  const camRotation = () => {
    console.log(x, '66666666666')
    let aCamEl = document.querySelector('a-camera')
    aCamEl.setAttribute('look-controls', 'enabled:true')
    rotationInterval = setInterval(changeRotation, 30)
  }

  const stopCamRotation = () => {
    // movingStatus = false
    clearInterval(rotationInterval)
    document
      .querySelector('a-camera')
      .setAttribute('look-controls', 'enabled:false')
  }

  // const handleKeyUp = (e) => {
  //   if (movingStatus == true) {
  //     if (e.key === 'ArrowRight' || e.key === 'd') {
  //       movingStatus = false
  //       clearInterval(rotationInterval)
  //     } else if (e.key === 'ArrowLeft' || e.key === 'a') {
  //       movingStatus = false
  //       clearInterval(rotationInterval)
  //     }
  //   }
  // }

  // const handleKeyDown = (e) => {
  //   if (movingStatus == false) {
  //     movingStatus = true
  //     if (e.key === 'ArrowRight' || e.key === 'd') {
  //       x = -1
  //       rotationInterval = setInterval(changeRotation, 30)
  //     } else if (e.key === 'ArrowLeft' || e.key === 'a') {
  //       x = 1
  //       rotationInterval = setInterval(changeRotation, 30)
  //     }
  //   }
  // }

  // useEffect(() => {
  //   document.addEventListener('keydown', handleKeyDown)
  //   document.addEventListener('keyup', handleKeyUp)
  //   return () => {
  //     removeEventListener('keydown', handleKeyDown)
  //     removeEventListener('keydown', handleKeyUp)
  //   }
  // }, [])

  const changeModelRotation = (e) => {
    console.log(e.target.value, '55555555555555')
    setSliderValue(e.target.value)
    // x = e.target.value
    if (x == 0) {
      stopCamRotation()
    } else {
      console.log('7777777777777777777777')
      if (movingStatus == false) {
        movingStatus = true

        console.log('777777777777777777777755555555555')
        camRotation()
      }
    }
  }
  return (
    <div className=" absolute z-20 left-20 bottom-0 m-10 ">
      {/* <Joystick
        size={75}
        sticky={false}
        baseColor="radial-gradient(#0000007a, #414141)"
        stickColor="radial-gradient(#331700, orange)"
        start={(e) => {
          camRotation()
        }}
        move={(e) => {
          x = e.x
          y = e.y
        }}
        stop={() => {
          clearInterval(rotationInterval)
          document
            .querySelector('a-camera')
            .setAttribute('look-controls', 'enabled:false')
        }}
      ></Joystick> */}

      <div className="sliderContainer z-20 absolute flex left-[50%] top-4 translate-x-[-50%] items-center w-1/2">
        <span className="text-2xl text-orange-400 ">
          <FaHandPointLeft />
        </span>
        <input
          type="range"
          min="-5"
          max="5"
          step="1"
          value={sliderValue}
          id="myRange"
          className="slider m-2 slider"
          onChange={(e) => {
            changeModelRotation(e)
          }}
        />
        <span className=" text-3xl text-orange-400  ">
          <FaHandPointRight />
        </span>
      </div>
    </div>
  )
}
