import styled from "styled-components";
import { useUserActivitedPlans } from "./useUserActivitedPlans";
import Spinner from "../../ui/Spinner";
import Row from "../../ui/Row";
import Table from "../../ui/Table";
import Heading from "../../ui/Heading";
import Empty from "../../ui/Empty";
import Button from "../../ui/Button";
import { useMoveBack } from "../../hooks/useMoveBack";
import { useLocation } from "react-router-dom";
import { useMemo } from "react";
import { format } from "date-fns";

const TimelineContainer = styled.div`
  position: relative;
  margin: 20px auto;
  min-width: 60%;
  padding: 20px;
`;

const TimelineLine = styled.div`
  position: absolute;
  width: 6px;
  background-color: #007bff;
  top: 0;
  bottom: 0;
  left: 50px;
`;

const TimelineItem = styled.div`
  position: relative;
  margin-left: 100px;
  margin-bottom: 25px;
  padding: 30px;
  background: #ffffff;
  border: 2px solid #007bff;
  border-radius: 12px;
  box-shadow: 0 6px 12px rgba(0, 123, 255, 0.2);
  display: flex;
  flex-direction: column;
  gap: 15px;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 8px 16px rgba(0, 123, 255, 0.3);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
`;

const TimelineDot = styled.div`
  position: absolute;
  width: 16px;
  height: 16px;
  background-color: #007bff;
  border: 3px solid #ffffff;
  border-radius: 50%;
  top: 65px;
  left: -58px;
`;

const PlanTitle = styled.h3`
  font-size: 24px;
  font-weight: bold;
  color: #007bff;
  margin: 0;
`;

const PlanDetail = styled.p`
  font-size: 18px;
  margin: 5px 0;
  color: #555;

  span {
    font-weight: bold;
    color: #333;
  }
`;

export default function ActivityPlans() {
  const { userActivitedPlans = [], isLoading } = useUserActivitedPlans();
  const { state: plans } = useLocation();
  const moveBack = useMoveBack();

  const plansMap = useMemo(() => {
    return new Map(plans?.map((plan) => [plan.id, { name: plan.name, percentage: plan.percentage }]));
  }, [plans]);

  if (isLoading) return <Spinner />;
  if (!userActivitedPlans?.data || userActivitedPlans.data.length === 0) {
    return <Empty resource="your activity plans" />;
  }

  console.log(userActivitedPlans);
  console.log(plans);
  
  

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Your staking plans</Heading>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </Row>

      <Table>
        <TimelineContainer>
          <TimelineLine />
          {userActivitedPlans.data?.map((plan) => {
            const { name, percentage } = plansMap.get(plan.plan) || { name: "Unknown Plan", percentage: 0 };
            const profit = (plan.value * percentage) / 100;

            return (
              <TimelineItem key={plan.id}>
                <TimelineDot />
                <PlanTitle>{name}</PlanTitle>
                <PlanDetail>
                  Value Investing : <span>${plan.value}</span>
                </PlanDetail>
                <PlanDetail>
                profit in 30 day : <span>${profit.toFixed(2)}</span>
                </PlanDetail>
                <PlanDetail>
                  Time Stamp : {" "}
                  <span>{format(new Date(plan?.timestamp / 1000000), "yyyy-MM-dd HH:mm")}</span>
                </PlanDetail>
              </TimelineItem>
            );
          })}
        </TimelineContainer>
      </Table>
    </>
  );
}
