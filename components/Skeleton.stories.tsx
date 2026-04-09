import type { Meta, StoryObj } from "@storybook/react-native";
import { StyleSheet, View } from "react-native";
import { Skeleton } from "./Skeleton";

const meta: Meta<typeof Skeleton> = {
  title: "DesignSystem/Skeleton",
  component: Skeleton,
  decorators: [
    (Story) => (
      <View style={{ padding: 16, backgroundColor: "white" }}>
        <Story />
      </View>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    width: 120,
    height: 16,
    borderRadius: 8,
  },
};

export const FeedCard: Story = {
  render: () => (
    <View style={styles.card}>
      <Skeleton width={48} height={48} borderRadius={24} />

      <View style={styles.content}>
        <Skeleton height={14} width="20%" />
        <Skeleton height={14} width="70%" style={styles.lineSpacing} />
        <Skeleton height={14} width="50%" style={styles.lineSpacing} />
      </View>

      <View style={styles.action}>
        <Skeleton width={50} height={50} borderRadius={12} />
      </View>
    </View>
  ),
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    padding: 16,
    borderRadius: 16,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    marginLeft: 12,
  },
  lineSpacing: {
    marginTop: 10,
  },
  action: {
    justifyContent: "center",
    alignItems: "center",
  },
});
