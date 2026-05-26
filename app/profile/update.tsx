import { BASE_URL } from "@/api/axios";
import { DefaultRandomAvatar } from "@/components/Avatar";
import CTAButton from "@/components/CTAButton";
import RHFInputField from "@/components/form/RHFInputField";
import useAuth from "@/hooks/queries/useAuth";
import useAppToast from "@/hooks/useAppToast";
import {
  updateProfileSchema,
  UpdateProfileSchema,
} from "@/schemas/updateProfileSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
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
  const { successToast } = useAppToast();

  const {
    auth: { nickname, introduce },
    profileUpdateMutation,
  } = useAuth();

  const updateForm = useForm<UpdateProfileSchema>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      nickname: "",
      introduce: "",
    },
    mode: "onChange",
  });

  const onSubmitSave = (form: UpdateProfileSchema) => {
    profileUpdateMutation.mutate(form, {
      onSuccess: () => {
        successToast("프로필 변경 완료되었습니다.");
        router.back();
      },
    });
  };

  useEffect(() => {
    updateForm.reset({
      nickname: nickname,
      introduce: introduce,
    });
  }, [nickname, introduce]);

  return (
    <FormProvider {...updateForm}>
      <View style={styles.container}>
        <Header onPressUpdateAvatar={() => {}} />
        <UpdateForm />
        <Footer
          onSave={() => {
            updateForm.handleSubmit(onSubmitSave)();
          }}
        />
      </View>
    </FormProvider>
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
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAwareScrollView
        bottomOffset={50}
        extraKeyboardSpace={16}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.formContainer}>
          <RHFInputField
            name="nickname"
            label="닉네임"
            nextFieldName="introduce"
          />
          <RHFInputField name="introduce" label="소개" />
        </View>
      </KeyboardAwareScrollView>
    </TouchableWithoutFeedback>
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
