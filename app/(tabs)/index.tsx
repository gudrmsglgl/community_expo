import { colors } from "@/components";
import { InfinitePosts } from "@/components/FeedList";
import useAuth from "@/hooks/queries/useAuth";
import useGetInfinitePosts from "@/hooks/useGetInfinitePosts";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const { auth } = useAuth();
  return (
    <SafeAreaView style={styles.container} edges={["left", "right", "top"]}>
      <FeedList />

      {auth.id && (
        <Pressable
          onPress={() => {
            router.push("/post/write");
          }}
          style={styles.pencilButton}
        >
          <Ionicons name="pencil" size={32} color={colors.WHITE} />
        </Pressable>
      )}
    </SafeAreaView>
  );
}

function FeedList() {
  return <InfinitePosts hookFn={useGetInfinitePosts} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  pencilButton: {
    width: 64,
    height: 64,
    position: "absolute",
    bottom: 16,
    right: 16,
    backgroundColor: colors.ORANGE_600,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 32,
    shadowColor: colors.BLACK,
    shadowOffset: { width: 0, height: 2 },
  },
});
