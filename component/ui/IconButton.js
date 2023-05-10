import { View, Text, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
function IconButton({ icon, color, size, onPress }) {
  return (
    <Pressable onPress={onPress} style={(pressed) => pressed && styles.Pressed}>
      <View>
        <Ionicons name={icon} color={color} size={size} />
      </View>
    </Pressable>
  );
}

export default IconButton;
const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 24,
    padding: 6,
    marginHorizontal: 12,
    marginVertical: 2,
  },
  Pressed: {
    opacity: 0.75,
  },
});
