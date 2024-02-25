import React, { useState } from 'react'
import map from '../../../assets/images/bicycle/map.png'
import { FaMapLocationDot } from 'react-icons/fa6'
import Image from 'next/image'
import { MdLocationPin } from 'react-icons/md'

export default function Menu({ camPosition }) {
  const [mapDetails, setMapDetails] = useState(false)
  const ratio = 171.5 / 38.3

  const camMove = (position) => {
    const camera = document.querySelector('#camera')
    camera.setAttribute(`animation__move${Math.random()}`, {
      property: 'position',
      to: `${position.x} 7 ${position.y}`, // Target position
      dur: 1000, // Duration in milliseconds
      easing: 'linear',
    })
  }

  const mapPositionPoints = [
    {
      position: { left: '101.44px', bottom: '83.8452px' },
      moveTo: { x: 23.08211, y: -19.56091 },
    },
    {
      position: { left: '221.254px', bottom: '188.907px' },
      moveTo: { x: 50.23914, y: -42.82118 },
    },
  ]
  const mapStartPoint = {
    x: camPosition.x * ratio - 3,
    y: camPosition.y * -1 * ratio - 3,
  }

  return (
    <div className="menuContainer fixed right-[2rem] text-white top-[3rem]">
      <div className="map">
        <span
          className="mapIcon border-2 rounded-full border-white bg-black w-8 h-8 flex justify-center items-center cursor-pointer "
          onClick={() => setMapDetails(!mapDetails)}
        >
          <FaMapLocationDot />
        </span>
        {mapDetails && (
          <div className="mapDetails absolute w-[300px]  bg-[#00000078] p-3 right-10">
            <span className="relative">
              {mapPositionPoints.map((point, index) => (
                <span
                  className="point absolute text-red-500"
                  key={index}
                  style={point.position}
                  onClick={() => camMove(point.moveTo)}
                >
                  <MdLocationPin />
                </span>
              ))}
              <span
                className="redPoint w-[6px] h-[6px] bg-orange-600 absolute rounded-full  shadow-2xl "
                style={{
                  left: `${mapStartPoint.x}px`,
                  bottom: `${mapStartPoint.y}px`,
                }}
              ></span>
              <Image src={map} alt="" />
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
