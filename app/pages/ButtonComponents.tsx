import ButtonSection from "@/components/ButtonSection";
import CTAButton from "@/components/CTAButton";
import { ReactNode } from "react";
import { View } from "react-native";

export default function ButtonComponents() {
  return (
    <View>
      <ButtonSection title="Filled Large Button">
        <View style={{ gap: 15 }}>
          <CTAButton
            title="투표하기"
            variant="Filled"
            size="Large"
            onPress={() => console.log("Filled Large Button Pressed")}
          />
          <CTAButton
            title="투표하기"
            variant="Filled"
            size="Large"
            onPress={() => console.log("Filled Large Button Pressed")}
            disabled={true}
          />
        </View>
      </ButtonSection>

      <ButtonSection title="Filled Medium Button">
        <Row>
          <CTAButton title="버튼" variant="Filled" size="Medium" />
          <CTAButton
            title="버튼"
            variant="Filled"
            size="Medium"
            disabled={true}
          />
        </Row>
      </ButtonSection>

      <ButtonSection title="Filled Small Button">
        <Row>
          <CTAButton title="버튼" variant="Filled" size="Small" />
          <CTAButton
            title="버튼"
            variant="Filled"
            size="Small"
            disabled={true}
          />
        </Row>
      </ButtonSection>

      <ButtonSection title="Outlined Medium Button">
        <Row>
          <CTAButton title="버튼" variant="Outlined" size="Medium" />
          <CTAButton
            title="버튼"
            variant="Outlined"
            size="Medium"
            disabled={true}
          />
        </Row>
      </ButtonSection>

      <ButtonSection title="Outlined Small Button">
        <Row>
          <CTAButton title="버튼" variant="Outlined" size="Small" />
          <CTAButton
            title="버튼"
            variant="Outlined"
            size="Small"
            disabled={true}
          />
        </Row>
      </ButtonSection>
    </View>
  );
}

function Row({ children }: { children: ReactNode }) {
  return <View style={{ flexDirection: "row", gap: 10 }}>{children}</View>;
}
