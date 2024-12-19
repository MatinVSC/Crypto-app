import styled, { css } from "styled-components";
import { createContext, useContext } from "react";

const StyledTable = styled.div`
  border: 1px solid #e0e0e0;
  font-size: 1.6rem;
  background-color: #ffffff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.05);

  @media (max-width: 768px) {
    width: 100%;
    font-size: 1.2rem; 
    overflow-x: auto;
  }
`;

const StyleddPlans = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  padding: 4rem 2.4rem;
  background: linear-gradient(90deg, #f9fbfd, #ffffff);
  border-radius: 12px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.05);
`;

const CommonRow = styled.div`
  display: grid;
  grid-template-columns: ${(props) => props.columns};
  column-gap: 2.4rem;
  align-items: center;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    background-color: #f8f9fa;
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.05);
  }

  @media (max-width: 768px) {
    column-gap: 1.2rem;
  }
`;

const StyledHeader = styled(CommonRow)`
  padding: 1.8rem 2.4rem;
  background-color: #f4f6f8;
  border-bottom: 1px solid #e0e0e0;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 700;
  color: #333333;

  @media (max-width: 768px) {
    grid-template-columns: repeat(5, 1fr);
    padding: 1.2rem 1.6rem;
  }

  ${(props) =>
    props.type === "horizontal" &&
    css`
      @media (max-width: 768px) {
        grid-template-columns: repeat(4, 1fr);
      }
    `}
`;

const StyledRow = styled(CommonRow)`
  padding: 2rem 2.4rem;
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.05);
  }

  @media (max-width: 768px) {
    padding: 1.6rem 0;
    grid-template-columns: repeat(5, 1fr);
  }

  ${(props) =>
    props.type === "horizontal" &&
    css`
      @media (max-width: 768px) {
        grid-template-columns: repeat(4, 1fr);
      }
    `}
`;

const StyledBody = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  padding: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const Footer = styled.footer`
  background-color: #f4f6f8;
  display: flex;
  justify-content: center;
  padding: 1.2rem;
  border-top: 1px solid #e0e0e0;

  &:not(:has(*)) {
    display: none;
  }

  @media (max-width: 768px) {
    padding: 0.8rem;
  }
`;

const Empty = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  text-align: center;
  margin: 2.4rem;
  color: #888888;

  @media (max-width: 768px) {
    font-size: 1.4rem;
  }
`;

const TableContext = createContext();

function Table({ columns, children }) {
  return (
    <TableContext.Provider value={{ columns }}>
      <StyledTable role="table">{children}</StyledTable>
    </TableContext.Provider>
  );
}

function Header({ children, type }) {
  const { columns } = useContext(TableContext);
  return (
    <StyledHeader role="row" columns={columns} type={type} as="header">
      {children}
    </StyledHeader>
  );
}

function Row({ children, type }) {
  const { columns } = useContext(TableContext);
  return (
    <StyledRow role="row" columns={columns} type={type}>
      {children}
    </StyledRow>
  );
}

function Plans({ children }) {
  const { columns } = useContext(TableContext);
  return (
    <StyleddPlans role="row" columns={columns}>
      {children}
    </StyleddPlans>
  );
}

function Body({ data, render }) {
  if (!data) return <Empty>No data to show at the moment</Empty>;

  return <StyledBody>{data.map(render)}</StyledBody>;
}

Table.Header = Header;
Table.Body = Body;
Table.Row = Row;
Table.Plans = Plans;
Table.Footer = Footer;

export default Table;
