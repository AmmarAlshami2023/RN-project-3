import { View, Text, TextInput, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/Styles";
function Input({ label, invalid, style, textInputConfig }) {
  const inputStyles = [styles.input];

  if (textInputConfig && textInputConfig.multiline) {
    inputStyles.push(styles.inputMultiline);
  }

  if (invalid) {
    inputStyles.push(styles.invalidInput);
  }
  return (
    <View style={(styles.inputContainer, style)}>
      <Text style={[styles.label, invalid && styles.invalidLabel]}>
        {label}
      </Text>
      <TextInput
        style={[styles.input, invalid && styles.invalidInput]}
        {...textInputConfig}
      />
    </View>
  );
}

export default Input;
const styles = StyleSheet.create({
  inputContainer: { flex: 1, marginHorizontal: 4, marginVertical: 8 },
  label: {
    fontSize: 12,
    color: GlobalStyles.colors.primary100,
    marginBottom: 4,
  },
  input: {
    padding: 6,
    backgroundColor: GlobalStyles.colors.primary100,
    color: GlobalStyles.colors.primary700,
    borderRadius: 6,
    fontSize: 18,
  },
  invalidInput: { backgroundColor: GlobalStyles.colors.error50 },
  invalidLabel: { color: GlobalStyles.colors.error500 },
});
