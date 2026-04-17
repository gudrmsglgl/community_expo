import DefaultAvatar from "@/assets/images/default-avatar.svg";
import Avatar, { genConfig } from "@zamplyy/react-native-nice-avatar";
import { colors } from "./index";

export const AVATAR_SIZE = 50;

const defaultConfig = genConfig({
  bgColor: colors.Grey_100,
});

export function DefaultRandomAvatar() {
  return <Avatar size={AVATAR_SIZE} {...defaultConfig} />;
}

export function DefaultDeletedAvatar() {
  return <DefaultAvatar width={AVATAR_SIZE} height={AVATAR_SIZE} />;
}
