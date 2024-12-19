import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import Table from '../../ui/Table';
import Modal from '../../ui/Modal';
import ActivationPlan from './ActivationPlan';

const Card = styled.div`
  background-color: ${(props) => (props.special ? "#f0faff" : "#ffffff")};
  border: ${(props) => (props.special ? "2px solid #007bff" : "1px solid #e0e0e0")};
  border-radius: 16px;
  box-shadow: ${(props) =>
    props.special
      ? "0 6px 12px rgba(0, 123, 255, 0.2)"
      : "0 4px 8px rgba(0, 0, 0, 0.1)"};
  padding: 5rem 0;
  width: 80%;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${(props) =>
    props.special
      ? "0 8px 16px rgba(0, 123, 255, 0.3)"
      : "0 6px 12px rgba(0, 0, 0, 0.15)"};
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 3rem 1rem;
  }
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  color: ${(props) => (props.special ? "#007bff" : "#2c3e50")};
  letter-spacing: 0.05em;

  @media (max-width: 768px) {
    font-size: 1.6rem;
  }
`;

const Price = styled.div`
  font-size: 1.8rem;
  font-weight: bold;
  margin: 1rem 0 2rem;
  color: ${(props) => (props.special ? "#007bff" : "#34495e")};

  @media (max-width: 768px) {
    font-size: 1.4rem;
    margin: 0.8rem 0 1.6rem;
  }
`;

const Features = styled.ul`
  list-style: none;
  padding: 0;
  margin: 2rem 0;
  text-align: center;
  color: #666666;

  li:not(:last-child) {
    margin-bottom: 1.2rem;
  }

  @media (max-width: 768px) {
    margin: 1.6rem 0;
  }
`;

const Feature = styled.li`
  font-size: 1.6rem;
  display: flex;
  align-items: center;
  justify-content: center;

  &::before {
    content: "✔";
    color: ${(props) => (props.special ? "#007bff" : "#2ecc71")};
    font-weight: bold;
    margin-right: 1rem;
  }

  @media (max-width: 768px) {
    font-size: 1.4rem;
  }
`;

const Button = styled.button`
  background: ${(props) =>
    props.special
      ? "linear-gradient(90deg, #007bff, #00d4ff)"
      : "#007bff"};
  color: white;
  border: none;
  border-radius: 8px;
  padding: 1rem 2rem;
  cursor: pointer;
  font-size: 1.4rem;
  font-weight: bold;
  transition: all 0.3s ease;

  &:hover {
    background: ${(props) =>
    props.special
      ? "linear-gradient(90deg, #0056b3, #008fb3)"
      : "#0056b3"};
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    padding: 0.8rem 1.6rem;
    font-size: 1.2rem;
  }
`;

function PlansRow({ plans }) {
  const {
    id: planId,
    name,
    min,
    term,
    time,
    cancelable,
    percentage,
  } = plans;

  const { t } = useTranslation();

  const processedData = {
    special: name?.startsWith('*'),
    title: name,
    price: `minimum invest : $${min}`,
    interest: `${percentage}% interest in ${term} days`,
    duration: `Investment duration : ${time} days`,
  }

  const { price, interest, duration } = processedData;

  return (
    <Table.Plans type={"vertical"}>
      <Card special={processedData.special}>
        <Title special={processedData.special}>
          {processedData.title}
        </Title>
        <Price special={processedData.special}>
          {t('plans.invest', { min }, `${price}`)}
        </Price>
        <Features>
          <Feature>{t('plans.interest', { percentage, term }, `${interest}`)}</Feature>
          <Feature>{t('plans.duration', { time }, `${duration}`)}</Feature>
          <Feature>
            {
              cancelable
                ? t("plans.cancelable.yes", "Ability cancel : Yes")
                : t("planscancelable.no", "Ability cancel : No")
            }
          </Feature>
        </Features>

        <Modal>
          <Modal.Open opens='plan-form'>
            <Button special={processedData.special}>
              {t('plans.choose', 'Choose Plan')}
            </Button>
          </Modal.Open>
          <Modal.Window name='plan-form'>
            <ActivationPlan
              planId={planId}
              planName={processedData.title}
              isSpecial={processedData.special}
              percentage={percentage}
              term={term}
            />
          </Modal.Window>
        </Modal>
      </Card>
    </Table.Plans>
  );
}

export default PlansRow;
