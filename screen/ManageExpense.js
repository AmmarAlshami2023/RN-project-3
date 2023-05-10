import { useContext, useLayoutEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import IconButton from "../component/ui/IconButton";
import { GlobalStyles } from "../constants/Styles";
import { ExpensesContext } from "../store/expenses-context";
import ExpenseForm from "../component/manageExpense/ExpenseForm";
import { storeExpense, updateExpense, deleteExpense } from "../util/Http";
import LoadingOverLays from "../component/ui/loadingOverLays";
import ErrorOverlays from "../component/ui/ErrorOverlay";
function ManageExpense({ route, navigation }) {
  const expenseCtx = useContext(ExpensesContext);
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [error, setError] = useState();
  const editedExpenseId = route.params?.expenseid;
  const isEditing = !!editedExpenseId;
  const selectedExpense = expenseCtx.expenses.find(
    (expense) => expense.id === editedExpenseId
  );
  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Exponse" : "Add Expense",
    });
  }, [navigation, isEditing]);

  async function deleteExpenseHandler() {
    setIsSubmiting(true);
    try {
      await deleteExpense(editedExpenseId);
      expenseCtx.deleteExpense(editedExpenseId);
      navigation.goBack();
    } catch (error) {
      setError("could not delete exponse - try it later");
      setIsSubmiting(false);
    }
  }

  function cancelHandler() {
    navigation.goBack();
  }
  async function confirmHandler(expenseData) {
    setIsSubmiting(true);
    try {
      await updateExpense(editedExpenseId, expenseData);
      if (isEditing) {
        expenseCtx.updateExpense(editedExpenseId, expenseData);
      } else {
        const id = await storeExpense(expenseData);
        expenseCtx.addExpense({ ...expenseData, id: id });
      }
      navigation.goBack();
    } catch (error) {
      setError("could not save data exponse -try later ");
      setIsSubmiting(false);
    }
  }
  function errorHandler() {
    setError(null);
  }
  if (error && !isSubmiting) {
    return <ErrorOverlays message={error} onConfir={errorHandler} />;
  }
  if (isSubmiting) {
    return <LoadingOverLays />;
  }
  return (
    <View style={styles.container}>
      <ExpenseForm
        submitButtonLabel={isEditing ? "Update" : "Add"}
        onCancel={cancelHandler}
        onSubmit={confirmHandler}
        defaultValues={selectedExpense}
      />

      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
}

export default ManageExpense;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
    marginVertical: 8,
  },

  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});
