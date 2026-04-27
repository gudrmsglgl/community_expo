import useCreateVote from "@/hooks/useCreateVote";
import { Post, PostVoteOption } from "@/types";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import CTAButton from "../CTAButton";
import { colors } from "../index";

export function ProfileVoteParticipantBoard({
  post,
  currentUserId,
}: {
  post: Post;
  currentUserId: number;
}) {
  const { mutate: createVoteMutation } = useCreateVote();

  const [selectedVoteOptionId, setSelectedVoteOptionId] = useState<
    number | null
  >(null);

  const voteUserIds = post.votes
    ?.map((vote) =>
      vote.options.flatMap((option) =>
        option.userVotes.map((userVote) => userVote.userId),
      ),
    )
    .flat();

  const isVoted = voteUserIds?.includes(currentUserId) ?? false;

  return (
    <View style={styles.voteParticipantContainer}>
      <View style={styles.voteParticipantHeadContainer}>
        <Text
          style={{
            fontSize: 12,
            color: colors.ORANGE_600,
            fontWeight: "bold",
          }}
        >
          투표
        </Text>
        <Text style={{ fontSize: 12, color: colors.BLACK, fontWeight: "bold" }}>
          {post.voteCount}명 참여
        </Text>
      </View>
      <View style={styles.voteSelectListContainer}>
        {post.votes?.map((vote) =>
          vote.options.map((option) => (
            <Vote
              key={option.id}
              option={option}
              totalVoteCount={post.voteCount}
              isSelected={selectedVoteOptionId === option.id}
              isVoted={isVoted}
              onSelect={setSelectedVoteOptionId}
            />
          )),
        )}
      </View>
      {!isVoted && (
        <View style={{ marginTop: 16 }}>
          <CTAButton
            title="투표하기"
            variant="Filled"
            size="Large"
            disabled={selectedVoteOptionId === null}
            onPress={() => {
              if (selectedVoteOptionId) {
                createVoteMutation({
                  postId: post.id,
                  voteOptionId: selectedVoteOptionId,
                });
              }
            }}
          />
        </View>
      )}
    </View>
  );
}

export function VoteParticipationSummary({ voteCount }: { voteCount: number }) {
  return (
    <View style={styles.voteContainer}>
      <View style={styles.voteHeadContainer}>
        <MaterialCommunityIcons
          name="vote"
          size={24}
          color={colors.ORANGE_600}
        />
        <Text style={styles.voteHeadText}>투표</Text>
      </View>
      <Text style={styles.voteCountText}>{voteCount}명 참여중...</Text>
    </View>
  );
}

export function Vote({
  option,
  totalVoteCount,
  isSelected,
  isVoted,
  onSelect,
}: {
  option: PostVoteOption;
  totalVoteCount: number;
  isSelected: boolean;
  isVoted: boolean;
  onSelect: (id: number) => void;
}) {
  const votePercentage = option.userVotes.length
    ? Math.floor((option.userVotes.length / totalVoteCount) * 100)
    : 0;

  return isVoted ? (
    <View style={styles.votePercentageBarContainer}>
      <View
        style={[
          styles.votePercentageBar,
          { width: `${votePercentage}%` },
          {
            borderTopRightRadius: votePercentage === 100 ? 8 : 0,
            borderBottomRightRadius: votePercentage === 100 ? 8 : 0,
          },
        ]}
      />
      <Text style={{ fontWeight: "bold", paddingLeft: 10 }}>
        {option.content}
      </Text>
      <Text style={{ paddingRight: 10 }}>
        {votePercentage}% ({option.userVotes.length})
      </Text>
    </View>
  ) : (
    <Pressable
      style={[
        styles.voteSelectContainer,
        { borderColor: isSelected ? colors.ORANGE_600 : colors.Grey_300 },
      ]}
      onPress={() => {
        onSelect(option.id);
      }}
    >
      <Text style={{ fontWeight: "bold" }}>{option.content}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  voteContainer: {
    marginHorizontal: 16,
    marginTop: 16,
    borderColor: colors.ORANGE_600,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.ORANGE_100,
    gap: 16,
  },
  voteHeadContainer: {
    flexDirection: "row",

    gap: 6,
    alignItems: "center",
  },
  voteHeadText: {
    fontSize: 14,
    color: colors.ORANGE_600,
    fontWeight: "bold",
  },
  voteParticipantContainer: {
    margin: 16,
    borderColor: colors.Grey_100,
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
  },
  voteParticipantHeadContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
    marginBottom: 22,
  },
  voteCountText: {
    fontSize: 14,
    color: colors.BLACK,
    fontWeight: "bold",
  },
  voteSelectListContainer: {
    gap: 8,
  },
  votePercentageBarContainer: {
    borderRadius: 8,
    backgroundColor: colors.ORANGE_100,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  voteSelectContainer: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.Grey_100,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  votePercentageBar: {
    position: "absolute",
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    backgroundColor: colors.ORANGE_300,
    left: 0,
    top: 0,
    bottom: 0,
  },
});
