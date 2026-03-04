import React from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Mission() {
  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.container1}>
        <Box />
        <Box />
        <Box />
      </View>
      <View style={styles.container2}>
        <Box />
        <Box />
        <Box />
      </View>
      <View style={styles.container3}>
        <Box />
        <Box />
        <Box />
      </View>
    </SafeAreaView>
  );
}

function Box() {
  return <View style={styles.box} />;
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  container1: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "flex-end",
    gap: 5,
  },
  container2: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  container3: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 15,
    alignSelf: "flex-start",
  },
  box: {
    width: 50,
    height: 50,
    backgroundColor: "red",
  },
});
