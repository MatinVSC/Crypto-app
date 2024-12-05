import { createContext, useContext } from "react";
import styled, { css } from "styled-components";

const StyledTable = styled.div`
  border: 1px solid #e0e0e0;
  font-size: 1.6rem;
  background-color: #ffffff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.05); /* سایه ملایم */
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
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.05); /* سایه ملایم */
`;

const CommonRow = styled.div`
  display: grid;
  grid-template-columns: ${(props) => props.columns};
  column-gap: 2.4rem;
  align-items: center;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;

  /* افکت تعاملی */
  &:hover {
    background-color: #f8f9fa; /* رنگ ملایم در هاور */
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.05); /* سایه در هاور */
  }
`;

const StyledHeader = styled(CommonRow)`
  padding: 1.8rem 2.4rem;
  background-color: #f4f6f8; /* رنگ روشن‌تر برای تمایز */
  border-bottom: 1px solid #e0e0e0;
  text-transform: uppercase;
  letter-spacing: 0.05em; /* فاصله بین حروف */
  font-weight: 700;
  color: #333333;
`;

const StyledRow = styled(CommonRow)`
  padding: 2rem 2.4rem;
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  transition: transform 0.2s ease;

  /* افکت تعاملی */
  &:hover {
    transform: translateY(-3px); /* حرکت ملایم در هاور */
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.05);
  }
`;

const StyledBody = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr; /* استفاده از 1fr برای انعطاف‌پذیری بیشتر */
  gap: 4rem;
  padding: 2rem; /* کاهش فاصله اضافی */
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
`;

const Empty = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  text-align: center;
  margin: 2.4rem;
  color: #888888; /* رنگ ملایم برای پیام خالی */
`;



const TableContext = createContext();

function Table({ columns, children }) {
  return (
    <TableContext.Provider value={{ columns }}>
      <StyledTable role="table">{children}</StyledTable>
    </TableContext.Provider>
  );
}

function Header({ children }) {
  const { columns } = useContext(TableContext);
  return (
    <StyledHeader role="row" columns={columns} as="header">
      {children}
    </StyledHeader>
  );
}

function Row({ children }) {
  const { columns } = useContext(TableContext);
  return (
    <StyledRow role="row" columns={columns}>
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


// const StyledTable = styled.div`
//   border: 2px solid var(--color-grey-200);
//   font-size: 1.4rem;
//   background-color: var(--color-grey-0);
//   border-radius: 7px;
//   overflow: hidden;
// `;

// const StyleddPlans = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   gap: 1.2rem;
//   padding: 4rem 2.4rem;
//   border-radius: 12px;
// `;

// const CommonRow = styled.div`
//   display: grid;
//   grid-template-columns: ${(props) => props.columns};
//   column-gap: 2.4rem;
//   align-items: center;
//   transition: none;
// `;

// const StyledHeader = styled(CommonRow)`
//   padding: 1.6rem 2.4rem;
//   background-color: var(--color-grey-50);
//   border-bottom: 1px solid var(--color-grey-100);
//   text-transform: uppercase;
//   letter-spacing: 0.4px;
//   font-weight: 600;
//   color: var(--color-grey-600);
// `;

// const StyledRow = styled(CommonRow)`
//   padding: 2rem 2.4rem;
//   border: 1px solid var(--color-grey-500);
//   border-radius: 12px;
// `;

// const StyledBody = styled.section`
//   display: grid;
//   grid-template-columns: 500px 500px;
//   gap: 5rem;
//   margin: 4rem 4rem;
// `;

// const Footer = styled.footer`
//   background-color: var(--color-grey-50);
//   display: flex;
//   justify-content: center;
//   padding: 1.2rem;

//   /* This will hide the footer when it contains no child elements. Possible thanks to the parent selector :has 🎉 */
//   &:not(:has(*)) {
//     display: none;
//   }
// `;

// const Empty = styled.p`
//   font-size: 1.6rem;
//   font-weight: 500;
//   text-align: center;
//   margin: 2.4rem;
// `;