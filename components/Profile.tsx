import DefaultAvatar from "@/assets/images/default-avatar.svg";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "./index";
interface ProfileProps {
  onPress: () => void;
  imageUri?: string;
  nickname: string;
  createdAt: string;
  option?: React.ReactNode;
}

export default function Profile({
  onPress,
  imageUri,
  nickname,
  createdAt,
  option,
}: ProfileProps) {
  return (
    <View style={styles.container}>
      <Pressable onPress={onPress} style={styles.profileContainer}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.image} />
        ) : (
          <DefaultAvatar style={styles.image} width={50} height={50} />
        )}
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{nickname}</Text>
          <Text style={styles.time}>{createdAt}</Text>
        </View>
      </Pressable>
      {option}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
  },
  profileContainer: {
    flexDirection: "row",
    flex: 1,
    gap: 8,
  },
  image: {
    borderRadius: 50,
    borderWidth: StyleSheet.hairlineWidth,
  },
  infoContainer: {
    flexDirection: "column",
    justifyContent: "space-around",
  },
  name: {
    fontSize: 15,
    fontWeight: "bold",
  },
  time: {
    fontSize: 14,
    color: colors.Grey_500,
  },
});
