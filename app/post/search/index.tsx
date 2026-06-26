import { colors } from "@/components";
import { InfinitePosts } from "@/components/FeedList";
import SearchInput from "@/components/SearchInput";
import useGetSearchInfinitePosts from "@/hooks/useGetSearchInfinitePosts";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PostSearchScreen() {
  const [submitText, onSubmit] = useState("");

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SearchAppBar onSubmit={onSubmit} />

      <SearchedPosts query={submitText} />
    </SafeAreaView>
  );
}

function SearchAppBar({ onSubmit }: { onSubmit: (string) => void }) {
  const [input, onChangeInput] = useState("");
  return (
    <View style={styles.inputContainer}>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Feather
          name="arrow-left"
          size={28}
          color={colors.BLACK}
          onPress={() => router.back()}
        />
      </View>

      <SearchInput
        value={input}
        onChangeText={onChangeInput}
        onSubmit={() => onSubmit(input)}
        onSubmitEditing={() => onSubmit(input)}
        placeholder="글 제목 검색"
        autoFocus
      />
    </View>
  );
}

function SearchedPosts({ query }: { query: string }) {
  return <InfinitePosts hookFn={() => useGetSearchInfinitePosts(query)} />;
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    paddingHorizontal: 8,
    backgroundColor: colors.WHITE,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    height: 44,
    marginBottom: 8,
  },
});
