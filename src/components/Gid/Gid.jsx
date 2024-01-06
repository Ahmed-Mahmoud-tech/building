import React, { useState } from 'react'

export default function Gid() {
  const [currentStep, setCurrentStep] = useState(0)
  const steps = {
    nave: {
      // mobile, desktop, both
      for: 'desktop',
      component: () => (
        <div className="text-white text-2xl font-bold">
          For move forward press [ W or
          <span className=" rotate-[-90deg] inline-block">➔</span> ]
        </div>
      ),
    },
  }
  return (
    <div className="w-screen h-screen top-0 left-0 flex items-center justify-center z-40 fixed">
      <span className="absolute w-full h-full bg-black opacity-70 top-0 left-0"></span>
      <div className="stepComponent z-30">
        {steps[Object.keys(steps)[currentStep]].component()}
      </div>
    </div>
  )
}
