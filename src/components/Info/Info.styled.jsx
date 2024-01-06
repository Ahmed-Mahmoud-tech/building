import styled from 'styled-components'
export const Wrapper = styled.div`
  position: fixed;
  z-index: 30;
  display: flex;
  top: 0;
  left: 0;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background: #00000080;

  .info {
    width: 400px;
    max-width: 90%;
    max-height: 90%;
    background: linear-gradient(45deg, black, transparent);
    color: white;
    padding: 1rem;
    border-radius: 1rem;
  }

  .title {
    font-size: 1.5rem;
    color: orange;
    font-weight: bold;
    padding-bottom: 4px;
    border-bottom: 1px solid;
  }

  .popHeader {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
  }

  .close {
    font-size: 1.5rem;
    margin-top: 0.4rem;
  }

  .closeOutside {
    top: 0;
    left: 0;
    position: fixed;
    width: 100vw;
    height: 100vh;
    z-index: -1;
  }
`
