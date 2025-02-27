import styled from "styled-components"
import { auth, db } from '../../firebase.js'
import { TwitterAuthProvider, signInWithPopup } from "firebase/auth"
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


export default function Twitter(){
    const HandleTwitterSignup = async() => {
        const provider = new TwitterAuthProvider()
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
                alert('criado com o twitter')
            }
            else{
                alert('logado com o twitter')
            }
        }
        catch(error){
            console.error('Erro ao cadastrar com o twitter: ', error);
        }
    }

    return(
        <StyledSvg onClick={HandleTwitterSignup} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"/></StyledSvg>
    )
}