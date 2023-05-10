import ExpensesOutput from "../component/expensesOutput/ExpensesOutput";
import { useContext } from "react";
import { ExpensesContext } from "../store/expenses-context";

function AllExpenses() {
  const expensesCtx = useContext(ExpensesContext);
  return (
    <ExpensesOutput
      expenses={expensesCtx.expenses}
      expensesPeriod="total"
      fallbackText="No registered expenses found "
    />
  );
}

export default AllExpenses;
