
import { useState } from "react"
import styled from "styled-components"

const StyledContainer = styled.div`
  margin-bottom: 15px;
  position: relative;
  
  display: flex;
  align-items: center;
`

const Line = styled.div`
  width: 5px;
  height: 35px;
  
  position: absolute;
  
  background-color: #0A5DA6;
  border-radius: 3px 0 0 3px;
  transition: transform 0.3s ease-in-out;

  ${({ $isFocused }) => $isFocused && `transform: translateX(-5px);`}
`

const InputContainer = styled.div`
  padding: 5px;

  height: 35px;
  width: 250px;
  
  border: 2px solid ${props => props.$error ? '#ff0000' : '#ccc'};
  background-color: #fff;

  
  z-index: 2;
  position: relative;
  transition: border 0.3s ease-in-out;
`

const StyledInput = styled.input`
  border: none;
  outline: none;
  background-color: transparent;
  width: 100%;
  height: 100%;
`

const StyledLabel = styled.label`
  position: absolute;

  background-color: #fff;
  padding: 0 5px;
  transition: all 0.2s ease-in-out;
  pointer-events: none;
  z-index: 3;
  
  ${({ $isFocused, $hasValue }) =>
    ($isFocused || $hasValue) &&
    `
    transform: translateY(-15px);
    font-size: 12px;
    color: #0A5DA6;
  `}
`

export default function Input({ type, onChange, value, label, error, onKeyDown }) {
  const [isFocused, setIsFocused] = useState(false)
  const [inputValue, setInputValue] = useState("")

  const handleChange = (e) => {
    setInputValue(e.target.value)
    if (onChange) onChange(e)
  }

  return (
    <StyledContainer>
      <Line $isFocused={isFocused} />
      <InputContainer $error = {error}>
        <StyledLabel $isFocused={isFocused} $hasValue={inputValue.length > 0}>
          {label}
        </StyledLabel>
        <StyledInput
          value={value || inputValue}
          type={type}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChange = {handleChange}
          onKeyDown = {onKeyDown}
        />
      </InputContainer>
    </StyledContainer>
  )
}
