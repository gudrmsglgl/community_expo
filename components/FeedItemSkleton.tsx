import { StyleSheet, View } from "react-native";
import { Skeleton } from "./Skeleton";

export default function FeedItemSkleton() {
  return (
    <View style={styles.container}>
      <ProfileSkeleton />
      <Skeleton height={10} style={styles.content} />
    </View>
  );
}

function ProfileSkeleton() {
  return (
    <View style={styles.profileContainer}>
      <View style={styles.profileInnerContainer}>
        <Skeleton height={10} style={styles.image} />
        <View style={styles.infoContainer}>
          <Skeleton height={10} style={styles.name} />
          <Skeleton height={10} style={styles.time} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    gap: 8,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  profileInnerContainer: {
    flexDirection: "row",
    flex: 1,
    gap: 8,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  infoContainer: {
    flexDirection: "column",
    gap: 5,
    justifyContent: "space-around",
  },
  name: {
    flex: 1,
    width: 50,
    height: 20,
  },
  time: {
    flex: 1,
    width: 180,
    height: 20,
  },
  content: {
    width: "100%",
    height: 70,
    borderRadius: 8,
  },
});
