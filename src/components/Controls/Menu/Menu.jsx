import React, { useState } from 'react'
import map from '../../../assets/images/bicycle/map.png'
import { FaMapLocationDot } from 'react-icons/fa6'
import Image from 'next/image'

export default function Menu({ camPosition }) {
  const [mapDetails, setMapDetails] = useState(false)
  const ratio = 171.5 / 38.3

  const mapStartPoint = {
    x: camPosition.x * ratio - 3,
    y: camPosition.y * -1 * ratio - 3,
  }
  // const mapStartPoint = {
  //   x: (camPosition.x + 4.34) * ratio - 1,
  //   y: (camPosition.y * -1 + 9.26) * ratio - 1,
  // }
  console.log(camPosition, mapStartPoint)

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
              <span
                className="redPoint w-[6px] h-[6px] bg-orange-600 absolute rounded-full "
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
