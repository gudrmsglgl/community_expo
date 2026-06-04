import { useEffect, useState } from "react";
import { Platform } from "react-native";
//import * as Device from "expo-device";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";

type UsePushNotificationOptions = {
  enabled?: boolean;
};

function usePushNotification({
  enabled = true,
}: UsePushNotificationOptions = {}) {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState<
    Notifications.Notification | undefined
  >(undefined);

  const handleRegistrationError = (errorMessage: string) => {
    alert(errorMessage);
    throw new Error(errorMessage);
  };

  const registerForPushNotificationsAsync = async () => {
    if (!enabled) return;

    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      handleRegistrationError("푸시 권한을 허용해주세요.");
      return;
    }
    const projectId =
      Constants?.expoConfig?.extra?.eas?.projectId ??
      Constants?.easConfig?.projectId;
    if (!projectId) {
      handleRegistrationError("Project ID를 찾을 수 없습니다.");
    }
    try {
      const pushTokenString = (
        await Notifications.getExpoPushTokenAsync({
          projectId,
        })
      ).data;
      return pushTokenString;
    } catch (e: unknown) {
      handleRegistrationError(`${e}`);
    }
  };

  useEffect(() => {
    if (!enabled) {
      setExpoPushToken("");
      setNotification(undefined);
      return;
    }

    registerForPushNotificationsAsync()
      .then((token) => setExpoPushToken(token ?? ""))
      .catch((error: any) => console.log("error", error));

    const notificationListener = Notifications.addNotificationReceivedListener(
      (notification) => {
        setNotification(notification);
      },
    );

    const responseListener =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      notificationListener.remove();
      responseListener.remove();
    };
  }, [enabled]);

  return { expoPushToken, notification };
}

export default usePushNotification;
