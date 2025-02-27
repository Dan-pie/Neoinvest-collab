import styled from 'styled-components'
import Input from './Input'
import Button from './Button'
import { useState } from 'react'

import { auth, db } from "../firebase"
import { sendPasswordResetEmail } from "firebase/auth"
import { collection, getDocs } from "firebase/firestore"

const P = styled.p`
  color: #0A5DA6;
  cursor: pointer;
`


const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;

  position: fixed; 
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); 

  z-index: 15;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: rgba(0,0,0,0.3);
`

const StyledContainer = styled.div`
  width: 80vw;
  height: 30vh;

  position: relative;

  display: flex;
  align-items: center;
  flex-direction: column;

  background-color: white;
  border-radius: 10px;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);

  h1{
    cursor: pointer;
  }

  @media (min-width: 868px) {
    width: 40vw;
  }
`

const StyledHeader = styled.div`
  margin: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: small;
`

const Content = styled.div`
  height: 100%;
  display: flex; 
  flex-direction: column;
  justify-content: center;
`

const HeaderTextContainer = styled.div``

export default function ForgotPassword() {
  const [display, setDisplay] = useState(false)
  const toggle = () => setDisplay((prev) => !prev)

  const [email, setEmail] = useState("")
  const [errorEmail, setErrorEmail] = useState(false)

  const handleResetPassword = async () => {
    if(email.length == 0){
      setTimeout(() => setErrorEmail(false), 1000)
      setErrorEmail(true)
      return
    }

    try {
      const usersCollection = collection(db, "users");
      const usersSnapshot = await getDocs(usersCollection);
      const userExists = usersSnapshot.docs.some(doc => doc.data().email === email);


      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      setTimeout(() => setErrorEmail(false), 1000)
      setErrorEmail(true)
    }
  }
  return (
    <>
      <P onClick={toggle}>Esqueceu a senha?</P>
      {display && (
        <Wrapper>
          <StyledContainer>
            <StyledHeader>
              <HeaderTextContainer>
                <h1>Recuperar senha</h1>
                <p>Informe seu email para receber um link de recuperação</p>
              </HeaderTextContainer>
              <h1 onClick={toggle}>X</h1>
            </StyledHeader>
            <Content>
              <Input 
                type="email" 
                label="Email"
                error = {errorEmail}
                value = {email}
                onChange = {(e) => setEmail(e.target.value)} 
              />
              <Button text="Enviar" onClick={handleResetPassword}/>
            </Content>
          </StyledContainer>
        </Wrapper>
      )}
    </>
  )
}