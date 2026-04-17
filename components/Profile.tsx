import Avatar, {
  genConfig,
  NiceAvatarProps,
} from "@zamplyy/react-native-nice-avatar";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { SvgProps } from "react-native-svg";
import { colors } from "./index";

const AVATAR_SIZE = 50;

interface ProfileProps {
  onPress: () => void;
  imageUri?: string;
  nickname: string;
  createdAt: string;
  defaultUserAvatar?: React.ComponentType<NiceAvatarProps | SvgProps>;
  option?: React.ReactNode;
}

export default function Profile({
  onPress,
  imageUri,
  nickname,
  createdAt,
  defaultUserAvatar,
  option,
}: ProfileProps) {
  const config = genConfig({
    bgColor: colors.Grey_100,
  });

  const renderDefaultAvatar = () => {
    if (defaultUserAvatar) {
      const DefaultAvatarComponent = defaultUserAvatar;
      return <DefaultAvatarComponent />;
    }

    return <Avatar size={AVATAR_SIZE} {...config} />;
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={onPress} style={styles.profileContainer}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.image} />
        ) : (
          renderDefaultAvatar()
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
