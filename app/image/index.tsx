import { BASE_URL } from "@/api/axios";
import { useLocalSearchParams } from "expo-router";
import { Dimensions, Image, StyleSheet, View } from "react-native";

export default function ImageZoomScreen() {
  const { uri } = useLocalSearchParams<{ uri: string }>();
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: `${BASE_URL}/${uri}` }}
        resizeMode="contain"
        style={styles.image}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: Dimensions.get("window").width,
    height: "100%",
  },
});
