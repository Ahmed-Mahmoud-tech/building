import styled from 'styled-components'
export const Wrapper = styled.div`
  .sliderContainer {
    opacity: 0.5;
    -webkit-transition: 0.2s;
    transition: opacity 0.2s;
  }
  .sliderContainer:hover {
    opacity: 1;
  }
  .slider {
    -webkit-appearance: none;
    width: 100%;
    height: 0.5rem;
    background: #d3d3d3;
    outline: none;
  }

  .slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    border-radius: 50%;
    width: 1.5rem;
    height: 1.5rem;
    background: radial-gradient(orange, orange);

    cursor: pointer;
  }

  .slider::-moz-range-thumb {
    width: 25px;
    height: 25px;
    background: #04aa6d;
    cursor: pointer;
  }

  input#myRange {
    border-radius: 1rem;
    background: black;
    /* background: transparent; */
    box-shadow: 0 0 2px 2px orange;
  }
`
