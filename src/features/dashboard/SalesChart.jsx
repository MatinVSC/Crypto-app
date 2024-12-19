import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import styled from "styled-components";
import DashboardBox from "./DashboardBox";
import { useSecondPartners } from "../partnership/useSecondPartners";
import { useFirstPartners } from "../partnership/useFirstPartners";
import SpinnerMini from "../../ui/SpinnerMini";
import Heading from "../../ui/Heading";
import { useTranslation } from "react-i18next";

const StyledChart = styled(DashboardBox)`
  grid-column: 1 / -1;

  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }

  @media (max-width: 768px) {
    grid-column: 1 / -1;
    padding: 1.6rem 0;
    height: 260px;
  }
`;

export default function SalesChart() {
  const { t } = useTranslation();
  const { firstPartners, isLoading } = useFirstPartners();
  const { secondPartners, isLoading: isLoadingSecond } = useSecondPartners();

  if (isLoading || isLoadingSecond) return <SpinnerMini />;

  const { data: firstData } = firstPartners;
  const { data: secondData } = secondPartners;

  const numDays = 7;

  const totalReferrals = [...firstData, ...secondData].length;
  const totalValue = [...firstData, ...secondData].reduce(
    (acc, partner) => acc + (partner.value || 0),
    0
  );
  

  const data = Array.from({ length: numDays }, (_, index) => ({
    label: `Day ${index + 1}`,
    referrals: index + 1 <= totalReferrals ? index + 1 : totalReferrals,
    value: (totalValue / totalReferrals) * Math.min(index + 1, totalReferrals),
  }));


  const colors = {
    referrals: { stroke: "#16a34a", fill: "#dcfce7" },
    value: { stroke: "#4f46e5", fill: "#c7d2fe" },
    text: "#374151",
    background: "#fff",
  };


  return (
    <StyledChart>
      <Heading as="h2">
        {t('dashboard.referralTitle', 'Chart of inviting friends and earning profit')}
      </Heading>

      <ResponsiveContainer height={300} width="100%">
        <AreaChart data={data}>

          <XAxis
            dataKey="label"
            tick={{ fill: colors.text, fontSize: "12px" }}
            tickLine={{ stroke: colors.text }}
            interval="preserveStartEnd"
          />

          <YAxis
            unit="$"
            tick={{ fill: colors.text, fontSize: "12px" }}
            tickLine={{ stroke: colors.text }}
          />
          <CartesianGrid strokeDasharray="4" />
          <Tooltip contentStyle={{ backgroundColor: colors.background }} />

          <Area
            dataKey="referrals"
            type="monotone"
            stroke={colors.referrals.stroke}
            fill={colors.referrals.fill}
            strokeWidth={2}
            name={t('dashboard.referral', 'Referrals')}
          />

          <Area
            dataKey="value"
            type="monotone"
            stroke={colors.value.stroke}
            fill={colors.value.fill}
            strokeWidth={2}
            name={t('dashboard.profit', 'Profit')}
          />
        </AreaChart>
      </ResponsiveContainer>
    </StyledChart>
  );
}
