import { useContext, useEffect } from "react";
import { ExpensesContext } from "../store/expenses-context";
import ExpensesOutput from "../component/expensesOutput/ExpensesOutput";
import { getDateMinusDays } from "../util/Date";
import { fetchExpense } from "../util/Http";
import { useState } from "react";
import LoadingOverLays from "../component/ui/loadingOverLays";
import ErrorOverlays from "../component/ui/ErrorOverlay";

function RecentExpenses() {
  const expensesCtx = useContext(ExpensesContext);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState();
  useEffect(() => {
    async function getExpenses() {
      setIsFetching(true);
      try {
        const expenses = await fetchExpense();
        expensesCtx.setExpenses(expenses);
      } catch {
        setError("could not fetch exponse");
      }
      setIsFetching(false);
    }
    getExpenses();
  }, []);

  if (error && !isFetching) {
    return <ErrorOverlays message={error} onConfirm={errorHandler} />;
  }
  function errorHandler() {
    setError(null);
  }
  if (isFetching) {
    return <LoadingOverLays />;
  }
  const recentExpenses = expensesCtx.expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);
    return expense.date >= date7DaysAgo && expense.date <= today;
  });

  return (
    <ExpensesOutput
      expenses={recentExpenses}
      expensesPeriod="Last 7 days"
      fallbackText="no expenses registred for the last 7 days"
    />
  );
}

export default RecentExpenses;
