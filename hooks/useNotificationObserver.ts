import * as Linking from "expo-linking";
import * as Notifications from "expo-notifications";
import type { Href } from "expo-router";
import { router, useNavigationContainerRef } from "expo-router";
import { useEffect, useRef } from "react";

type NotificationData =
  Notifications.Notification["request"]["content"]["data"];
type PendingNotificationUrl = {
  notificationId: string;
  url: string;
};

function getNotificationUrl(data: NotificationData) {
  const url = data.url ?? data.href;

  return typeof url === "string" && url.length > 0 ? url : null;
}

function isInternalHref(url: string) {
  return url.startsWith("/") || url.startsWith("./") || url.startsWith("../");
}

function openNotificationUrl(url: string) {
  if (isInternalHref(url)) {
    router.push(url as Href);
    return;
  }

  Linking.openURL(url);
}

export default function useNotificationObserver() {
  const navigationRef = useNavigationContainerRef();
  const handledNotificationId = useRef<string | null>(null);
  const pendingNotificationUrl = useRef<PendingNotificationUrl | null>(null);

  useEffect(() => {
    const openPendingUrl = () => {
      const pendingUrl = pendingNotificationUrl.current;

      if (!pendingUrl) {
        return;
      }

      if (isInternalHref(pendingUrl.url) && !navigationRef.isReady()) {
        return;
      }

      pendingNotificationUrl.current = null;
      handledNotificationId.current = pendingUrl.notificationId;
      openNotificationUrl(pendingUrl.url);
      Notifications.clearLastNotificationResponse();
    };

    const handleNotificationResponse = (
      response: Notifications.NotificationResponse | null,
    ) => {
      if (
        !response ||
        response.actionIdentifier !== Notifications.DEFAULT_ACTION_IDENTIFIER
      ) {
        return;
      }

      const notificationId = response.notification.request.identifier;

      if (handledNotificationId.current === notificationId) {
        return;
      }

      const url = getNotificationUrl(
        response.notification.request.content.data,
      );

      if (!url) {
        return;
      }

      pendingNotificationUrl.current = { notificationId, url };
      openPendingUrl();
    };

    const readySubscription = navigationRef.addListener(
      "ready",
      openPendingUrl,
    );
    const stateSubscription = navigationRef.addListener(
      "state",
      openPendingUrl,
    );
    const responseSubscription =
      Notifications.addNotificationResponseReceivedListener(
        handleNotificationResponse,
      );

    handleNotificationResponse(Notifications.getLastNotificationResponse());

    return () => {
      readySubscription();
      stateSubscription();
      responseSubscription.remove();
    };
  }, [navigationRef]);
}
