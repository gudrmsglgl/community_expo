import useAuth from "@/hooks/queries/useAuth";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useEffect, useState } from "react";

interface AuthRouterProps {
  children: React.ReactNode;
}

export default function AuthRoute({ children }: AuthRouterProps) {
  const { auth, authLoading, refetchAuth } = useAuth();
  const [isCheckingAuth, setIsCheckingAuth] = useState(false);
  const userId = auth.id;

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      setIsCheckingAuth(!userId);
      refetchAuth().finally(() => {
        if (isActive) {
          setIsCheckingAuth(false);
        }
      });

      return () => {
        isActive = false;
        setIsCheckingAuth(false);
      };
    }, [refetchAuth, userId]),
  );

  useEffect(() => {
    if (!authLoading && !isCheckingAuth && !userId) router.replace("/auth");
  }, [userId, authLoading, isCheckingAuth]);

  if (authLoading || isCheckingAuth) return null;
  if (!userId) return null;
  return children;
}
