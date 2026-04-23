import { BASE_URL } from "@/api/axios";
import { ImageUri } from "@/types";
import { router } from "expo-router";
import { Image, Pressable, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export default function ImagePreviewList({
  imageUris = [],
}: {
  imageUris: ImageUri[];
}) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {imageUris.map(({ uri }, index) => (
        <Pressable
          key={uri + index}
          style={styles.imageContainer}
          onPress={() => {
            router.push({ pathname: "/image", params: { uri } });
          }}
        >
          <Image source={{ uri: `${BASE_URL}/${uri}` }} style={styles.image} />
        </Pressable>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 5,
    flexGrow: 1,
  },
  imageContainer: {
    width: 90,
    height: 90,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
});
