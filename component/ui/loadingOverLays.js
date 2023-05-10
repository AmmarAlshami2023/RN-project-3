import { View, ActivityIndicator, StyleSheet } from "react-native";
import React from "react";
import { GlobalStyles } from "../../constants/Styles";

function LoadingOverLays() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={GlobalStyles.colors.white} />
    </View>
  );
}

export default LoadingOverLays;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary700,
  },
});
