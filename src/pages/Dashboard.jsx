import Navbar from "../components/container/NavBar"
import Simulador from "../components/container/Simulador"
import { createGlobalStyle } from "styled-components"
import Table from "../components/Table"
import { useAuth } from "../context/AuthContext"

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
    const [dados, setDados] = useState({
        th: ["Empresa", "Ticket", 'Preço', 'Variação'],
        tb: []
    })
    const userId = useAuth()
    const fetchUserStocks = async () => {       
        try {
            const response = await fetch(`https://neoinvestserver-production.up.railway.app/stocks?userId=${userId}`)
            const data = await response.json()

            setDados(prevState => ({
                ...prevState,
                tb: data.map(stock => ({
                    empresa: stock.companyName,
                    ticket: stock.symbol,
                    preco: stock.currentPrice,
                    variacao: stock.appreciation
                }))
            }))
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.error('Erro ao buscar as ações do usuário:', error)
        }
    }
    return (
        <div>
            <GlobalStyle/>
            <nav>
                <Navbar></Navbar>
            </nav>
            <main>
                <Simulador/>
                <Table dados={dados}/>

            </main>

        </div>
    )
}
