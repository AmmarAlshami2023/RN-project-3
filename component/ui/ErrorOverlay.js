import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { GlobalStyles } from "../../constants/Styles";
import Button from "../../util/Button";
function ErrorOverlays({ message, onConfirm }) {
  return (
    <View style={styles.container}>
      <Text
        size="large"
        color={GlobalStyles.colors.white}
        style={[styles.text, styles.title]}
      >
        An error occurred
      </Text>
      <Text style={styles.text}>{message}</Text>
      <Button onPress={onConfirm}>Okay</Button>
    </View>
  );
}

export default ErrorOverlays;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  text: {
    color: GlobalStyles.colors.white,
    marginBottom: 8,
    textAlign: "center",
  },
});
