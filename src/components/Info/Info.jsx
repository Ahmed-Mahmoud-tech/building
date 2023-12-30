import React from 'react'
import { Wrapper } from './Info.styled'
import { FaRegWindowClose } from "react-icons/fa";

function Info({ setPopStatus , title , desc}) {
  return (
      <Wrapper >
          <span className="closeOutside" onClick={()=> setPopStatus(false)}> </span>
          <div className="info">
              
          <div className="popHeader">
              <span className="title">
                  {title}
              </span>
              <button className="close" onClick={()=> setPopStatus(false)}>
                  <FaRegWindowClose />
              </button>
          </div>
          <div className="body">
                {desc}
          </div>
          </div>
    </Wrapper>
  )
}

export default Info