import Logo from "@/assets/images/logo.svg";
import CTAButton from "@/components/CTAButton";
import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AuthScreen() {
  return (
    <SafeAreaView edges={["left", "right", "bottom"]} style={styles.container}>
      <LogoContainer />
      <View style={styles.buttons}>
        <CTAButton title="로그인하기" variant="Filled" size="Large" />
        <Link href="/auth/signup">
          <Text style={styles.link}>이메일로 가입하기</Text>
        </Link>
      </View>
    </SafeAreaView>
  );
}

function LogoContainer() {
  return (
    <View style={styles.logoContainer}>
      <Logo />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    justifyContent: "space-between",
  },
  logoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttons: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
    gap: 20,
  },
  link: {
    textDecorationLine: "underline",
    fontSize: 14,
  },
});
