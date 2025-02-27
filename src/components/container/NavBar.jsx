import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from 'react-router-dom'

const BackgroundBlur = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(5px);
    z-index: 5; 
    display: ${({ menu }) => (menu ? "block" : "none")};
    opacity: ${({ menu }) => (menu ? "1" : "0")};
    visibility: ${({ menu }) => (menu ? "visible" : "hidden")};
    transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;

`;

const Svg = styled.svg`
    width: 50px;
    height: 50px;
    fill: #1E1F20;
    transition: transform 0.2s ease;

    &:hover{
        cursor: pointer;
        transform: scale(1.1);
    }

`

const PWrapper = styled.div`

    font-family: Sf-pro;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    margin: 20px;
    width: 200px;

    & > p {
      color: black;
      font-size: 17px;
      font-weight: 500;
      font-family: Sf-pro;
      text-align: center;
      transition: transform 0.3s ease;
    }

    & > p:hover {
        cursor: pointer;
        transform: scale(1.1);
      }
    `

const ContainerNavbar = styled.div`
    padding-top: 10px;
    position: relative;
    width: 75vw;
    height: ${({ menu }) => (menu ? "150px" : "100px")};
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 10px;
    transition: height 0.3s ease-in-out;
    z-index: 10; 

    & > .container {
        display: flex;
        justify-content: space-around;
        align-items: center;
        width: 100%;
    }

    .container > .logo_container {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 80px;
        height: 80px;
        background-color: #1e1f20;
        border-radius: 50%;
    }


`;

const Extra = styled.div`
    width: 100%;
    display: ${({ menu }) => (menu ? "flex" : "none")};
    flex-direction: row;
    justify-content: space-around; 
    align-items: center;
    gap: 20px;  
    background-color: white;
    border-radius: 10px;
    color: black;
`

const Img = styled.img`
    width: 40px;
    height: 40px;
`

function Navbar() {
  const [menu, setMenu] = useState(false);
    const navigate = useNavigate()

  return (
    <>
      <BackgroundBlur menu={menu} onClick={() => setMenu(false)} />
      <ContainerNavbar menu={menu}>
        <div className="container">
          <div>
            <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M352 256c0 22.2-1.2 43.6-3.3 64l-185.3 0c-2.2-20.4-3.3-41.8-3.3-64s1.2-43.6 3.3-64l185.3 0c2.2 20.4 3.3 41.8 3.3 64zm28.8-64l123.1 0c5.3 20.5 8.1 41.9 8.1 64s-2.8 43.5-8.1 64l-123.1 0c2.1-20.6 3.2-42 3.2-64s-1.1-43.4-3.2-64zm112.6-32l-116.7 0c-10-63.9-29.8-117.4-55.3-151.6c78.3 20.7 142 77.5 171.9 151.6zm-149.1 0l-176.6 0c6.1-36.4 15.5-68.6 27-94.7c10.5-23.6 22.2-40.7 33.5-51.5C239.4 3.2 248.7 0 256 0s16.6 3.2 27.8 13.8c11.3 10.8 23 27.9 33.5 51.5c11.6 26 20.9 58.2 27 94.7zm-209 0L18.6 160C48.6 85.9 112.2 29.1 190.6 8.4C165.1 42.6 145.3 96.1 135.3 160zM8.1 192l123.1 0c-2.1 20.6-3.2 42-3.2 64s1.1 43.4 3.2 64L8.1 320C2.8 299.5 0 278.1 0 256s2.8-43.5 8.1-64zM194.7 446.6c-11.6-26-20.9-58.2-27-94.6l176.6 0c-6.1 36.4-15.5 68.6-27 94.6c-10.5 23.6-22.2 40.7-33.5 51.5C272.6 508.8 263.3 512 256 512s-16.6-3.2-27.8-13.8c-11.3-10.8-23-27.9-33.5-51.5zM135.3 352c10 63.9 29.8 117.4 55.3 151.6C112.2 482.9 48.6 426.1 18.6 352l116.7 0zm358.1 0c-30 74.1-93.6 130.9-171.9 151.6c25.5-34.2 45.2-87.7 55.3-151.6l116.7 0z"/></Svg>
          </div>
          <div>
            <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48L48 64zM0 176L0 384c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-208L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"/></Svg>
          </div>
          <div className="logo_container">
            <Img src="../imgs/logo.png" alt="" onClick={() => {navigate('/ConteMais')}/>
          </div>
          <div>
            <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M75 75L41 41C25.9 25.9 0 36.6 0 57.9L0 168c0 13.3 10.7 24 24 24l110.1 0c21.4 0 32.1-25.9 17-41l-30.8-30.8C155 85.5 203 64 256 64c106 0 192 86 192 192s-86 192-192 192c-40.8 0-78.6-12.7-109.7-34.4c-14.5-10.1-34.4-6.6-44.6 7.9s-6.6 34.4 7.9 44.6C151.2 495 201.7 512 256 512c141.4 0 256-114.6 256-256S397.4 0 256 0C185.3 0 121.3 28.7 75 75zm181 53c-13.3 0-24 10.7-24 24l0 104c0 6.4 2.5 12.5 7 17l72 72c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-65-65 0-94.1c0-13.3-10.7-24-24-24z"/></Svg>
          </div>
          <div>
            <Svg xmlns="http://www.w3.org/2000/svg" onClick={() => setMenu(!menu)} viewBox="0 0 448 512"><path d="M8 256a56 56 0 1 1 112 0A56 56 0 1 1 8 256zm160 0a56 56 0 1 1 112 0 56 56 0 1 1 -112 0zm216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112z"/></Svg>
          </div>
        </div>
        {menu && (
        <Extra menu={menu}>


              <PWrapper>
                  <p style={{fontFamily: 'SF Pro Display'}}>Termos e condições</p>
              </PWrapper>
              <PWrapper>
                  <p style={{fontFamily: 'SF Pro Display'}}>Política de privacidade</p>
              </PWrapper>
              <PWrapper>
                  <p style={{fontFamily: 'SF Pro Display'}}>Logout</p>
              </PWrapper>


        </Extra>
        )}
      </ContainerNavbar>
    </>
  );
}

export default Navbar;
