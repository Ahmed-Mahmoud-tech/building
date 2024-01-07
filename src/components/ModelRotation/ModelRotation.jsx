import React, { useEffect } from 'react'
import { Joystick } from 'react-joystick-component'

export default function ModelRotation({ rotationX }) {
  let movingStatus = false
  let rotationInterval
  let x = 0
  let y = 0
  let modelRotationX = rotationX
  let camRotationY = 0

  function changeRotation() {
    modelRotationX += x
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

  const handleKeyUp = (e) => {
    if (movingStatus == true) {
      if (e.key === 'ArrowRight' || e.key === 'd') {
        movingStatus = false
        clearInterval(rotationInterval)
      } else if (e.key === 'ArrowLeft' || e.key === 'a') {
        movingStatus = false
        clearInterval(rotationInterval)
      }
    }
  }

  const handleKeyDown = (e) => {
    if (movingStatus == false) {
      movingStatus = true
      if (e.key === 'ArrowRight' || e.key === 'd') {
        x = -1
        rotationInterval = setInterval(changeRotation, 30)
      } else if (e.key === 'ArrowLeft' || e.key === 'a') {
        x = 1
        rotationInterval = setInterval(changeRotation, 30)
      }
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('keyup', handleKeyUp)
    return () => {
      removeEventListener('keydown', handleKeyDown)
      removeEventListener('keydown', handleKeyUp)
    }
  }, [])

  return (
    <div className=" absolute z-20 left-20 bottom-0 m-10 ">
      <Joystick
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
      ></Joystick>
    </div>
  )
}
