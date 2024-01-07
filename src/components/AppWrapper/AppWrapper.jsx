'use client'
import React, { useEffect } from 'react'
import { Provider } from 'react-redux'
import store from '../../store/store'
import { toast } from 'react-toastify'

let isFirstLoad = 0

export default function AppWrapper({ children }) {
  useEffect(() => {
    if (window.innerWidth > 800 && isFirstLoad === 0) {
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
    <Provider store={store}>
      <>{children}</>
    </Provider>
  )
}
