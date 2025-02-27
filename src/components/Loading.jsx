import styled from "styled-components"

const LoadingContainer = styled.div`
    height: 100vh;
    width: 100vw;

    display: flex;
    justify-content: center;
    align-items: center;

    position: fixed;

    background-color: #fff;

    z-index: 20;
`

const Spinner = styled.div`
  border: 4px solid #f3f3f3;
  border-top: 4px solid #1E1F20;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 2s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
export default function Loading(){
    return(
        <LoadingContainer>
            <Spinner/>
        </LoadingContainer>
    )
}