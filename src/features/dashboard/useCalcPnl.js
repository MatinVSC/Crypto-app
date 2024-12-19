import { usePlans } from "../plans/usePlans";
import { useUserActivitedPlans } from "../plans/useUserActivitedPlans";

export function useCalcPnl() {
  const { plansData, isLoading: isLoadingPlans } = usePlans();
  const { userActivitedPlans, isLoading: isLoadingActivated } = useUserActivitedPlans();

  const isLoading = isLoadingPlans || isLoadingActivated;

  console.log({plansData, userActivitedPlans});
  

  if (isLoading) {
    return { 
      isLoading, 
      totalProfit: 0, 
      realizedProfit: 0, 
      unrealizedProfit: 0, 
      monthlyProfit: 0,
      dailyProfit: 0 
    };
  }

  const plans = plansData?.data || [];
  const activatedPlans = userActivitedPlans?.data || [];

  const result = activatedPlans.reduce(
    (acc, userPlan) => {
      const matchedPlan = plans.find(plan => plan.id === userPlan.plan);

      if (matchedPlan) {
        const { value, timestamp } = userPlan;
        const { percentage, time, term } = matchedPlan;

        const profitPerTerm = (value * percentage) / 100;

        const totalTerms = Math.floor(time / term);
        const totalDays = time; // مدت زمان کل پلن به روز
        const termsPassed = Math.floor(
          (Date.now() - timestamp / 1e6) / (term * 24 * 60 * 60 * 1000)
        );
        const daysPassed = Math.floor(
          (Date.now() - timestamp / 1e6) / (24 * 60 * 60 * 1000)
        );
        
        const totalPlanProfit = profitPerTerm * totalTerms;
        const realizedPlanProfit = profitPerTerm * Math.min(termsPassed, totalTerms);

        // محاسبه سود روزانه
        const dailyPlanProfit = 
          daysPassed > 0 
          ? realizedPlanProfit / daysPassed // سود تحقق‌یافته تقسیم بر روزهای گذشته
          : totalPlanProfit / totalDays;    // سود کل تقسیم بر کل روزهای پلن

        acc.totalProfit += totalPlanProfit;
        acc.realizedProfit += realizedPlanProfit;
        acc.monthlyProfit += profitPerTerm;
        acc.dailyProfit += dailyPlanProfit; // جمع کل سود روزانه
      }

      return acc;
    },
    { totalProfit: 0, realizedProfit: 0, monthlyProfit: 0, dailyProfit: 0 }
  );

  const unrealizedProfit = result.totalProfit - result.realizedProfit;

  return {
    isLoading,
    totalProfit: result.totalProfit,
    realizedProfit: result.realizedProfit,
    unrealizedProfit,
    monthlyProfit: result.monthlyProfit,
    dailyProfit: result.dailyProfit,
  };
}
