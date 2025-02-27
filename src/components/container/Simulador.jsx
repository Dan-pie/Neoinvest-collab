import styled from "styled-components";
import { useState } from "react";
import Button from "../Button";

const SimuladorWrapper = styled.div`
  font-family: "Sf-pro";
  padding: 30px;
  background-color: #101010;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 500px;
  height: auto;
`;

const FormSimulador = styled.form`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 100%;
  position: relative;
  gap: 10px;
`;

const InputSimulador = styled.input`
  background-color: transparent;
  width: 200px;
  height: 40px;
  border-radius: 5px;
  border: 2px solid white;
  color: #fff;
  outline: none;
  padding: 10px;
`;

const SuggestionsList = styled.ul`
  position: absolute;
  top: 45px;
  width: 100%;
  background-color: #202020;
  border-radius: 5px;
  list-style: none;
  padding: 5px;
  max-height: 150px;
  overflow-y: auto;
  border: 1px solid #fff;
  z-index: 10;
`;

const SuggestionItem = styled.li`
  padding: 8px;
  cursor: pointer;
  color: white;
  &:hover {
    background-color: #303030;
  }
`;

const ResultWrapper = styled.div`
  width: 100%;
  color: white;
  text-align: left;
  margin-top: 10px;
`;

function Simulador() {
  const [ticket, setTicket] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [precoAcao, setPrecoAcao] = useState(null);
  const [variacao, setVariacao] = useState(null);
  const [total, setTotal] = useState(null);

  const API_KEY = "currju9r01qt2ncgsik0currju9r01qt2ncgsikg"; // Substitua pela sua chave

  // Buscar sugestões enquanto digita
  const fetchSuggestions = async (query) => {
    if (query.length < 2) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await fetch(
        `https://finnhub.io/api/v1/search?q=${query}&token=${API_KEY}`
      );
      const data = await response.json();

      if (data.result) {
        setSuggestions(
          data.result
            .filter((item) => item.symbol && item.description) // Evita resultados vazios
            .map((item) => ({
              symbol: item.symbol,
              description: item.description,
            }))
        );
      }
    } catch (error) {
      console.error("Erro ao buscar sugestões:", error);
    }
  };

  // Buscar preço da ação
  const fetchStockPrice = async (symbol) => {
    try {
      const response = await fetch(
        `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${API_KEY}`
      );
      const data = await response.json();

      if (data.c) {
        const precoAtual = parseFloat(data.c);
        const variacaoAtual = data.d && data.pc ? ((data.d / data.pc) * 100).toFixed(2) : "0.00";

        setPrecoAcao(precoAtual);
        setVariacao(variacaoAtual);
        setTotal(precoAtual * (parseInt(quantidade) || 0));
      } else {
        console.error("Erro: Dados da API inválidos");
      }
    } catch (error) {
      console.error("Erro ao buscar preço da ação:", error);
    }
  };

  // Atualiza ticket e busca sugestões
  const handleChange = (e) => {
    const value = e.target.value;
    setTicket(value);
    fetchSuggestions(value);
  };

  // Seleciona um ticket e fecha sugestões
  const handleSelect = (symbol) => {
    setTicket(symbol);
    setSuggestions([]);
  };

  // Simula a compra ao clicar no botão
  const handleSimular = (e) => {
    e.preventDefault();
    if (ticket && quantidade) {
      fetchStockPrice(ticket);
    }
  };

  return (
    <SimuladorWrapper>
      <h1 style={{ color: "#fff" }}>Simulador</h1>
      <FormSimulador onSubmit={handleSimular}>
        <div style={{ position: "relative", width: "100%" }}>
          <InputSimulador
            type="text"
            placeholder="Ticket"
            value={ticket}
            onChange={handleChange}
            onFocus={() => fetchSuggestions(ticket)}
          />
          {suggestions.length > 0 && (
            <SuggestionsList>
              {suggestions.map((sugestao) => (
                <SuggestionItem
                  key={sugestao.symbol}
                  onClick={() => handleSelect(sugestao.symbol)}
                >
                  {sugestao.symbol} - {sugestao.description}
                </SuggestionItem>
              ))}
            </SuggestionsList>
          )}
        </div>
        <InputSimulador
          type="number"
          placeholder="Quantidade"
          value={quantidade}
          onChange={(e) => setQuantidade(e.target.value)}
        />
        <Button text="Simular" />
      </FormSimulador>

      {precoAcao !== null && (
        <ResultWrapper>
          <p>💰 Preço por ação: <strong>${precoAcao.toFixed(2)}</strong></p>
          <p>📈 Variação: <strong>{variacao}%</strong></p>
          <p>📊 Valor total: <strong>${total.toFixed(2)}</strong></p>
        </ResultWrapper>
      )}
    </SimuladorWrapper>
  );
}

export default Simulador;
