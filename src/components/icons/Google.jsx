import styled from "styled-components"
import { auth, db } from '../../firebase.js'
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { setDoc, doc, getDoc } from "firebase/firestore"

const StyledSvg = styled.svg`
  margin: 10px;

  width: 30px;
  height: 30px;

  fill: #ccc;

  transition: all ease 0.3s;

  &:hover {
    fill: #0A5DA6;
  }
`

export default function Google() {
  const HandleGoogleSignup = async() => {
        const provider = new GoogleAuthProvider()
        try{
            const result = await signInWithPopup(auth, provider)
            const user = result.user

            const userRef = doc(db, 'users', user.uid)
            const userDoc = await getDoc(userRef)

            if(!userDoc.exists()){
                await setDoc(userRef, {
                    name: user.displayName,
                    email: user.email,
                })
            }
            else{
            }
        }
        catch(error){
        }
    }
  return (
    <StyledSvg  onClick = {HandleGoogleSignup} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"/></StyledSvg>
  )
}