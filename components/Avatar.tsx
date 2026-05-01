import DefaultAvatar from "@/assets/images/default-avatar.svg";
import Avatar, { genConfig } from "@zamplyy/react-native-nice-avatar";
import { ViewStyle } from "react-native";
import { colors } from "./index";

export const AVATAR_SIZE = 50;

const defaultConfig = genConfig({
  bgColor: colors.Grey_100,
});

export function DefaultRandomAvatar({
  size,
  style,
}: {
  size?: number;
  style?: ViewStyle;
}) {
  return <Avatar style={style} size={size || AVATAR_SIZE} {...defaultConfig} />;
}

export function DefaultDeletedAvatar() {
  return <DefaultAvatar width={AVATAR_SIZE} height={AVATAR_SIZE} />;
}
