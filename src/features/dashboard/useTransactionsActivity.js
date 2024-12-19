import { useCoins } from "../coins/useCoins";
import { useAllTransactions } from "../transactions/useAllTransactions";

export function useTransactionsActiviy() {
    const { allTransactions, isLoading: isLoadingAll } = useAllTransactions();
    const { coinsData, isloading: isLoadingCoins } = useCoins();


    const isLoading = isLoadingAll || isLoadingCoins;

    const transactions = allTransactions || [];
    const coins = coinsData?.data || [];

    // ترکیب اطلاعات تراکنش‌ها و کوین‌ها
    const transactionsActivity = transactions.map(transaction => {
        // پیدا کردن کوین مرتبط
        const matchedCoin = coins.find(coin => coin.id === transaction.coin);

        // اگر کوین پیدا شد، اطلاعات آن را اضافه کن
        if (matchedCoin) {
            return {
                ...transaction,
                icon: matchedCoin.icon, // اضافه کردن آیکون کوین
                code: matchedCoin.code, // اضافه کردن کد کوین
            };
        }

        // اگر کوین پیدا نشد، تراکنش بدون تغییر برگردانده می‌شود
        return transaction;
    });

    return { transactionsActivity, isLoading };
}
