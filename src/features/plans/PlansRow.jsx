import styled from 'styled-components';
import Table from '../../ui/Table';
import Modal from '../../ui/Modal';
import ActivationPlan from './ActivationPlan';


// const Cabin = styled.div`
//   font-size: 1.6rem;
//   font-weight: 600;
//   color: var(--color-grey-600);
//   font-family: "Sono";
// `;

// const Price = styled.div`
//   font-family: "Sono";
//   font-weight: 600;
// `;

// const Discount = styled.div`
//   font-family: "Sono";
//   font-weight: 500;
//   color: var(--color-green-700);
// `;

const Card = styled.div`
  background-color: ${(props) => (props.special ? "#f0f8ff" : "#fff")};
  border: ${(props) => (props.special ? "1px solid #007bff" : "1px solid #e0e0e0")};
  border-radius: 8px;
  box-shadow: ${(props) =>
    props.special ? "0 6px 10px rgba(0, 123, 255, 0.2)" : "0 4px 6px rgba(0, 0, 0, 0.1)"};
  padding: 5rem 4rem;
  width: 80%;
  text-align: center;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

// عنوان
const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
  color: ${(props) => (props.special ? "#007bff" : "#333")};
`;

// قیمت
const Price = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin: 15px 0;
  color: ${(props) => (props.special ? "#007bff" : "#555")};
`;

// ویژگی‌ها
const Features = styled.ul`
  list-style: none;
  padding: 0;
  margin: 20px 0;
  color: #666;
`;

const Feature = styled.li`
  margin: 10px 0;
  font-size: 1.6rem;
`;

// دکمه
const Button = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
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

  const processedData = {
    special: name?.startsWith('sp'),
    title: name?.startsWith('sp') ? "Premium Plan Staking" : "Basic Plan Staking",
    price: `minimum invest : $${min}`,
    interest: `${percentage}% interest in ${term} days`,
    time: `Staking duration : ${time} days`,
    cancelable: cancelable ? "Ability cancel : Yes" : "Ability cancel : No"
  }


  return (

    <Table.Plans type={"vertical"}>

      <Card special={processedData.special}>
        <Title special={processedData.special}>
          {processedData.title}
        </Title>
        <Price special={processedData.special}>
          {processedData.price}
        </Price>
        <Features>
          <Feature>{processedData.interest}</Feature>
          <Feature>{processedData.time}</Feature>
          <Feature>{processedData.cancelable}</Feature>
        </Features>

        <Modal>
          <Modal.Open opens='plan-form'>
            <Button>
              Choose Plan
            </Button>
          </Modal.Open>
          <Modal.Window name='plan-form'>
            <ActivationPlan
              planId={planId}
              planName={processedData.title}
              isSpecial={processedData.special}
              percentage={percentage}
            />
          </Modal.Window>
        </Modal>

      </Card>


      {/* <Card special>
      //   <Title special>Premium Plan</Title>
      //   <Price special>$20/month</Price>
      //   <Features>
      //     <Feature>Unlimited Projects</Feature>
      //     <Feature>50 GB Storage</Feature>
      //     <Feature>Priority Support</Feature>
      //   </Features>
      //   <Button>Choose Plan</Button>
      // </Card> */}
    </Table.Plans>
  );
}

export default PlansRow;
