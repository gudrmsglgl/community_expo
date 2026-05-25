import { BASE_URL } from "@/api/axios";
import { DefaultRandomAvatar } from "@/components/Avatar";
import CTAButton from "@/components/CTAButton";
import RHFInputField from "@/components/form/RHFInputField";
import useAuth from "@/hooks/queries/useAuth";
import {
  updateProfileSchema,
  UpdateProfileSchema,
} from "@/schemas/updateProfileSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import {
  Image,
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ProfileUpdateScreen() {
  return (
    <View style={styles.container}>
      <Header onPressUpdateAvatar={() => {}} />
      <UpdateForm />
      <Footer onSave={() => {}} />
    </View>
  );
}

function Header({ onPressUpdateAvatar }: { onPressUpdateAvatar: () => void }) {
  return (
    <View style={styles.headerContainer}>
      <Thumbnail />
      <View style={styles.avatarUpdateButton}>
        <CTAButton
          variant="Outlined"
          size="Medium"
          title="아바타 변경"
          onPress={onPressUpdateAvatar}
        />
      </View>
    </View>
  );
}

function UpdateForm() {
  const {
    auth: { id, nickname, introduce },
  } = useAuth();

  const updateForm = useForm<UpdateProfileSchema>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      nickName: "",
      introduce: "",
    },
  });

  useEffect(() => {
    updateForm.reset({
      nickName: nickname,
      introduce: introduce,
    });
  }, [nickname, introduce]);

  return (
    <FormProvider {...updateForm}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <KeyboardAwareScrollView
          bottomOffset={50}
          extraKeyboardSpace={16}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.formContainer}>
            <RHFInputField name="nickName" label="닉네임" />
            <RHFInputField name="introduce" label="소개" />
          </View>
        </KeyboardAwareScrollView>
      </TouchableWithoutFeedback>
    </FormProvider>
  );
}

function Footer({ onSave }: { onSave: () => void }) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.footer, { marginBottom: insets.bottom }]}>
      <CTAButton variant="Filled" size="Large" title="저장" onPress={onSave} />
    </View>
  );
}

function Thumbnail({ thumbnailUri }: { thumbnailUri?: string }) {
  if (!thumbnailUri) return <DefaultRandomAvatar style={styles.image} />;

  return (
    <Image
      source={{ uri: `${BASE_URL}/${thumbnailUri}` }}
      style={styles.image}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: 32,
  },
  image: {
    width: 152,
    height: 152,
  },
  avatarUpdateButton: {
    position: "absolute",
    bottom: 0,
    right: 16,
  },

  formContainer: {
    marginTop: 5,
    paddingHorizontal: 16,
    gap: 16,
  },
  footer: {
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingTop: 12,
    position: "absolute",
    bottom: 0,
    width: "100%",
    paddingHorizontal: 16,
  },
});
