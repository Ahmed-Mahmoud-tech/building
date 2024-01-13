import React from 'react'
// import { Wrapper } from './Preloadre.style'
import './Preloading.css'
export default function PreLoader() {
  return (
    <div className="container bg-[#1e1e1e] z-20 min-w-[100vw] h-screen flex justify-center items-center top-0 left-0 absolute">
      <div className="row">
        <div className="col-md-12 text-center">
          <h3 className="animate-loading"> Loading Model ...</h3>
        </div>
      </div>
    </div>
  )
}
