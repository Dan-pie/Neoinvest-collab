import styled from "styled-components";
import React, { useEffect, useState } from "react";
import axios from "axios";

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
    const API_KEY = 'currju9r01qt2ncgsik0currju9r01qt2ncgsikg'; // 🔹 Use variáveis de ambiente
    const [stocks, setStocks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    const fetchStock = async () => {
        try {
            console.log("Buscando dados...");
            const response = await axios.get(`https://finnhub.io/api/v1/stock/symbol?exchange=US&token=${API_KEY}`);

            if (!response.data || response.data.length === 0) {
                throw new Error("Nenhum dado encontrado");
            }

            const top5 = response.data.slice(0, 5);

            const details = await Promise.all(
                top5.map(async (stock) => {
                    const quoteRes = await axios.get(`https://finnhub.io/api/v1/quote?symbol=${stock.symbol}&token=${API_KEY}`);
                    
                    const price = quoteRes.data.c || "N/A";
                    const change = typeof quoteRes.data.dp === 'number' ? quoteRes.data.dp.toFixed(2) : "N/A";

                    return {
                        name: stock.description || "Desconhecido",
                        symbol: stock.symbol,
                        price: price,
                        change: change,
                    };
                })
            );

            setStocks(details);
        } catch (erro) {
            setError(erro.message);
            console.error("Erro na API:", erro);
        } finally {
            setLoading(false);
        }
    };

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
