import LogoSvg from "@/assets/images/logo.svg";
import { colors } from "@/components";
import { InfinitePosts } from "@/components/FeedList";
import SearchInput from "@/components/SearchInput";
import useAuth from "@/hooks/queries/useAuth";
import useGetInfinitePosts from "@/hooks/useGetInfinitePosts";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Platform, Pressable, StatusBar, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const { auth } = useAuth();
  return (
    <SafeAreaView style={styles.container} edges={["left", "right", "top"]}>
      <View style={styles.inputContainer}>
        <LogoSvg width={40} height={40} />
        <SearchInput readOnly onPress={() => router.push("/post/search")} />
      </View>

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
  inputContainer: {
    marginBottom: 8,
    paddingHorizontal: 16,
    gap: 8,
    backgroundColor: colors.WHITE,
    flexDirection: "row",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
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
