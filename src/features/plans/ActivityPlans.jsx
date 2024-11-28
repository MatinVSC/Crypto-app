import styled from "styled-components";
import { useUserActivitedPlans } from './useUserActivitedPlans';
import Spinner from "../../ui/Spinner";
import Row from "../../ui/Row";
import Table from "../../ui/Table";
import Heading from "../../ui/Heading";

// کانتینر کلی تایملاین
const TimelineContainer = styled.div`
  position: relative;
  margin: 20px auto;
  min-width: 60%; /* بزرگ‌تر کردن عرض کلی */
  padding: 20px;
`;

// خط تایملاین
const TimelineLine = styled.div`
  position: absolute;
  width: 6px; /* ضخیم‌تر کردن خط */
  background-color: #007bff;
  top: 0;
  bottom: 0;
  left: 50px; /* فاصله بیشتر از لبه */
`;

// آیتم تایملاین
const TimelineItem = styled.div`
  position: relative;
  margin-left: 100px; /* افزایش فاصله از خط تایملاین */
  margin-bottom: 25px; /* افزایش فاصله بین آیتم‌ها */
  padding: 30px; /* افزایش پدینگ برای بزرگ‌تر شدن آیتم */
  background: #ffffff;
  border: 2px solid #007bff; /* حاشیه آبی ضخیم‌تر */
  border-radius: 12px; /* گوشه‌های گردتر */
  box-shadow: 0 6px 12px rgba(0, 123, 255, 0.2); /* سایه بزرگ‌تر */
  display: flex;
  flex-direction: column;
  gap: 15px;

  &:hover {
    transform: translateY(-8px); /* حرکت بیشتر در هاور */
    box-shadow: 0 8px 16px rgba(0, 123, 255, 0.3);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
`;

// دایره تایملاین
const TimelineDot = styled.div`
  position: absolute;
  width: 16px; /* دایره بزرگ‌تر */
  height: 16px;
  background-color: #007bff;
  border: 3px solid #ffffff;
  border-radius: 50%;
  top: 65px; /* هم‌ترازی بهتر */
  left: -58px;
`;

// عنوان پلن
const PlanTitle = styled.h3`
  font-size: 24px; /* فونت بزرگ‌تر */
  font-weight: bold;
  color: #007bff;
  margin: 0;
`;

// جزئیات پلن
const PlanDetail = styled.p`
  font-size: 18px; /* فونت بزرگ‌تر */
  margin: 5px 0;
  color: #555;

  span {
    font-weight: bold;
    color: #333;
  }
`

export default function ActivityPlans() {
  const { userActivitedPlans, isLoading } = useUserActivitedPlans();

  if (isLoading) return <Spinner />

  const { data } = userActivitedPlans;

  console.log(data);


  return (

    <>
      <Row type="horizontal">
        <Heading as="h1">Your staking plans</Heading>
      </Row>

      <Table>
        <TimelineContainer>
          <TimelineLine />
          {data.map((plan) => (
            <TimelineItem key={plan.id}>
              <TimelineDot />
              <PlanTitle>{plan.name}</PlanTitle>
              <PlanDetail>
                price investing :<span>${plan.investment}</span>
              </PlanDetail>
              <PlanDetail>
                time stamp <span>{plan.activationTime}</span>
              </PlanDetail>
            </TimelineItem>
          ))}
        </TimelineContainer>
      </Table>
    </>
  )
}