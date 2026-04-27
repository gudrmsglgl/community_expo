import type { Meta, StoryObj } from "@storybook/react-native";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Vote } from "./Votes";

const meta: Meta<typeof Vote> = {
  title: "DesignSystem/Vote/Vote",
  component: Vote,
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

export const VoteOptionSelected: Story = {
  render: () => {
    const [selectedVoteOptionId, setSelectedVoteOptionId] = useState<
      number | null
    >(null);
    return (
      <View>
        <View style={{ gap: 8 }}>
          <Vote
            option={{
              id: 1,
              content: "옵션 1",
              displayPriority: 1,
              userVotes: [],
            }}
            totalVoteCount={10}
            isSelected={selectedVoteOptionId === 1}
            isVoted={false}
            onSelect={() => {
              setSelectedVoteOptionId(1);
            }}
          />
          <Vote
            option={{
              id: 2,
              content: "옵션 2",
              displayPriority: 2,
              userVotes: [],
            }}
            totalVoteCount={10}
            isSelected={selectedVoteOptionId === 2}
            isVoted={false}
            onSelect={() => {
              setSelectedVoteOptionId(2);
            }}
          />
        </View>
      </View>
    );
  },
};

export const VoteOptionVoted: Story = {
  render: () => {
    const totalVoteCount = 10;
    const options = [
      { percentage: 0, label: "0%" },
      { percentage: 30, label: "30%" },
      { percentage: 100, label: "100%" },
    ] as const;

    const [selected, setSelected] = useState<
      (typeof options)[number]["percentage"]
    >(options[1].percentage);

    const userVotesCount = Math.floor((selected / 100) * totalVoteCount);

    return (
      <View>
        <View style={styles.buttonsRow}>
          {options.map((option) => {
            const isActive = option.percentage === selected;
            return (
              <Pressable
                key={option.percentage}
                onPress={() => setSelected(option.percentage)}
                style={[styles.button, isActive && styles.buttonActive]}
              >
                <Text
                  style={[
                    styles.buttonText,
                    isActive && styles.buttonTextActive,
                  ]}
                >
                  {option.label}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <Vote
          option={{
            id: 1,
            content: "옵션 1",
            displayPriority: 1,
            userVotes: Array.from({ length: userVotesCount }, (_, i) => ({
              userId: i + 1,
            })),
          }}
          totalVoteCount={totalVoteCount}
          isSelected={false}
          isVoted={true}
          onSelect={() => {}}
        />
      </View>
    );
  },
};

const styles = StyleSheet.create({
  buttonsRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
  },
  buttonActive: {
    borderColor: "#F97316",
    backgroundColor: "#FFEDD5",
  },
  buttonText: {
    fontWeight: "700",
    color: "#111827",
  },
  buttonTextActive: {
    color: "#C2410C",
  },
});
