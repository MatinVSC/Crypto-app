import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import styled from "styled-components";
import { PAGE_SIZE } from '../utils/constants';
import { useTranslation } from "react-i18next";

const StyledPagination = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 768px) {
    gap: 1rem;
    align-items: center;
  }
`;

const P = styled.p`
  font-size: 1.4rem;
  margin-left: 0.8rem;

  & span {
    font-weight: 600;
  }

  @media (max-width: 768px) {
    font-size: 1.2rem;
    margin-left: 0;
    text-align: center;
  }
`;

const Buttons = styled.div`
  display: flex;
  gap: 0.6rem;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const PaginationButton = styled.button`
  background-color: ${(props) =>
    props.active ? " var(--color-brand-600)" : "var(--color-grey-50)"};
  color: ${(props) => (props.active ? " var(--color-brand-50)" : "inherit")};
  border: none;
  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.6rem 1.2rem;
  transition: all 0.3s;

  &:has(span:last-child) {
    padding-left: 0.4rem;
  }

  &:has(span:first-child) {
    padding-right: 0.4rem;
  }

  & svg {
    height: 1.8rem;
    width: 1.8rem;

    @media (max-width: 768px) {
      height: 1.2rem;
      width: 1.2rem;
    }
  }

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

export default function Pagination({ count, currentPage, setCurrentPage }) {
  const { t } = useTranslation();
  const pageCount = Math.ceil(count / PAGE_SIZE);

  const nextPage = () => {
    if (currentPage < pageCount) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (pageCount <= 1) return null;

  return (
    <StyledPagination>
      <P>
        {t('filter.showing', 'showing')} <span>{(currentPage - 1) * PAGE_SIZE + 1}</span> {t('filter.to', 'to')} <span>{currentPage === pageCount ? count : currentPage * PAGE_SIZE}</span> {t('filter.of', 'of')} <span>{count}</span> {t('filter.results', 'showing')}
      </P>

      <Buttons>
        <PaginationButton
          onClick={prevPage}
          disabled={currentPage === 1}
        >
          <HiChevronLeft /> <span>{t('filter.prev', 'Previous')}</span>
        </PaginationButton>
        <PaginationButton
          disabled={currentPage === pageCount}
          onClick={nextPage}
        >
          <span>{t('filter.next', 'Next')}</span>
          <HiChevronRight />
        </PaginationButton>
      </Buttons>
    </StyledPagination>
  );
}
