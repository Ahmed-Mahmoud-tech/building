import styled from 'styled-components'
export const Wrapper = styled.div`
  .feet {
    svg {
      color: ${(props) => props.feetColor};
      box-shadow: 0 0 17px -2px;
      padding: 0.3rem;
      border-radius: 0.5rem;
      background: #00000070;
    }
  }

  .slider {
    -webkit-appearance: none;
    width: 100%;
    height: 0.5rem;
    background: #d3d3d3;
    outline: none;
    opacity: 0.7;
    -webkit-transition: 0.2s;
    transition: opacity 0.2s;
  }

  .slider:hover {
    opacity: 1;
  }

  .slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 1rem;
    height: 1rem;
    background: gold;
    cursor: pointer;
  }

  .slider::-moz-range-thumb {
    width: 25px;
    height: 25px;
    background: #04aa6d;
    cursor: pointer;
  }

  button.a-enter-vr-button {
    display: none;
  }

  /***************************** */
  body {
    margin: 0;
    padding: 0;
    font-family: Arial, sans-serif;
  }

  #loading-bar {
    width: 100%;
    height: 10px; /* Adjust the height of the loading bar */
  }
`
