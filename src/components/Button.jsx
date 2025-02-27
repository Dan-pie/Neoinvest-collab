import styled from 'styled-components'

const StyledButton = styled.button`
  padding: 10px;

  width: 250px;

  background-color: #0A5DA6;
  color: #fff;
  border: none;

  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
  &:hover{
    background-color: #09467B;
  }
`

export default function Button({ text, onClick }){
  return(
    <>
      <StyledButton
        onClick = { onClick }
      >
        { text }
      </StyledButton>
    </>
  )
}
