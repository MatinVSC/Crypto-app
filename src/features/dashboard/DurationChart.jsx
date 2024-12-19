import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import styled from "styled-components";
import Heading from "../../ui/Heading";
import { useTranslation } from "react-i18next";
import SpinnerMini from "../../ui/SpinnerMini";

const NoActivity = styled.div`
  text-align: center;
  font-size: 1.8rem;
  font-weight: 500;
  margin-top: 0.8rem;

  @media (max-width: 768px) {
    font-size: 1.6rem;
  }
`;

const ChartBox = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 1rem 3.2rem 3rem;

  grid-column: 3 / span 2;

  & > *:first-child {
    margin-bottom: -1.6rem;
  }

  & .recharts-pie-label-text {
    font-weight: 600;
  }

  & .recharts-legend-item-text {
    font-size: 1.4rem;
    font-weight: 500;
  }

  @media (max-width: 768px) {
    grid-column: 1 / -1;
    padding: 1.6rem;

    & .recharts-responsive-container {
      height: 200px;
    }

    & .recharts-legend-wrapper {
      margin-top: 1rem;
    }
  }

  & .recharts-legend-wrapper {
    margin-top: -1.5rem;
  }
`;


function ProfitPieChart({
  totalProfit,
  realizedProfit,
  unrealizedProfit,
  monthlyProfit,
  dailyProfit,
  isLoadingPnl
}) {

  const { t } = useTranslation();

  if (isLoadingPnl) return <SpinnerMini />;

  const data = [
    {
      name: t('dashboard.totalPrifit', "Total Profit"),
      value: parseFloat(totalProfit.toFixed(2)),
      color: "#4f46e5",
    },
    {
      name: t('dashboard.realized', "Realized Prifit"),
      value: parseFloat(realizedProfit.toFixed(2)),
      color: "#22c55e",
    },
    {
      name: t('dashboard.unrealized', "Unrealized Profit"),
      value: parseFloat(unrealizedProfit.toFixed(2)),
      color: "#ef4444",
    },
    {
      name: t('dashboard.monthly', "Monthly Profit"),
      value: parseFloat(monthlyProfit.toFixed(2)),
      color: "#04b5fb",
    },
    {
      name: t('dashboard.daily', "Daily Profit"),
      value: parseFloat(dailyProfit.toFixed(2)),
      color: "#f97316",
    },
  ];

  if (!totalProfit)
    return (
      <ChartBox>
        <Heading as="h2">{t('dashboard.plansTitle', 'Plans Profit')}</Heading>
        <NoActivity>{t('dashboard.noPlans', 'You do not have an active plan')}</NoActivity>
      </ChartBox>
    );

  return (
    <ChartBox>
      <Heading as="h2">{t('dashboard.plansTitle', 'Plans Profit')}</Heading>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={85}
            outerRadius={105}
            cx="50%"
            cy="50%"
            paddingAngle={5}
            label
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.color}
                stroke={entry.color}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend
            verticalAlign="bottom"
            align="center"
            layout="horizontal"
            iconSize={10}
            iconType="circle"
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartBox>
  );
};

export default ProfitPieChart;
