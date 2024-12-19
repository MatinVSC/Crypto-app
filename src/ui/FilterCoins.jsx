import { useNavigate, useSearchParams } from "react-router-dom";
import styled, { css } from "styled-components";

const StyledFilter = styled.div`
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  display: flex;
  gap: .6rem;
  flex-wrap: nowrap;
`;

const FilterButton = styled.button`
  background-color: var(--color-grey-0);
  border: none;

  ${(props) =>
    props.active &&
    css`
      background-color: var(--color-brand-600);
      color: var(--color-brand-50);
    `}

  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  padding: 0.44rem 0.8rem;
  transition: all 0.3s;
  white-space: nowrap;

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }

  @media (max-width: 768px) {
    padding: 0.2rem;
    white-space: nowrap;
  }
`;

export default function Filter({ filterField, options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilter = searchParams.get(filterField) || options.at(0).value;
  const navigate = useNavigate();

  function handleClick(value) {
    searchParams.set(filterField, value);
    setSearchParams(searchParams)

    if (value === 'all') return;

    value === "plans"
      ? navigate('/plans')
      : navigate('/gett');
  }

  return (
    <StyledFilter>
      {options.map(option => (
        <FilterButton
          key={option.value}
          onClick={() => handleClick(option.value)}
          disabled={option.value === currentFilter}
          active={option.value === currentFilter}
        >
          {option.label}
        </FilterButton>
      ))}
    </StyledFilter>
  );
}
