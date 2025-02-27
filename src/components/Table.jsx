import styled from "styled-components"

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`

const StyledTh = styled.th`
    padding: 10px;
    background-color: #0A5DA6;
    color: #fff;
`

const StyledTd = styled.td`
    padding: 5px;
`

const StyledTr = styled.tr`
    text-align: center;
    border-bottom: 2px solid #ccc;
    color: #0A5DA6;

    &:hover {
        background-color: #cccccc;
    }
`

export default function Table({ dados }) {
  return (
    <StyledTable>
      <thead>
        <tr>
          {dados.th.map((item, id) => (
            <StyledTh key={id}>{item}</StyledTh>
          ))}
        </tr>
      </thead>
      <tbody>
        {dados.tb.map((linha, idLinha) => (
          <StyledTr key={idLinha}>
            {Object.values(linha).map((item, idColuna) => (
              <StyledTd key={idColuna}>{item}</StyledTd>
            ))}
          </StyledTr>
        ))}
      </tbody>
    </StyledTable>
  )
}
