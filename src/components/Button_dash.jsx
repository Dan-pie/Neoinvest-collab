import styled from "styled-components"


const Button = styled.button`
    font-size: 16px;
    font-weight: bold;
    background-color: #0A5DA6;
    color: #fff;
    border: none;
    padding: 20px;
    border-radius: 10px;
    cursor: pointer;
    transition: background-color 0.3s ease-in-out;
    &:hover{
        background-color: #09467B;
    }
`


export default function Button_dash({text, onClick}){

    return(
        <Button onClick={onClick}> {text}</Button>
    )
}