import Navbar from "../components/container/NavBar"
import Simulador from "../components/container/Simulador"
import { createGlobalStyle } from "styled-components"
import Tabela from "../components/container/Tabela"

const GlobalStyle = createGlobalStyle`
    @font-face {
        font-family: 'Neutra';
        src: url(/fonts/neutra.otf) format('opentype');

    }

    @font-face {
        font-family: 'Sf-pro';
        src: url(fonts/SFPro.ttf) format('truetype');
    }
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;

        font-family: 'Neutra';
    }

    body {
        padding: 15px;
        background-color: #1e1f20;
        display: flex;
        justify-content: center;
    }

    main {
        margin-top: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        gap: 20px;
    }

    h1 {
        color: white;
    }
`

export default function Dashboard() {
    return (
        <div>
            <GlobalStyle/>
            <nav>
                <Navbar></Navbar>
            </nav>
            <main>
                <Simulador/>
                <Tabela/>

            </main>

        </div>
    )
}