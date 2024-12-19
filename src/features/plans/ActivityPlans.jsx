import styled, { css } from "styled-components";
import { useUserActivitedPlans } from "./useUserActivitedPlans";
import { useMoveBack } from "../../hooks/useMoveBack";
import { useLocation } from "react-router-dom";
import { useMemo } from "react";
import { format } from "date-fns";
import { useTranslation } from "react-i18next";
import Spinner from "../../ui/Spinner";
import Row from "../../ui/Row";
import Table from "../../ui/Table";
import Heading from "../../ui/Heading";
import Empty from "../../ui/Empty";
import Button from "../../ui/Button";

const TimelineContainer = styled.div`
  position: relative;
  margin: 20px auto;
  min-width: 60%;
  padding: 20px;

  @media (max-width: 768px) {
    min-width: 90%;
    padding: 10px;
  }
`;

const TimelineLine = styled.div`
  position: absolute;
  width: 6px;
  background-color: #007bff;
  top: 0;
  bottom: 0;
  ${({ isRTL }) => (isRTL ? "right: 50px;" : "left: 50px;")}

  @media (max-width: 768px) {
    ${({ isRTL }) => (isRTL ? "right: 20px;" : "left: 20px;")}
  }
`;

const TimelineItem = styled.div`
  position: relative;
  ${({ isRTL }) =>
    isRTL
      ? css`
          margin-right: 100px;
          text-align: right;
          direction: rtl;
        `
      : css`
          margin-left: 100px;
          text-align: left;
          direction: ltr;
        `}
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

  @media (max-width: 768px) {
    ${({ isRTL }) =>
      isRTL
        ? css`
            margin-right: 50px;
          `
        : css`
            margin-left: 50px;
          `}
    padding: 20px;
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
  ${({ isRTL }) => (isRTL ? "right: -58px;" : "left: -58px;")}

  @media (max-width: 768px) {
    ${({ isRTL }) => (isRTL ? "right: -28px;" : "left: -28px;")}
  }
`;

const PlanTitle = styled.h3`
  font-size: 24px;
  font-weight: bold;
  color: #007bff;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const PlanDetail = styled.p`
  font-size: 18px;
  margin: 5px 0;
  color: #555;
  ${({ isRTL }) =>
    isRTL &&
    css`
      text-align: right;
      direction: rtl;
    `}

  span {
    font-weight: bold;
    color: #333;
  }

  @media (max-width: 768px) {
    font-size: 16px;
    margin: 4px 0;
  }
`;

export default function ActivityPlans() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "fa";
  const { userActivitedPlans = [], isLoading } = useUserActivitedPlans();
  const { state: plans } = useLocation();
  const moveBack = useMoveBack();

  const plansMap = useMemo(() => {
    return new Map(plans?.map((plan) => [plan.id, { name: plan.name, percentage: plan.percentage, term: plan.term }]));
  }, [plans]);

  if (isLoading) return <Spinner />;
  if (!userActivitedPlans?.data || userActivitedPlans.data.length === 0) {
    return <Empty resource="your activity plans" />;
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h2">{t("plans.active", "Your active plans")}</Heading>
        <Button variation="secondary" onClick={moveBack}>
          {t("back", "Back")}
        </Button>
      </Row>

      <Table>
        <TimelineContainer>
          <TimelineLine isRTL={isRTL} />
          {userActivitedPlans.data?.map((plan) => {
            const { name, percentage, term } = plansMap.get(plan.plan) || { name: "Unknown Plan", percentage: 0 };
            const profit = (plan.value * percentage) / 100;

            return (
              <TimelineItem key={plan.id} isRTL={isRTL}>
                <TimelineDot isRTL={isRTL} />
                <PlanTitle>{name}</PlanTitle>
                <PlanDetail>
                  {t("plans.value", "Investing value : ")}<span>${plan.value}</span>
                </PlanDetail>
                <PlanDetail>
                  {t("plans.profit", {term, defaultValue: `Profit in ${term} days : `})}<span>${profit.toFixed(2)}</span>
                </PlanDetail>
                <PlanDetail>
                  {t("date", "Date : ")}<span>{format(new Date(plan?.timestamp / 1000000), "yyyy-MM-dd HH:mm")}</span>
                </PlanDetail>
              </TimelineItem>
            );
          })}
        </TimelineContainer>
      </Table>
    </>
  );
}
