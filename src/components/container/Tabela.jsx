import styled from "styled-components";
import React, { useEffect, useState } from "react";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 800px;
    height: auto;
    background-color: #101010;
    border-radius: 10px;
    overflow: hidden;
    border: 1px solid #ccc;
`;

const TitleWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    align-items: center;
    justify-items: center;
    background-color: rgba(167, 167, 167, 0.47);
    width: 100%;
    color: white;
    font-weight: 500;
    padding: 10px 0px;
`;

const InfoWrapper = styled.ul`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    align-items: center;
    justify-items: center;
    list-style-type: none;
    padding-left: 0;
    margin-top: 8px;
    border-bottom: 1px solid #ccc;
`;

const Li = styled.li`
    width: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: auto;
    color: white;
    text-align: center;
    margin-bottom: 10px;
`;

export default function Tabela() {
    
    const [stocks, setStocks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


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
    

    useEffect(() => {
        fetchStock();
        const interval = setInterval(fetchStock, 90000); 

        return () => clearInterval(interval); 
    }, []);




    if (loading) return <p style={{color: 'white'}}>Carregando...</p>;
    if (error) return <p>Erro: {error}</p>;

    const verifyChange = (change) => {
        if (Number(change) > 0){
            return (
                <p style={{color: '#50FA7B'}}>+{change}%</p>
            )
        }
        else if (Number(change) < 0){
            return (
                <p style={{color: '#FF5555'}}>{change}%</p>
            )
        }
        else {
            return (
                <p>{change}%</p>
            )
        }
    }


    return (
        <Container>
            <TitleWrapper>
                <p>Empresa</p>
                <p>Ticket</p>
                <p>Preço</p>
                <p>Variação</p>
            </TitleWrapper>
            <div>
                {stocks.map((stock, index) => (
                    <InfoWrapper key={index}>
                        <Li>{stock.name}</Li>
                        <Li>{stock.symbol}</Li>
                        <Li>{typeof(stock.price) == 'number' ? `$${stock.price.toFixed(2)}` : "Indisponivel"}</Li>
                        <Li>{(stock.change) != 'N/A' ? verifyChange(stock.change) : "Indisponivel"}</Li>
                    </InfoWrapper>
                ))}
            </div>
        </Container>
    );
}
