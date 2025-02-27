import styled from "styled-components";
import React, { useEffect, useState } from "react";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 800px;
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
    padding: 10px 0;
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
    color: white;
    text-align: center;
    margin-bottom: 10px;
`;

export default function Tabela() {
    const [stocks, setStocks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const userId = "seuUserIdAqui"; // Definir userId corretamente

    const fetchUserStocks = async () => {
        try {
            const response = await fetch(`https://neoinvestserver-production.up.railway.app/stocks?userId=${userId}`);
            if (!response.ok) throw new Error("Falha ao carregar os dados");
            const data = await response.json();

            setStocks(data.map(stock => ({
                name: stock.companyName,
                symbol: stock.symbol,
                price: stock.currentPrice,
                change: stock.appreciation
            })));
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserStocks();
        const interval = setInterval(fetchUserStocks, 90000);
        return () => clearInterval(interval);
    }, []);

    if (loading) return <p style={{ color: 'white' }}>Carregando...</p>;
    if (error) return <p style={{ color: 'red' }}>Erro: {error}</p>;

    const verifyChange = (change) => {
        const changeValue = Number(change);
        if (changeValue > 0) return <p style={{ color: '#50FA7B' }}>+{change}%</p>;
        if (changeValue < 0) return <p style={{ color: '#FF5555' }}>{change}%</p>;
        return <p>{change}%</p>;
    };

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
                        <Li>{typeof stock.price === 'number' ? `$${stock.price.toFixed(2)}` : "Indisponível"}</Li>
                        <Li>{stock.change !== 'N/A' ? verifyChange(stock.change) : "Indisponível"}</Li>
                    </InfoWrapper>
                ))}
            </div>
        </Container>
    );
                    }
